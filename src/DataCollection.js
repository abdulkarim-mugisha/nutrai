import React, { useState } from 'react';
import { Activity, Target, Utensils } from 'lucide-react';

const DataCollection = () => {
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
    alert('Your fitness journey begins now!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-400 via-green-300 to-blue-500 flex items-center justify-center p-4">
      <div className="bg-white bg-opacity-90 rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-2/5 bg-gradient-to-br from-green-600 to-green-800 p-8 text-white flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500 rounded-full filter blur-3xl opacity-50 -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-700 rounded-full filter blur-3xl opacity-50 -ml-32 -mb-32"></div>
            <h1 className="text-4xl font-bold mb-4 relative z-10">Welcome to Your Fitness Journey</h1>
            <p className="text-lg mb-6 relative z-10">Craft your unique path to health and vitality.</p>
            <div className="flex items-center space-x-4 mb-6 relative z-10">
              <Activity size={32} />
              <span className="text-xl">Tailor Your Transformation</span>
            </div>
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm relative z-10">
              <p className="text-sm">Your responses shape a personalized wellness blueprint, guiding you towards your optimal self.</p>
            </div>
          </div>
          <div className="md:w-3/5 p-8">
            <div className="flex items-center mb-6">
              <Target className="text-green-600 mr-3" size={32} />
              <h2 className="text-3xl font-bold text-gray-800">Define Your Wellness Vision</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="fitnessGoal" className="block text-sm font-medium text-gray-700 mb-1">
                  Fitness Goal
                </label>
                <select
                  id="fitnessGoal"
                  name="fitnessGoal"
                  value={formData.fitnessGoal}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-white bg-opacity-50 backdrop-blur-sm"
                >
                  <option value="">Select a goal</option>
                  <option value="weightLoss">weight Loss</option>
                  <option value="weightGain">Weight Gain</option>
                  <option value="muscleBuilding">Power Building</option>
                  <option value="maintenance">maintenance</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="dietaryPreference" className="block text-sm font-medium text-gray-700 mb-1">
                  dietary Preference
                </label>
                <select
                  id="dietaryPreference"
                  name="dietaryPreference"
                  value={formData.dietaryPreference}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-white bg-opacity-50 backdrop-blur-sm"
                >
                  <option value="">Choose your path</option>
                  <option value="omnivore">Omnivore</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="pescatarian">Pescatarian</option>
                  <option value="keto">Keto</option>
                  <option value="paleo">Paleo</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="allergies" className="block text-sm font-medium text-gray-700 mb-1">
                  Food Allergies/Intolarances
                </label>
                <input
                  type="text"
                  name="allergies"
                  id="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-white bg-opacity-50 backdrop-blur-sm"
                  placeholder="e.g., gluten-free, nut allergy, lactose intolerant"
                />
              </div>
              
              <div>
                <label htmlFor="activityLevel" className="block text-sm font-medium text-gray-700 mb-1">
                  activity Level
                </label>
                <select
                  id="activityLevel"
                  name="activityLevel"
                  value={formData.activityLevel}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-white bg-opacity-50 backdrop-blur-sm"
                >
                  <option value="">Select activity level</option>
                  <option value="sedentary">Sedentary </option>
                  <option value="lightlyActive">Lightly Active</option>
                  <option value="moderatelyActive">Moderately Active</option>
                  <option value="veryActive">Very Active</option>
                  <option value="extraActive">Extra Active</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="cookingHabits" className="block text-sm font-medium text-gray-700 mb-1">
                  Cooking Habits
                </label>
                <select
                  id="cookingHabits"
                  name="cookingHabits"
                  value={formData.cookingHabits}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-white bg-opacity-50 backdrop-blur-sm"
                >
                 <option value="">Select cooking frequency</option>
                  <option value="rarely">Rarely Cook</option>
                  <option value="sometimes">Cook Sometimes</option>
                  <option value="often">Cook Often</option>
                  <option value="alwaysCook">Always Cook</option>
                </select>
              </div>
              
              <div>
                <button
                  type="submit"
                  className="w-full py-4 px-6 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition transform hover:-translate-y-1 hover:shadow-lg"
                >
                  Ignite Your Wellness Journey
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCollection;