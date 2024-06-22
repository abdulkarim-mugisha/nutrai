// src/DataCollection.js
import React from 'react';

const DataCollection = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-blue-100 p-4">
      <h2 className="text-2xl font-semibold mb-8 text-center">Initial Questionnaire</h2>
      <form className="max-w-md mx-auto space-y-4">
        <div>
          <label htmlFor="fitnessGoals" className="block mb-1">Fitness Goals</label>
          <input type="text" id="fitnessGoals" className="w-full p-2 border rounded" placeholder="Weight loss, muscle building, etc." />
        </div>
        <div>
          <label htmlFor="dietaryPreferences" className="block mb-1">Dietary Preferences</label>
          <input type="text" id="dietaryPreferences" className="w-full p-2 border rounded" placeholder="Vegetarian, vegan, gluten-free, etc." />
        </div>
        <div>
          <label htmlFor="foodAllergies" className="block mb-1">Food Allergies and Intolerances</label>
          <input type="text" id="foodAllergies" className="w-full p-2 border rounded" placeholder="Lactose, nuts, etc." />
        </div>
        <div>
          <label htmlFor="lifestyle" className="block mb-1">Lifestyle</label>
          <input type="text" id="lifestyle" className="w-full p-2 border rounded" placeholder="Activity level, cooking habits, etc." />
        </div>
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">Submit</button>
      </form>
    </div>
  );
};

export default DataCollection;