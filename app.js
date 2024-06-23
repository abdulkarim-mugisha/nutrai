const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Replace with your local LLM server URL
const llmServerUrl = 'https://b792-98-47-175-66.ngrok-free.app/';


async function generateMealPlan() {
    let userData = fs.readFileSync('userData.json');
    userData = JSON.parse(userData);

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


// Express route for generating meal plan
app.post('/api/generate-meal-plan', async (req, res) => {
  try {
    // save meal plan to user data
    const date = req.body;
    const userData = fs.readFileSync('userData.json');
    let userDataObj = JSON.parse(userData);
    if (!userDataObj["mealPlan"]){
        userDataObj["mealPlan"] = [];
        const mealPlan = await generateMealPlan();

        const formattedMealPlan = {
            "date": date, 
            "breakfast": mealPlan["Day 1"][0],
            "lunch": mealPlan["Day 1"][1],
            "dinner": mealPlan["Day 1"][2]
        };
        userDataObj.mealPlan.push(formattedMealPlan);
    }
    // check if the user already has a meal plan for the date
    const dateMealPlan = userDataObj["mealPlan"].find((plan) => plan.date === date);
    if (dateMealPlan){
        return res.json(todaysMealPlan);
    } else {
        const mealPlan = await generateMealPlan();
        const formattedMealPlan = {
            "date": date, 
            "breakfast": mealPlan["Day 1"][0],
            "lunch": mealPlan["Day 1"][1],
            "dinner": mealPlan["Day 1"][2]
        };
        userDataObj.mealPlan.push(formattedMealPlan);
    };
    fs.writeFileSync('userData.json', JSON.stringify(userDataObj, null, 2));
    

    res.json(formattedMealPlan);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate meal plan' });
  }
});

// Express route for saving user data
app.post('/api/save-user-data', (req, res) => {
  try {
    const data = req.body;
    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ error: 'No data provided' });
    }
    fs.writeFileSync('userData.json', JSON.stringify(data, null, 2));
    console.log('Received user data:', data);
    res.json({ message: 'User data saved successfully' });
  } catch (error) {
    console.error('Error saving user data:', error);
    res.status(500).json({ error: 'Failed to save user data', details: error.message });
  }
});


// Express route for updating user data
app.post('/api/update-user-data', (req, res) => { // TODO: Needs testing
    try {
      const updatedUserData = req.body;
      if (!updatedUserData || Object.keys(updatedUserData).length === 0) {
        return res.status(400).json({ error: 'No data provided' });
      }
      let existingUserData = fs.readFileSync('userData.json');
      existingUserData = JSON.parse(existingUserData);

        existingUserData['weight'] = updatedUserData['weight'];
        existingUserData['height'] = updatedUserData['height'];
        existingUserData['age'] = updatedUserData['age'];
        existingUserData['gender'] = updatedUserData['gender'];
        existingUserData['fitnessGoal'] = updatedUserData['fitnessGoal'];
        existingUserData['dietaryPreference'] = updatedUserData['dietaryPreference'];
        existingUserData['allergies'] = updatedUserData['allergies'];
        existingUserData['activityLevel'] = updatedUserData['activityLevel'];
        existingUserData['cookingHabits'] = updatedUserData['cookingHabits'];
  
  
      fs.writeFileSync('userData.json', JSON.stringify(existingUserData, null, 2));
      console.log('Received user data:', updatedUserDataData);
      console.log('SAVED user data:', existingUserData);
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

module.exports = { generateMealPlan };