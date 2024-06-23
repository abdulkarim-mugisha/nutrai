import React, { useState } from 'react';
import { CalendarDays, ArrowUpRight, Book, User } from 'lucide-react';

const MealPlanTab = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysOfWeek = ['S', 'S', 'M', 'T', 'W', 'T', 'F'];
  const mealTypes = ['Breakfast', 'Lunch', 'Dinner'];

  // Dummy data for meal plan
  const dummyMealPlan = {
    Breakfast: 'Oatmeal with fruits',
    Lunch: 'Grilled chicken salad',
    Dinner: 'Salmon with roasted vegetables'
  };

  const generateWeekDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(currentDate);
      day.setDate(currentDate.getDate() - currentDate.getDay() + i);
      days.push(day);
    }
    return days;
  };

  const weekDays = generateWeekDays();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-400 via-green-300 to-blue-500 flex flex-col">
      <div className="flex-grow p-4">
        <div className="bg-white bg-opacity-90 rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full mx-auto">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Meal Plan</h1>
            
            <div className="flex justify-between items-center mb-6">
              {weekDays.map((day, index) => (
                <div key={index} className={`text-center ${day.getDate() === 24 ? 'bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center' : ''}`}>
                  <div className="font-medium">{daysOfWeek[index]}</div>
                  <div className={`${day.getDate() === 24 ? 'font-bold' : ''}`}>{day.getDate()}</div>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              {mealTypes.map((mealType, index) => (
                <div key={index} className="bg-white bg-opacity-50 backdrop-blur-sm rounded-lg p-4 shadow">
                  <h2 className="font-bold text-lg mb-2 text-green-700">{mealType}</h2>
                  <p className="text-gray-700">{dummyMealPlan[mealType]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white bg-opacity-90 shadow-lg p-4">
        <div className="max-w-5xl mx-auto flex justify-around">
          <button className="text-center text-green-600 hover:text-green-800 transition">
            <ArrowUpRight size={24} />
            <div>My Progress</div>
          </button>
          <button className="text-center text-green-600 hover:text-green-800 transition">
            <Book size={24} />
            <div>Meal Plan</div>
          </button>
          <button className="text-center text-green-600 hover:text-green-800 transition">
            <User size={24} />
            <div>Me</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MealPlanTab;