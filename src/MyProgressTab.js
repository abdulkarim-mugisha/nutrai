import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MyProgress = () => {
  const [currentNutrientIndex, setCurrentNutrientIndex] = useState(0);
  const nutrients = ['Calories', 'Protein', 'Fats', 'Sugar', 'Fiber'];

  // Dummy data for the line chart
  const nutrientData = {
    Calories: [
      { day: 'Mon', value: 1800 },
      { day: 'Tue', value: 2200 },
      { day: 'Wed', value: 1900 },
      { day: 'Thu', value: 2000 },
      { day: 'Fri', value: 2300 },
      { day: 'Sat', value: 1700 },
      { day: 'Sun', value: 1600 },
    ],
    Protein: [
      { day: 'Mon', value: 80 },
      { day: 'Tue', value: 100 },
      { day: 'Wed', value: 90 },
      { day: 'Thu', value: 95 },
      { day: 'Fri', value: 105 },
      { day: 'Sat', value: 85 },
      { day: 'Sun', value: 75 },
    ],
    Fats: [ // Add dummy data for Fats
      { day: 'Mon', value: 50 },
      { day: 'Tue', value: 65 },
      { day: 'Wed', value: 55 },
      { day: 'Thu', value: 60 },
      { day: 'Fri', value: 70 },
      { day: 'Sat', value: 45 },
      { day: 'Sun', value: 40 },
    ],
    Sugar: [ // Add dummy data for Sugar
      { day: 'Mon', value: 30 },
      { day: 'Tue', value: 40 },
      { day: 'Wed', value: 35 },
      { day: 'Thu', value: 38 },
      { day: 'Fri', value: 42 },
      { day: 'Sat', value: 28 },
      { day: 'Sun', value: 25 },
    ],
    Fiber: [ // Add dummy data for Fiber
      { day: 'Mon', value: 25 },
      { day: 'Tue', value: 30 },
      { day: 'Wed', value: 28 },
      { day: 'Thu', value: 26 },
      { day: 'Fri', value: 32 },
      { day: 'Sat', value: 22 },
      { day: 'Sun', value: 20 },
    ]
  };


  const nutrientGoals = {
    Calories: 2500,
    Protein: 150,
    Fats: 80,
    Sugar: 50,
    Fiber: 30,
  };

  const handlePrevNutrient = () => {
    setCurrentNutrientIndex((prevIndex) => 
      prevIndex === 0 ? nutrients.length - 1 : prevIndex - 1
    );
  };

  const handleNextNutrient = () => {
    setCurrentNutrientIndex((prevIndex) => 
      prevIndex === nutrients.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentNutrient = nutrients[currentNutrientIndex];
  const currentData = nutrientData[currentNutrient] || [];
  const currentGoal = nutrientGoals[currentNutrient] || 100;
  const currentValue = currentData[currentData.length - 1]?.value || 0;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Progress</h1>
      
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <button onClick={handlePrevNutrient} className="p-2"><ChevronLeft /></button>
            <h2 className="text-xl font-semibold text-gray-700">{currentNutrient} History</h2>
            <button onClick={handleNextNutrient} className="p-2"><ChevronRight /></button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={currentData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <button onClick={handlePrevNutrient} className="p-2"><ChevronLeft /></button>
            <h2 className="text-xl font-semibold text-gray-700">{currentNutrient}</h2>
            <button onClick={handleNextNutrient} className="p-2"><ChevronRight /></button>
          </div>
          <div className="flex justify-center items-center">
            <div className="relative">
              <svg className="w-48 h-48">
                <circle
                  className="text-gray-300"
                  strokeWidth="10"
                  stroke="currentColor"
                  fill="transparent"
                  r="85"
                  cx="96"
                  cy="96"
                />
                <circle
                  className="text-green-500"
                  strokeWidth="10"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="85"
                  cx="96"
                  cy="96"
                  strokeDasharray="534"
                  strokeDashoffset={534 - (534 * currentValue) / currentGoal}
                />
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="text-3xl font-bold text-gray-700">{currentValue}</span>
                <span className="text-xl text-gray-500">/{currentGoal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProgress;