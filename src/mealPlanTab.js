import React, { useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, X, Camera, FolderSync} from 'lucide-react';
import TakeImage from './TakeImage';
import { ResponsiveContainer } from 'recharts';
import CONFIG from './config';

const MealPlanTab = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weekStart, setWeekStart] = useState(new Date(new Date().setDate(new Date().getDate() - new Date().getDay())));
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [mealImages, setMealImages] = useState({});
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [weekMealPlans, setWeekMealPlans] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const mealTypes = ['Breakfast', 'Lunch', 'Dinner'];

  // Fetch meal plan for a specific date
  const fetchMealPlan = useCallback(async (date) => {
    let encodedDate = encodeURIComponent(date.toISOString().split('T')[0]);
    try {
      const response = await fetch(`${CONFIG.API_URL}get-meal-plan?date=${encodedDate}`);
      if (!response.ok) {
        throw Error(`Error in request: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching meal plan:', error);
      return null;
    }
  }, []);

  // Generate a week's worth of meal plans
  const fetchWeekMealPlans = useCallback(async () => {
    setIsLoading(true);
    const plans = {};
    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + i);
      const dateKey = day.toISOString().split('T')[0];
      plans[dateKey] = await fetchMealPlan(day);
    }
    setWeekMealPlans(plans);
    setIsLoading(false);
  }, [weekStart, fetchMealPlan]);

  useEffect(() => {
    fetchWeekMealPlans();
  }, [fetchWeekMealPlans]);

  const generateWeekDays = useCallback(() => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + i);
      days.push(day);
    }
    return days;
  }, [weekStart]);

  const weekDays = generateWeekDays();

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const handleDayClick = (day) => {
    setSelectedDate(day);
  };

  const handlePrevWeek = () => {
    setWeekStart(prev => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() - 7);
      return newDate;
    });
  };

  const handleNextWeek = () => {
    setWeekStart(prev => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + 7);
      return newDate;
    });
  };

  const getPainAuChocolatInfo = () => {
    return {
      name: 'Pain au Chocolat',
      nutrition: { calories: 280, carbs: 32, fat: 14, protein: 6 },
      ingredients: ['Puff pastry', 'Dark chocolate', 'Butter', 'Egg wash']
    };
  };

  const handleSyncClick = () => {
    if (selectedMeal && selectedDate) {
      const painAuChocolatInfo = getPainAuChocolatInfo();
      setWeekMealPlans(prev => {
        const newWeekMealPlans = { ...prev };
        const dateKey = selectedDate.toISOString().split('T')[0];
        newWeekMealPlans[dateKey] = {
          ...newWeekMealPlans[dateKey],
          [selectedMeal]: painAuChocolatInfo
        };
        return newWeekMealPlans;
      });
      console.log(`Updated ${selectedMeal} on ${selectedDate.toISOString().split('T')[0]} with Pain au Chocolat information`);
    }
  };

  const handleImageCapture = (imageDataUrl) => {
    if (selectedMeal) {
      setMealImages(prev => ({
        ...prev,
        [`${selectedDate.toISOString().split('T')[0]}-${selectedMeal}`]: imageDataUrl
      }));
      console.log("Image saved for", selectedMeal, "on", selectedDate.toISOString().split('T')[0]);
    }
    setIsCameraActive(false);
  };

  const handleCameraClose = () => {
    setIsCameraActive(false);
  };

  const selectedMealPlan = weekMealPlans[selectedDate.toISOString().split('T')[0]] || {
    Breakfast: { name: 'No meal planned', nutrition: { calories: 0, carbs: 0, fat: 0, protein: 0 }, ingredients: [] },
    Lunch: { name: 'No meal planned', nutrition: { calories: 0, carbs: 0, fat: 0, protein: 0 }, ingredients: [] },
    Dinner: { name: 'No meal planned', nutrition: { calories: 0, carbs: 0, fat: 0, protein: 0 }, ingredients: [] }
  };

  const NutritionSummary = ({ nutrition }) => (
    <div className="bg-white bg-opacity-75 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2 text-green-700">Nutrition Summary</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <p className="font-bold text-2xl">{nutrition.calories}</p>
          <p className="text-sm text-gray-600">Calories</p>
        </div>
        <div className="text-center">
          <p className="font-bold text-2xl">{nutrition.carbs}g</p>
          <p className="text-sm text-gray-600">Carbs</p>
        </div>
        <div className="text-center">
          <p className="font-bold text-2xl">{nutrition.fat}g</p>
          <p className="text-sm text-gray-600">Fat</p>
        </div>
        <div className="text-center">
          <p className="font-bold text-2xl">{nutrition.protein}g</p>
          <p className="text-sm text-gray-600">Protein</p>
        </div>
      </div>
    </div>
  );

    const SkeletonMealCard = () => (
    <div className="bg-white bg-opacity-50 backdrop-blur-sm rounded-lg p-4 shadow-md animate-pulse">
      <div className="flex justify-between items-center">
        <div>
          <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-32"></div>
        </div>
        <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );

  return (
    <div className="max-h-screen from-green-400 via-green-300 to-blue-500 flex flex-col p-4">
      {!isCameraActive && (
        <div className="bg-white bg-opacity-90 rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full mx-auto">
        <div className="p-4 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">Here is your generated meal plan!</h1>
          
          {/* Week navigation */}
          <div className="flex justify-between items-center mb-6">
            <button onClick={handlePrevWeek} className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-200">
              <ChevronLeft size={24} />
            </button>
            <div className="flex-grow flex justify-between items-center overflow-x-auto px-2">
              {weekDays.map((day, index) => (
                <div 
                  key={index} 
                  onClick={() => handleDayClick(day)}
                  className={`text-center mx-1 sm:mx-2 cursor-pointer transition-colors duration-200 ease-in-out
                    ${day.toDateString() === selectedDate.toDateString() 
                      ? 'bg-green-500 text-white rounded-full w-12 h-12 flex flex-col items-center justify-center' 
                      : 'hover:bg-green-100 rounded-full w-12 h-12 flex flex-col items-center justify-center'}`}
                >
                  <div className="font-medium text-xs">{day.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                  <div className={`text-sm ${day.toDateString() === selectedDate.toDateString() ? 'font-bold' : ''}`}>{day.getDate()}</div>
                </div>
              ))}
            </div>
            <button onClick={handleNextWeek} className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-200">
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Selected Date Details */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-700">{formatDate(selectedDate)}</h2>
          </div>

                   {/* Meal Cards */}
                   <div className="space-y-4 sm:space-y-6">
              {mealTypes.map((mealType, index) => (
                isLoading ? (
                  <SkeletonMealCard key={index} />
                ) : (
                  <div 
                    key={index} 
                    className="bg-white bg-opacity-50 backdrop-blur-sm rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                    onClick={() => setSelectedMeal(mealType)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="font-bold text-lg text-green-700">{mealType}</h2>
                        <p className="text-gray-700">{selectedMealPlan[mealType]?.name || 'No meal planned'}</p>
                      </div>
                      <ChevronDown className="text-gray-400" size={20} />
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedMeal && !isCameraActive && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
          <div className="bg-white rounded-t-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-green-700">{selectedMeal}</h2>
                <button onClick={() => setSelectedMeal(null)} className="text-gray-500">
                  <X size={24} />
                </button>
              </div>
              <p className="text-lg font-semibold mb-4 text-gray-800">{selectedMealPlan[selectedMeal].name}</p>
              <NutritionSummary nutrition={selectedMealPlan[selectedMeal].nutrition} />
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2 text-green-700">Ingredients</h3>
                <ul className="list-disc pl-5">
                  {selectedMealPlan[selectedMeal].ingredients.map((ingredient, idx) => (
                    <li key={idx} className="mb-1 text-gray-700">{ingredient}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2 text-green-700">Didn't have this meal? <br></br>Take a photo of your meal.</h3>
                {mealImages[`${selectedDate.toISOString().split('T')[0]}-${selectedMeal}`] ? (
                  <img 
                    src={mealImages[`${selectedDate.toISOString().split('T')[0]}-${selectedMeal}`]} 
                    alt="Your meal" 
                    className="w-full rounded-lg shadow-md"
                  />
                ) : (
                  <p className="text-gray-600"></p>
                )}
                <div className="mt-4">
                <div className="flex space-x-4">
  
                    <button
                    onClick={() => {
                      setIsCameraActive(true);

                    }}
                    className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center justify-center"
                  >
                    <Camera size={20} className="mr-2" />
                    New Meal
                  </button>
                  <button
                    onClick={handleSyncClick}
                    className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center justify-center"
                  >
                    <FolderSync size={20} className="mr-2" />
                    Sync
                  </button>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isCameraActive && (
        <TakeImage 
          onImageCapture={handleImageCapture} 
          onClose={handleCameraClose}
        />
      )}
    </div>
  );
};

export default MealPlanTab;