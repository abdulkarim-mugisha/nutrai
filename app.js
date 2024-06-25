
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');


const app = express();
const port = 3080;


app.use(bodyParser.json());
app.use(cors());


// Replace with your local LLM server URL
const llmServerUrl = 'https://b792-98-47-175-66.ngrok-free.app/';
let userData = fs.readFileSync('userData.json');
userData = JSON.parse(userData);


// Function to generate a 3-day meal plan from the LLM server. Returns a list of 3 meal plans of the form
// 
async function generateMealPlanFromLLM() {
  const message = {
    data: `Generate a meal plan for me based on my personal data. I'm ${userData.age} years old, ${userData.height} cm tall, and weigh ${userData.weight} kg. I have food allergies to ${userData.allergies} and my fitness goal is ${userData.fitnessGoal}. My dietary preference is ${userData.dietaryPreference} and my activity level is ${userData.activityLevel}.`
  };
  try {
    const response = await axios.post(`${llmServerUrl}image_text_from`, message);
    return response.data.meal_plan;
  } catch (error) {
    console.error('Error generating meal plan:', error);
    throw error;
  }
}


// Express route that receives image and sends it to the LLM server
app.post('/api/upload-image', async (req, res) => {
   console.log("Upload Image request received");
   // const response = await axios.post(`${llmServerUrl}upload_image`, req.body);
   // save image locally
   const imageBuffer = Buffer.from(req.body.image, 'base64');
   await fs.promises.writeFile('backend/image.jpg', imageBuffer);
   res.json({ message: "Image saved successfully" });
});


// Express route that retrieves image description from local LLM server
app.get('/api/image-description', async (req, res) => {
   const response = await axios.post(`${llmServerUrl}image_descr`, {name: "image.jpg"});
   res.json(response.data);
});


// Express route that retrieves bounding boxes
app.get('/api/detect-objects', async (req, res) => {
 const response = await axios.post(`${llmServerUrl}detect_objects`, {name: "image.jpg"});
 res.json(response.data);
});

// Express route for generating meal plan
// Example usage:  http://localhost:3080/api/get-meal-plan?date=2022-01-01`
app.get('/api/get-meal-plan', async (req, res) => {
 try {
   const { date } = req.query;
   console.log(date);
   if (!userData["mealPlans"]){
       userData["mealPlans"] = [];
   }

   // check if the user already has a meal plan for the date
   if (userData.mealPlans.length > 0){
      let result = userData.mealPlans.find(mealPlan => mealPlan.date === date);
      if (result){
          res.json(result);
          return;
      }    
   }

   const mealPlan = await generateMealPlanFromLLM();
   const formattedMealPlan = {
    "date": date,
    "breakfast": "",
    "lunch": "",
    "dinner": ""
};
   const day = mealPlan[`Day 1`];
   if (day){
       formattedMealPlan.breakfast = day[0];
       formattedMealPlan.lunch = day[1];
       formattedMealPlan.dinner = day[2];
   }
   userData.mealPlan.push(formattedMealPlan);
   fs.writeFileSync('userData.json', JSON.stringify(userData, null, 2));

   res.json(formattedMealPlan);
 } catch (error) {
   res.status(500).json({ error: `Failed to generate meal plan`, details: error.message });
   console.error('Error generating meal plan:', error);
 }
});


// Express route for saving user data
app.post('/api/save-user-data', (req, res) => {
   try {
     let data = req.body;
     if (!data || Object.keys(data).length === 0) {
       return res.status(400).json({ error: 'No data provided' });
     }
     data["mealPlans"] = userData["mealPlans"];
     fs.writeFileSync('userData.json', JSON.stringify(data, null, 2));
     console.log('Received user data:', data);
     res.json({ message: 'User data saved successfully' });
   } catch (error) {
     console.error('Error saving user data:', error);
     res.status(500).json({ error: 'Failed to save user data', details: error.message });
   }
 });


   // Express route for getting user data 
   app.get('/api/user-data', (req, res) => {
       try {
         const userData = fs.readFileSync('userData.json');
         res.json(JSON.parse(userData));
       } catch (error) {
         console.error('Error getting user data:', error);
         res.status(500).json({ error: 'Failed to get user data', details: error.message });  
       }
       }
   );
  // Error handling middleware
 app.use((err, req, res, next) => {
   console.error(err.stack);
   res.status(500).json({ error: 'Something went wrong!', details: err.message });
 });


// Start the server
app.listen(port, () => {
 console.log(`Server running on port ${port}`);
});


