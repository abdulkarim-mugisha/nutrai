import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DataCollection = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fitnessGoal: '',
    dietaryPreference: '',
    allergies: '',
    activityLevel: '',
    cookingHabits: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(formData, null, 2));
    alert('Data submitted successfully!');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Initial Questionnaire</h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label htmlFor="fitnessGoal" className="block text-sm font-medium text-gray-700">
                  Fitness Goal
                </label>
                <select
                  id="fitnessGoal"
                  name="fitnessGoal"
                  value={formData.fitnessGoal}
                  onChange={handleChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                >
                  <option value="">Select a goal</option>
                  <option value="weightLoss">Weight Loss</option>
                  <option value="weightGain">Weight Gain</option>
                  <option value="muscleBuilding">Muscle Building</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="dietaryPreference" className="block text-sm font-medium text-gray-700">
                  Dietary Preference
                </label>
                <select
                  id="dietaryPreference"
                  name="dietaryPreference"
                  value={formData.dietaryPreference}
                  onChange={handleChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                >
                  <option value="">Select a preference</option>
                  <option value="omnivore">Omnivore</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="pescatarian">Pescatarian</option>
                  <option value="keto">Keto</option>
                  <option value="paleo">Paleo</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="allergies" className="block text-sm font-medium text-gray-700">
                  Food Allergies/Intolerances
                </label>
                <input
                  type="text"
                  name="allergies"
                  id="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="e.g., peanuts, lactose, gluten"
                />
              </div>
              
              <div>
                <label htmlFor="activityLevel" className="block text-sm font-medium text-gray-700">
                  Activity Level
                </label>
                <select
                  id="activityLevel"
                  name="activityLevel"
                  value={formData.activityLevel}
                  onChange={handleChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                >
                  <option value="">Select activity level</option>
                  <option value="sedentary">Sedentary</option>
                  <option value="lightlyActive">Lightly Active</option>
                  <option value="moderatelyActive">Moderately Active</option>
                  <option value="veryActive">Very Active</option>
                  <option value="extraActive">Extra Active</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="cookingHabits" className="block text-sm font-medium text-gray-700">
                  Cooking Habits
                </label>
                <select
                  id="cookingHabits"
                  name="cookingHabits"
                  value={formData.cookingHabits}
                  onChange={handleChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                >
                  <option value="">Select cooking frequency</option>
                  <option value="rarely">Rarely Cook</option>
                  <option value="sometimes">Cook Sometimes</option>
                  <option value="often">Cook Often</option>
                  <option value="alwaysCook">Always Cook</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DataCollection;