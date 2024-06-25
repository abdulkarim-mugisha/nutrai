import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, X, Camera, FolderSync } from 'lucide-react';
import TakeImage from './TakeImage'; 

const MealPlanTab = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weekStart, setWeekStart] = useState(new Date(new Date().setDate(new Date().getDate() - new Date().getDay())));
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [mealImages, setMealImages] = useState({});
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [weekMealPlans, setWeekMealPlans] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const mealTypes = ['breakfast', 'lunch', 'dinner']; 

  // Fetch meal plan for a specific date
  const fetchMealPlan = useCallback(async (date) => {
    setIsLoading(true);
    setError(null);

    try {
      // Replace with your actual API endpoint 
      const response = await fetch(`http://localhost:3080/api/generate-meal-plan`); 
      if (!response.ok) {
        throw new Error('Failed to fetch meal plan');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching meal plan:', error);
      setError('Failed to load meal plan.');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch meal plans for the entire week when weekStart changes
  useEffect(() => {
    const fetchWeekMealPlans = async () => {
      const plans = {};
      for (let i = 0; i < 7; i++) {
        const day = new Date(weekStart);
        day.setDate(weekStart.getDate() + i);
        const plan = await fetchMealPlan(day);
        if (plan) {
          plans[day.toISOString().split('T')[0]] = plan;
        }
      }
      setWeekMealPlans(plans);
    };

    fetchWeekMealPlans();
  }, [weekStart, fetchMealPlan]);

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

  const handleSyncClick = () => {
    // Implement your sync logic here
    console.log('Sync clicked!'); 
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

  // Access the meal plan for the selected date
  const selectedMealPlan = weekMealPlans[selectedDate.toISOString().split('T')[0]] || {};

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-400 via-green-300 to-blue-500 flex flex-col p-4">

      {/* Week Navigation */}
      <div className="bg-white bg-opacity-90 rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full mx-auto">
        <div className="p-4 sm:p-8"> 
          {/* ... (Your existing header JSX) ... */}

          <div className="flex justify-between items-center mb-6">
            {/* ... (Your existing week navigation buttons) ... */}
          </div>

          {/* Display loading or error states */}
          {isLoading && (
            <div className="flex justify-center items-center h-screen">Loading...</div>
          )}

          {error && (
            <div className="text-red-500 text-center">
              {error}
            </div>
          )}

          {!isLoading && !error && (
            // Only render the meal plan if not loading and no error
            <>
              {/* ... (Your existing date display JSX) ... */}

              <div className="space-y-4 sm:space-y-6">
                {mealTypes.map((mealType, index) => (
                  <div
                    key={index}
                    className="bg-white bg-opacity-50 backdrop-blur-sm rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                    onClick={() => setSelectedMeal(mealType)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="font-bold text-lg text-green-700">{mealType.charAt(0).toUpperCase() + mealType.slice(1)}</h2>
                        {/* Access the meal name from the fetched data */}
                        <p className="text-gray-700">{selectedMealPlan[mealType]?.name || 'No meal planned'}</p> 
                      </div>
                      <ChevronDown className="text-gray-400" size={20} />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div> 
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
                  <p className="text-gray-600">No image captured yet.</p>
                )}
                <div className="mt-4">
                <div className="flex space-x-4">
  
                    <button
                    onClick={() => setIsCameraActive(true)}
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