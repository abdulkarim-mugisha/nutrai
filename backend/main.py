from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from llama_cpp import Llama  # for the text completion model
import uvicorn
import json
import re
from ultralytics import YOLO
import cv2
import numpy as np
import os
from transformers import (
    AutoProcessor,
    AutoModelForVision2Seq,
    AutoModelForCausalLM,
    AutoTokenizer,
)
from PIL import Image
import torch
import io
from unittest.mock import patch
from transformers.dynamic_module_utils import get_imports
import shutil 
from pathlib import Path 

def fixed_get_imports(filename: str | os.PathLike) -> list[str]:
    if not str(filename).endswith("modeling_florence2.py"):
        return get_imports(filename)
    imports = get_imports(filename)
    imports.remove("flash_attn")
    return imports

@app.post("/upload_image")
async def upload_image(image: UploadFile = File(...)):
    image_path = Path(f"images/{image.filename}")
    with image_path.open("wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    return {"message": f"Image {image.filename} saved at {image_path}"}

def create_llm(model_path: str):
    return Llama(model_path, n_ctx=2048, seed=1234)


def return_completion(system_message, question: str):
    ret_str = llm.create_chat_completion(
        messages=[
            {"role": "system", "content": system_message},
            {"role": "user", "content": question},
        ]
    )
    return ret_str


def process_image_with_florence(image_name):
    # Load the model and processor
    with patch(
        "transformers.dynamic_module_utils.get_imports", fixed_get_imports
    ):  # workaround for unnecessary flash_attn requirement
        model = AutoModelForCausalLM.from_pretrained(
            "microsoft/Florence-2-large",
            attn_implementation="sdpa",
            trust_remote_code=True,
        )
    processor = AutoProcessor.from_pretrained(
        "microsoft/Florence-2-large", trust_remote_code=True
    )

    # Construct the full path to the image
    image_path = os.path.join(".", image_name)

    # Check if the file exists
    if not os.path.exists(image_path):
        raise FileNotFoundError(f"Image file not found: {image_path}")

    # Open the image
    image = Image.open(image_path)

    # Set the prompt for image captioning
    prompt = "<CAPTION>"

    # Process the image and text
    inputs = processor(text=prompt, images=image, return_tensors="pt")

    # Generate caption
    generated_ids = model.generate(
        input_ids=inputs["input_ids"],
        pixel_values=inputs["pixel_values"],
        max_new_tokens=1024,
        do_sample=False,
        num_beams=3,
    )

    # Decode the generated text
    generated_text = processor.batch_decode(generated_ids, skip_special_tokens=False)[0]

    # Post-process the generated text
    parsed_answer = processor.post_process_generation(
        generated_text,
        task="<VERY_DETAILED_CAPTION_OF_EVERY_OBJECT>",
        image_size=(image.width, image.height),
    )

    return parsed_answer


# Hyperparameters
MODEL = "qwen1_5-0_5b-chat-q4_k_m.gguf"
SYSTEM_MESSAGE = """
You are a nutrition assistant tasked with creating a personalized weekly meal plan. You will receive JSON data containing a person's medical information, workout routine, and current nutrition. Analyze this data carefully and create a 3-day meal plan tailored to their specific needs.

Follow this structure for your output:
- Day 1: <Day 1 meals>
- Day 2: <Day 2 meals>
- Day 3: <Day 3 meals>
Add nothing more than this. 

Follow these steps:

1. Parse the JSON data and extract key information:
   - Medical conditions and restrictions
   - Height, weight, age, and gender
   - Workout type, frequency, and intensity
   - Current caloric intake and macronutrient breakdown

4. Create a 3-day meal plan with 3 main meals and 2 snacks per day, ensuring:
   - Balanced nutrition with adequate vitamins and minerals
   - Please do not be too specific about the meals, but provide a general idea of the food groups and portion sizes.

Remember to prioritize the person's health and dietary requirements while creating an enjoyable and sustainable meal plan.

JSON data will be appended to this prompt in the following format:

{
  "medical": {
    "conditions": [...],
    "allergies": [...],
    "medications": [...]
  },
  "personal": {
    "height": ...,
    "weight": ...,
    "age": ...,
    "gender": ...
  },
  "fitness": {
    "workoutType": ...,
    "frequency": ...,
    "intensity": ...
  },
  "nutrition": {
    "currentCalories": ...,
    "currentMacros": {
      "protein": ...,
      "carbs": ...,
      "fat": ...
    }
  }
}

Generate the meal plan based on this information. Only generate the meal plan. Do not get distracted by anything else.
"""
MEAL_PROMPT = """ 
You are a nutrition information assistant. Your task is to provide detailed nutrient information for a given meal and present it in a structured JSON format.

For the meal provided, you need to give nutrient information for the following:
- Calories
- Protein
- Total lipid (fat)
- Carbohydrate
- Total sugars
- Fiber

Follow these steps to complete the task:

-  Create a JSON object for the food with the following structure:
   {
     "serving_size": <Estimated serving size>,
     "calories": < Estimated calories >,
     "protein": < Estimated protein >,
     "total_fat": < Estimated total fat >,
     "carbohydrate":  < Estimated carbohydrate >,
     "total_sugars": < Estimated total sugars >,
     "fiber":  < Estimated fiber >
   }

- Use your best judgment to estimate the nutrient values based on the meal provided.

- Ensure all nutrient values are rounded to one decimal place.

- Don't output anything other than the JSON output 

Remember to be as accurate and detailed as possible in your nutrient information estimations. If you're unsure about any information, provide your best estimate based on similar foods or general nutritional knowledge.
"""

app = FastAPI()


class ImageData(BaseModel):
    data: str


class ImageName(BaseModel):
    name: str


@app.post("/image_descr")
async def post_image_descr(image_data: ImageName):
    try:
        # Generate description using Florence model
        description = process_image_with_florence(image_data.name)

        return {
            "message": "POST /image_descr",
            "filename": image_data.name,
            "description": description,
        }
    except FileNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/image_descr")
async def post_image_descr(image_data: ImageName):
    try:
        # Generate description using Florence model
        description = process_image_with_florence(image_data.name)

        return {
            "message": "POST /image_descr",
            "filename": image_data.name,
            "description": description,
        }
    except FileNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/return_image_descr")
async def get_image_descr():
    # Implement your logic here
    return {"message": "GET /return_image_descr"}


@app.get("/return_text_from")
async def get_text_from():
    # Implement your logic here
    return {"message": "GET /return_text_from"}


@app.get("/return_image_boxes")
async def get_image_boxes():
    # Implement your logic here
    return {"message": "GET /return_image_boxes"}


@app.post("/image_descr")
async def post_image_descr(image: UploadFile = File(...)):
    # Implement your logic here
    return {"message": "POST /image_descr", "filename": image.filename}


@app.post("/image_text_from")
async def post_image_text_from(image_data: ImageData):
    global json_dump
    completion = return_completion(SYSTEM_MESSAGE, image_data.data)
    meal_plan_str = completion["choices"][0]["message"]["content"]

    # Remove the outer quotes and unescape the inner quotes
    meal_plan_str = meal_plan_str.strip('"').replace('\\"', '"')

    # Split the string into day entries
    day_entries = re.split(r"\nDay \d+:", meal_plan_str)[
        1:
    ]  # Skip the first empty split

    meal_plan = {}
    for i, entry in enumerate(day_entries, 1):
        meals = [meal.strip() for meal in entry.split("\n") if meal.strip()]
        meal_plan[f"Day {i}"] = meals

    # Remove the note if present
    if "Note:" in meal_plan[f"Day {len(day_entries)}"][-1]:
        meal_plan[f"Day {len(day_entries)}"].pop()

    # Create a clean JSON response
    response = {"message": "POST /image_text_from", "meal_plan": meal_plan}

    json_dump = json.dumps(meal_plan, indent=2)
    return json.dumps(meal_plan, indent=2)


@app.post("/text_from_day")
async def post_text_from_day(day: ImageData):
    # Go through the saved json meal plan and for that day, then create a list of all the micro-nutrients and the calories, and composite calories, return it as a json
    if json_dump is None:
        return {"message": "No meal plan found"}
    meal_plan = json.loads(json_dump)

    day = day.data.split(" ")[0] + " " + day.data.split(" ")[1]

    if day not in meal_plan:
        return {
            "message": "Day not found in meal plan, we only have 3 days: {Days}!".format(
                Days=list(meal_plan.keys())
            )
        }
    if meal == "Breakfast":
        meals = meal_plan[day][0].split(":")[1]
    elif meal == "Lunch":
        meals = meal_plan[day][1].split(":")[1]
    elif meal == "Dinner":
        meals = meal_plan[day][2].split(":")[1]
    # meals = meal_plan[day][0].split(":")[1] + meal_plan[day][1].split(":")[1] + meal_plan[day][2].split(":")[1]
    meals_string = "\n".join(meals)
    completion = return_completion(
        MEAL_PROMPT,
        "Give me a structured json output for this meal: {MEAL}".format(
            MEAL=meals_string
        ),
    )

    # parse the completions into a structured json format
    nutrients = completion["choices"][0]["message"]["content"]

    return json.dumps(nutrients, indent=2)


yolo_model = YOLO("yolov8n.pt")


@app.post("/detect_objects")
async def detect_objects(image_data: ImageName):
    try:
        # Construct the full path to the image
        image_path = os.path.join(".", image_data.name)

        # Check if the file exists
        if not os.path.exists(image_path):
            raise HTTPException(status_code=404, detail="Image file not found")

        # Read the image
        img = cv2.imread(image_path)
        if img is None:
            raise HTTPException(status_code=400, detail="Unable to read image file")

        # Perform YOLO detection
        results = yolo_model(img)

        # Process results
        detected_objects = []
        for r in results:
            boxes = r.boxes
            for box in boxes:
                x1, y1, x2, y2 = box.xyxy[0]
                conf = box.conf[0]
                cls = int(box.cls[0])
                name = yolo_model.names[cls]

                detected_objects.append(
                    {
                        "name": name,
                        "confidence": float(conf),
                        "bounding_box": {
                            "x1": float(x1),
                            "y1": float(y1),
                            "x2": float(x2),
                            "y2": float(y2),
                        },
                    }
                )

        # Create JSON response
        response = {
            "message": "Objects detected successfully",
            "detected_objects": detected_objects,
        }

        return JSONResponse(content=response)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/image_boxes")
async def post_image_boxes(image: UploadFile = File(...)):
    # Implement your logic here
    return {"message": "POST /image_boxes", "filename": image.filename}


def main():
    global llm
    global json_dump
    json_dump = None
    llm = create_llm(MODEL)
    uvicorn.run(app, host="0.0.0.0", port=8000)
    # print(return_completion(SYSTEM_MESSAGE, "What is your name?"))

if __name__ == "__main__":
    main()
