import React, { useState } from 'react';
import { Activity, Target, Utensils, Smartphone } from 'lucide-react';
import { generateMealPlan} from './utils.js';

const DataCollection = () => {
  const [integrationMethod, setIntegrationMethod] = useState('');
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    age: '',
    gender: '',
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
    const healthData = {
      integrationMethod,
      userData: formData
    };
    console.log('Health Data JSON:', JSON.stringify(healthData, null, 2));
    // let response = generateMealPlan()
    // .then(mealPlan => console.log(mealPlan))
    // .catch(error => console.error(error));

    // // save response as json file 
    // localStorage.setItem('healthData', JSON.stringify(response, null, 2));
    window.location.href = '/app/*';
    // Navigate to mealplan page
    
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-400 via-green-300 to-blue-500 flex items-center justify-center p-4">
      <div className="bg-white bg-opacity-90 rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-2/5 bg-gradient-to-br from-green-600 to-green-800 p-8 text-white flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500 rounded-full filter blur-3xl opacity-50 -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-700 rounded-full filter blur-3xl opacity-50 -ml-32 -mb-32"></div>
            <h1 className="text-4xl font-bold mb-4 relative z-10">Sync Your Health Journey</h1>
            <p className="text-lg mb-6 relative z-10">Craft your personalized wellness experience.</p>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Choose Integration Method
                </label>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setIntegrationMethod('appleHealth')}
                    className={`w-full p-3 border rounded-lg transition ${
                      integrationMethod === 'appleHealth'
                        ? 'bg-green-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-green-50'
                    }`}
                  >
                    Connect Apple Health
                  </button>
                  <button
                    type="button"
                    onClick={() => setIntegrationMethod('googleFit')}
                    className={`w-full p-3 border rounded-lg transition ${
                      integrationMethod === 'googleFit'
                        ? 'bg-green-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-green-50'
                    }`}
                  >
                    Connect Google Fit
                  </button>
                  <button
                    type="button"
                    onClick={() => setIntegrationMethod('manual')}
                    className={`w-full p-3 border rounded-lg transition ${
                      integrationMethod === 'manual'
                        ? 'bg-green-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-green-50'
                    }`}
                  >
                    Manual Input
                  </button>
                </div>
              </div>

              {integrationMethod === 'manual' && (
                <>
                  <div>
                    <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      id="weight"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-white bg-opacity-50 backdrop-blur-sm"
                      placeholder="Enter your weight"
                    />
                  </div>
                  <div>
                    <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
                      Height (cm)
                    </label>
                    <input
                      type="number"
                      id="height"
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-white bg-opacity-50 backdrop-blur-sm"
                      placeholder="Enter your height"
                    />
                  </div>
                  <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                      Age
                    </label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-white bg-opacity-50 backdrop-blur-sm"
                      placeholder="Enter your age"
                    />
                  </div>
                  <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                      Gender
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-white bg-opacity-50 backdrop-blur-sm"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="preferNotToSay">Prefer not to say</option>
                    </select>
                  </div>
                </>
              )}

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
                  <option value="weightLoss">Weight Loss</option>
                  <option value="weightGain">Weight Gain</option>
                  <option value="muscleBuilding">Power Building</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="dietaryPreference" className="block text-sm font-medium text-gray-700 mb-1">
                  Dietary Preference
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
                  Food Allergies/Intolerances
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
                  Activity Level
                </label>
                <select
                  id="activityLevel"
                  name="activityLevel"
                  value={formData.activityLevel}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-white bg-opacity-50 backdrop-blur-sm"
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
  Complete Health Profile
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