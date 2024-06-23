const axios = require('axios');
const express = require('express');
const app = express();
const port = 3000;



// Replace with your local LLM server URL
const llmServerUrl = 'https://b792-98-47-175-66.ngrok-free.app/';


// Example user data
const userData = {
   age: 30,
   height: 170,
   weight: 70,
   foodAllergies: ['peanuts', 'shellfish'],
   healthConditions: ['diabetes'],
   medications: ['insulin'],
   nutritionGoal: 'weight loss',
   lifestyle: 'active',
   dietaryRestrictions: ['vegan'],
   foodPreferences: ['vegetarian', 'spicy'],
   activityLevel: 'sedentary',
   dailyGoals: {
     calories: 2000,
     protein: 120,
     fat: 60,
     carbs: 250,
     sugar: 50,
     fiber: 30,
   },
   mealHistory: [
     {
       name: 'Breakfast',
       description: 'Oatmeal with berries and almonds',
       timestamp: '2023-10-26T08:00:00Z',
       nutrients: {
         calories: 300,
         protein: 10,
         fat: 10,
         carbs: 50,
         sugar: 10,
         fiber: 5,
       },
     },
     // ... more meal history entries
   ],
 };

 function checkStatus(response) {
  if (response.ok) {
    return response;
  } else {
    throw new Error('Request failed with status:', response.status);
  }
}

 async function generateMealPlan() {
//   let url = llmServerUrl + 'image_text_from';
  let message = {
    data: `Generate a meal plan for me based on my personal data. I'm ${userData.age} years old, ${userData.height} cm tall, and weigh ${userData.weight} kg. I have food allergies to ${userData.foodAllergies.join(', ')} and health conditions including ${userData.healthConditions.join(', ')}. I take medications such as ${userData.medications.join(', ')} and have a nutrition goal of ${userData.nutritionGoal}. My lifestyle is ${userData.lifestyle} and I have dietary restrictions of ${userData.dietaryRestrictions.join(', ')}. My food preferences include ${userData.foodPreferences.join(', ')} and my activity level is ${userData.activityLevel}. My daily goals are to consume ${userData.dailyGoals.calories} calories, ${userData.dailyGoals.protein}g of protein, ${userData.dailyGoals.fat}g of fat, ${userData.dailyGoals.carbs}g of carbs, ${userData.dailyGoals.sugar}g of sugar, and ${userData.dailyGoals.fiber}g of fiber.`
};
  // const data = {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(message)
  // };
  const axios = await import('https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js');

  axios.post(`${llmServerUrl}image_text_from`, JSON.stringify(message))
.then(function (response) {
    console.log(response.data);
    alert('Request successful! Check console for details.');
})
.catch(function (error) {
    console.error('Error:', error);
    alert('An error occurred. Check console for details.');
});
  // const options = {
  //   method: 'POST',
  //   headers: {'Content-Type': 'application/json'},
  //   body: '{"data":"Generate a meal plan for me based on my personal data. I\'m looking to lose weight and improve my overall health. I am a healthy 32-y.o who weights 300 lbs and has a carnivore diet and a respectable height(I am 5\'2 btw)"}'
  // };
  
  // fetch('https://156e-2607-f140-6000-8026-9c97-d934-419e-3d5d.ngrok-free.app/image_text_from', options)
  //   .then(response => response.json())
  //   .then(response => console.log(response))
  //   .catch(err => console.error(err));

  // fetch(url, data)
  //   .then(checkStatus)
  //   .then(data => {
  //     const mealPlan = data.meal_plan;
  //     return mealPlan;
  //   })
  //   .catch(error => {
  //     console.error('Error generating meal plan:', error);
  //     throw error; // Re-throw the error to let the calling function handle it
  //   });
}

// Function to generate a 3-day meal plan
// async function generateMealPlan() {
//  try {
//     let url = llmServerUrl + 'image_text_from'
    // const data = {
    //     data: `Generate a meal plan for me based on my personal data. I'm ${userData.age} years old, ${userData.height} cm tall, and weigh ${userData.weight} kg. I have food allergies to ${userData.foodAllergies.join(', ')} and health conditions including ${userData.healthConditions.join(', ')}. I take medications such as ${userData.medications.join(', ')} and have a nutrition goal of ${userData.nutritionGoal}. My lifestyle is ${userData.lifestyle} and I have dietary restrictions of ${userData.dietaryRestrictions.join(', ')}. My food preferences include ${userData.foodPreferences.join(', ')} and my activity level is ${userData.activityLevel}. My daily goals are to consume ${userData.dailyGoals.calories} calories, ${userData.dailyGoals.protein}g of protein, ${userData.dailyGoals.fat}g of fat, ${userData.dailyGoals.carbs}g of carbs, ${userData.dailyGoals.sugar}g of sugar, and ${userData.dailyGoals.fiber}g of fiber.`
    // };


//     const response = await fetch(url, data);
//    const mealPlan = response.data.meal_plan;
//    return mealPlan;
//  } catch (error) {
//    console.error('Error generating meal plan:', error);
//    // Handle the error appropriately (e.g., log it, display an error message to the user, retry the request).
//    throw error; // Re-throw the error to let the calling function handle it
//  }
// }


// Function to get nutrient info for a meal
// async function getNutrientInfo(mealDescription) {
//  try {
//    const data = {
//      task: 'nutrient_info',
//      mealDescription,
//    };


//    const response = await axios.post(llmServerUrl, data);


//    const nutrientInfo = JSON.parse(response.data.text);


//    return nutrientInfo;
//  } catch (error) {
//    console.error('Error getting nutrient info:', error);
//    // Handle the error appropriately
//    throw error;
//  }
// }


// // Function to get food item contents from a picture
// async function getFoodItemContentsFromImage(imageUrl) {
//  try {
//    // ... (same as before) ...
//  } catch (error) {
//    console.error('Error getting food item contents from image:', error);
//    throw error;
//  }
// }


// // Function to get recipe for a meal description
// async function getRecipe(mealDescription) {
//  try {
//    const data = {
//      task: 'recipe',
//      mealDescription,
//    };


//    const response = await axios.post(llmServerUrl, data);


//    const recipe = response.data.text;


//    return recipe;
//  } catch (error) {
//    console.error('Error getting recipe:', error);
//    throw error;
//  }
// }


// // Example usage
// async function main() {
//  try {
//    // Generate a 3-day meal plan
//    const mealPlan = await generateMealPlan(userData);
//    console.log('Meal Plan:', mealPlan);


//    // Get nutrient info for a specific meal
//    const mealDescription = 'Grilled chicken with roasted vegetables';
//    const nutrientInfo = await getNutrientInfo(mealDescription);
//    console.log('Nutrient Info:', nutrientInfo);


//    // Get food item contents from a picture
//    const imageUrl = 'https://example.com/image.jpg';
//    const foodItems = await getFoodItemContentsFromImage(imageUrl);
//    console.log('Food Items:', foodItems);


//    // Get recipe for a meal description
//    const recipe = await getRecipe(mealDescription);
//    console.log('Recipe:', recipe);
//  } catch (error) {
//    console.error('Main function error:', error);
//    // Handle errors in the main function, perhaps display a generic error message to the user.
//  }
// }

module.exports = { generateMealPlan };