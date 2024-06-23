// import React, { useState, useCallback, useMemo } from 'react';
// import { ChevronLeft, ChevronRight, ChevronDown, X } from 'lucide-react';

// // Dummy data generator with nutrition info
// const generateDummyMealPlan = (date) => {
//   const meals = [
//     { name: 'Oatmeal with berries', nutrition: { calories: 300, carbs: 45, fat: 6, protein: 10 }, ingredients: ['Oats', 'Mixed berries', 'Honey', 'Milk'] },
//     { name: 'Scrambled eggs with toast', nutrition: { calories: 350, carbs: 30, fat: 18, protein: 20 }, ingredients: ['Eggs', 'Whole grain bread', 'Butter', 'Salt', 'Pepper'] },
//     { name: 'Yogurt parfait', nutrition: { calories: 250, carbs: 40, fat: 8, protein: 15 }, ingredients: ['Greek yogurt', 'Granola', 'Fresh fruits', 'Honey'] },
//     { name: 'Grilled chicken salad', nutrition: { calories: 400, carbs: 15, fat: 22, protein: 35 }, ingredients: ['Grilled chicken breast', 'Mixed greens', 'Tomatoes', 'Cucumber', 'Olive oil dressing'] },
//     { name: 'Vegetable stir-fry', nutrition: { calories: 350, carbs: 45, fat: 12, protein: 15 }, ingredients: ['Mixed vegetables', 'Tofu', 'Brown rice', 'Soy sauce', 'Sesame oil'] },
//     { name: 'Tuna sandwich', nutrition: { calories: 450, carbs: 40, fat: 18, protein: 30 }, ingredients: ['Whole grain bread', 'Canned tuna', 'Mayonnaise', 'Lettuce', 'Tomato'] },
//     { name: 'Salmon with roasted vegetables', nutrition: { calories: 500, carbs: 25, fat: 28, protein: 40 }, ingredients: ['Salmon fillet', 'Broccoli', 'Carrots', 'Olive oil', 'Lemon', 'Herbs'] },
//     { name: 'Spaghetti Bolognese', nutrition: { calories: 550, carbs: 70, fat: 20, protein: 25 }, ingredients: ['Whole grain spaghetti', 'Ground beef', 'Tomato sauce', 'Onion', 'Garlic', 'Parmesan cheese'] },
//     { name: 'Vegetarian curry', nutrition: { calories: 400, carbs: 55, fat: 15, protein: 12 }, ingredients: ['Mixed vegetables', 'Chickpeas', 'Coconut milk', 'Curry spices', 'Brown rice'] }
//   ];
  
//   return {
//     date: date.toISOString().split('T')[0],
//     Breakfast: meals[Math.floor(Math.random() * 3)],
//     Lunch: meals[3 + Math.floor(Math.random() * 3)],
//     Dinner: meals[6 + Math.floor(Math.random() * 3)]
//   };
// };

// const MealPlanTab = () => {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [weekStart, setWeekStart] = useState(new Date(new Date().setDate(new Date().getDate() - new Date().getDay())));
//   const [selectedMeal, setSelectedMeal] = useState(null);

//   const mealTypes = ['Breakfast', 'Lunch', 'Dinner'];

//   // Generate a week's worth of meal plans
//   const weekMealPlans = useMemo(() => {
//     const plans = {};
//     for (let i = 0; i < 7; i++) {
//       const day = new Date(weekStart);
//       day.setDate(weekStart.getDate() + i);
//       plans[day.toISOString().split('T')[0]] = generateDummyMealPlan(day);
//     }
//     return plans;
//   }, [weekStart]);

//   const generateWeekDays = useCallback(() => {
//     const days = [];
//     for (let i = 0; i < 7; i++) {
//       const day = new Date(weekStart);
//       day.setDate(weekStart.getDate() + i);
//       days.push(day);
//     }
//     return days;
//   }, [weekStart]);

//   const weekDays = generateWeekDays();

//   const formatDate = (date) => {
//     return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
//   };

//   const handleDayClick = (day) => {
//     setSelectedDate(day);
//   };

//   const handlePrevWeek = () => {
//     setWeekStart(prev => {
//       const newDate = new Date(prev);
//       newDate.setDate(prev.getDate() - 7);
//       return newDate;
//     });
//   };

//   const handleNextWeek = () => {
//     setWeekStart(prev => {
//       const newDate = new Date(prev);
//       newDate.setDate(prev.getDate() + 7);
//       return newDate;
//     });
//   };

//   const selectedMealPlan = weekMealPlans[selectedDate.toISOString().split('T')[0]] || {
//     Breakfast: { name: 'No meal planned', nutrition: { calories: 0, carbs: 0, fat: 0, protein: 0 }, ingredients: [] },
//     Lunch: { name: 'No meal planned', nutrition: { calories: 0, carbs: 0, fat: 0, protein: 0 }, ingredients: [] },
//     Dinner: { name: 'No meal planned', nutrition: { calories: 0, carbs: 0, fat: 0, protein: 0 }, ingredients: [] }
//   };

//   const NutritionSummary = ({ nutrition }) => (
//     <div className="bg-gray-100 p-4 rounded-lg">
//       <h3 className="text-lg font-semibold mb-2">Nutrition Summary</h3>
//       <div className="grid grid-cols-2 gap-4">
//         <div className="text-center">
//           <p className="font-bold">{nutrition.calories}</p>
//           <p className="text-sm">Calories</p>
//         </div>
//         <div className="text-center">
//           <p className="font-bold">{nutrition.carbs}g</p>
//           <p className="text-sm">Carbs</p>
//         </div>
//         <div className="text-center">
//           <p className="font-bold">{nutrition.fat}g</p>
//           <p className="text-sm">Fat</p>
//         </div>
//         <div className="text-center">
//           <p className="font-bold">{nutrition.protein}g</p>
//           <p className="text-sm">Protein</p>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-green-400 via-green-300 to-blue-500 flex flex-col p-4">
//       <div className="bg-white bg-opacity-90 rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full mx-auto">
//         <div className="p-4 sm:p-8">
//           <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">Your Weekly Meal Plan</h1>
          
//           <div className="flex justify-between items-center mb-6">
//             <button onClick={handlePrevWeek} className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-200">
//               <ChevronLeft size={24} />
//             </button>
//             <div className="flex-grow flex justify-between items-center overflow-x-auto px-2">
//               {weekDays.map((day, index) => (
//                 <div 
//                   key={index} 
//                   onClick={() => handleDayClick(day)}
//                   className={`text-center mx-1 sm:mx-2 cursor-pointer transition-colors duration-200 ease-in-out
//                     ${day.toDateString() === selectedDate.toDateString() 
//                       ? 'bg-green-500 text-white rounded-full w-12 h-12 flex flex-col items-center justify-center' 
//                       : 'hover:bg-green-100 rounded-full w-12 h-12 flex flex-col items-center justify-center'}`}
//                 >
//                   <div className="font-medium text-xs">{day.toLocaleDateString('en-US', { weekday: 'short' })}</div>
//                   <div className={`text-sm ${day.toDateString() === selectedDate.toDateString() ? 'font-bold' : ''}`}>{day.getDate()}</div>
//                 </div>
//               ))}
//             </div>
//             <button onClick={handleNextWeek} className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-200">
//               <ChevronRight size={24} />
//             </button>
//           </div>

//           <div className="text-center mb-6">
//             <h2 className="text-xl font-semibold text-gray-700">{formatDate(selectedDate)}</h2>
//           </div>

//           <div className="space-y-4 sm:space-y-6">
//             {mealTypes.map((mealType, index) => (
//               <div 
//                 key={index} 
//                 className="bg-white bg-opacity-50 backdrop-blur-sm rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
//                 onClick={() => setSelectedMeal(mealType)}
//               >
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <h2 className="font-bold text-lg text-green-700">{mealType}</h2>
//                     <p className="text-gray-700">{selectedMealPlan[mealType].name}</p>
//                   </div>
//                   <ChevronDown className="text-gray-400" size={20} />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {selectedMeal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
//           <div className="bg-white rounded-t-3xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-bold">{selectedMeal}</h2>
//                 <button onClick={() => setSelectedMeal(null)} className="text-gray-500">
//                   <X size={24} />
//                 </button>
//               </div>
//               <p className="text-lg font-semibold mb-4">{selectedMealPlan[selectedMeal].name}</p>
//               <NutritionSummary nutrition={selectedMealPlan[selectedMeal].nutrition} />
//               <div className="mt-6">
//                 <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
//                 <ul className="list-disc pl-5">
//                   {selectedMealPlan[selectedMeal].ingredients.map((ingredient, idx) => (
//                     <li key={idx} className="mb-1">{ingredient}</li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MealPlanTab;

// import React, { useState, useCallback, useEffect } from 'react';
// import { ChevronLeft, ChevronRight, ChevronDown, X } from 'lucide-react';

// const MealPlanTab = () => {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [weekStart, setWeekStart] = useState(new Date(new Date().setDate(new Date().getDate() - new Date().getDay())));
//   const [selectedMeal, setSelectedMeal] = useState(null);
//   const [weekMealPlans, setWeekMealPlans] = useState({});
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const mealTypes = ['breakfast', 'lunch', 'dinner'];

//   const fetchMealPlan = useCallback(async (date) => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const response = await fetch('http://localhost:3000/api/generate-meal-plan', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({date: date.toISOString().split('T')[0]}),
//       });
//       if (!response.ok) {
//         throw new Error('Failed to fetch meal plan');
//       }
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error('Error fetching meal plan:', error);
//       setError('Failed to load meal plan. Please try again later.');
//       return null;
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     const fetchWeekMealPlans = async () => {
//       const plans = {};
//       for (let i = 0; i < 7; i++) {
//         const day = new Date(weekStart);
//         day.setDate(weekStart.getDate() + i);
//         const plan = await fetchMealPlan(day);
//         if (plan) {
//           plans[day.toISOString().split('T')[0]] = plan;
//         }
//       }
//       setWeekMealPlans(plans);
//     };

//     fetchWeekMealPlans();
//   }, [weekStart, fetchMealPlan]);

//   const generateWeekDays = useCallback(() => {
//     const days = [];
//     for (let i = 0; i < 7; i++) {
//       const day = new Date(weekStart);
//       day.setDate(weekStart.getDate() + i);
//       days.push(day);
//     }
//     return days;
//   }, [weekStart]);

//   const weekDays = generateWeekDays();

//   const formatDate = (date) => {
//     return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
//   };

//   const handleDayClick = (day) => {
//     setSelectedDate(day);
//   };

//   const handlePrevWeek = () => {
//     setWeekStart(prev => {
//       const newDate = new Date(prev);
//       newDate.setDate(prev.getDate() - 7);
//       return newDate;
//     });
//   };

//   const handleNextWeek = () => {
//     setWeekStart(prev => {
//       const newDate = new Date(prev);
//       newDate.setDate(prev.getDate() + 7);
//       return newDate;
//     });
//   };

//   const selectedMealPlan = weekMealPlans[selectedDate.toISOString().split('T')[0]] || {
//     breakfast: 'No meal planned',
//     lunch: 'No meal planned',
//     dinner: 'No meal planned'
//   };

//   if (isLoading) {
//     return <div className="flex justify-center items-center h-screen">Loading...</div>;
//   }

//   if (error) {
//     return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-green-400 via-green-300 to-blue-500 flex flex-col p-4">
//       <div className="bg-white bg-opacity-90 rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full mx-auto">
//         <div className="p-4 sm:p-8">
//           <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">Your Weekly Meal Plan</h1>
          
//           <div className="flex justify-between items-center mb-6">
//             <button onClick={handlePrevWeek} className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-200">
//               <ChevronLeft size={24} />
//             </button>
//             <div className="flex-grow flex justify-between items-center overflow-x-auto px-2">
//               {weekDays.map((day, index) => (
//                 <div 
//                   key={index} 
//                   onClick={() => handleDayClick(day)}
//                   className={`text-center mx-1 sm:mx-2 cursor-pointer transition-colors duration-200 ease-in-out
//                     ${day.toDateString() === selectedDate.toDateString() 
//                       ? 'bg-green-500 text-white rounded-full w-12 h-12 flex flex-col items-center justify-center' 
//                       : 'hover:bg-green-100 rounded-full w-12 h-12 flex flex-col items-center justify-center'}`}
//                 >
//                   <div className="font-medium text-xs">{day.toLocaleDateString('en-US', { weekday: 'short' })}</div>
//                   <div className={`text-sm ${day.toDateString() === selectedDate.toDateString() ? 'font-bold' : ''}`}>{day.getDate()}</div>
//                 </div>
//               ))}
//             </div>
//             <button onClick={handleNextWeek} className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-200">
//               <ChevronRight size={24} />
//             </button>
//           </div>

//           <div className="text-center mb-6">
//             <h2 className="text-xl font-semibold text-gray-700">{formatDate(selectedDate)}</h2>
//           </div>

//           <div className="space-y-4 sm:space-y-6">
//             {mealTypes.map((mealType, index) => (
//               <div 
//                 key={index} 
//                 className="bg-white bg-opacity-50 backdrop-blur-sm rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
//                 onClick={() => setSelectedMeal(mealType)}
//               >
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <h2 className="font-bold text-lg text-green-700">{mealType.charAt(0).toUpperCase() + mealType.slice(1)}</h2>
//                     <p className="text-gray-700">{selectedMealPlan[mealType]}</p>
//                   </div>
//                   <ChevronDown className="text-gray-400" size={20} />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {selectedMeal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
//           <div className="bg-white rounded-t-3xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-bold">{selectedMeal.charAt(0).toUpperCase() + selectedMeal.slice(1)}</h2>
//                 <button onClick={() => setSelectedMeal(null)} className="text-gray-500">
//                   <X size={24} />
//                 </button>
//               </div>
//               <p className="text-lg font-semibold mb-4">{selectedMealPlan[selectedMeal]}</p>
//               {/* Note: Nutrition info and ingredients are not available in the current API response */}
//               <p className="text-gray-600">Detailed nutrition information and ingredients are not available for this meal.</p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default () => (
//   <div className="w-full min-h-screen bg-gray-100">
//     <MealPlanTab />
//   </div>
// );

import React, { useState, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, X, Camera } from 'lucide-react';
import TakeImage from './TakeImage';  // Ensure this import path is correct

const MealPlanTab = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weekStart, setWeekStart] = useState(new Date(new Date().setDate(new Date().getDate() - new Date().getDay())));
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [mealImages, setMealImages] = useState({});
  const [isCameraActive, setIsCameraActive] = useState(false);


  const mealTypes = ['Breakfast', 'Lunch', 'Dinner'];

  // Dummy data generator with nutrition info
  const generateDummyMealPlan = (date) => {
    const meals = [
      { name: 'Oatmeal with berries', nutrition: { calories: 300, carbs: 45, fat: 6, protein: 10 }, ingredients: ['Oats', 'Mixed berries', 'Honey', 'Milk'] },
      { name: 'Scrambled eggs with toast', nutrition: { calories: 350, carbs: 30, fat: 18, protein: 20 }, ingredients: ['Eggs', 'Whole grain bread', 'Butter', 'Salt', 'Pepper'] },
      { name: 'Yogurt parfait', nutrition: { calories: 250, carbs: 40, fat: 8, protein: 15 }, ingredients: ['Greek yogurt', 'Granola', 'Fresh fruits', 'Honey'] },
      { name: 'Grilled chicken salad', nutrition: { calories: 400, carbs: 15, fat: 22, protein: 35 }, ingredients: ['Grilled chicken breast', 'Mixed greens', 'Tomatoes', 'Cucumber', 'Olive oil dressing'] },
      { name: 'Vegetable stir-fry', nutrition: { calories: 350, carbs: 45, fat: 12, protein: 15 }, ingredients: ['Mixed vegetables', 'Tofu', 'Brown rice', 'Soy sauce', 'Sesame oil'] },
      { name: 'Tuna sandwich', nutrition: { calories: 450, carbs: 40, fat: 18, protein: 30 }, ingredients: ['Whole grain bread', 'Canned tuna', 'Mayonnaise', 'Lettuce', 'Tomato'] },
      { name: 'Salmon with roasted vegetables', nutrition: { calories: 500, carbs: 25, fat: 28, protein: 40 }, ingredients: ['Salmon fillet', 'Broccoli', 'Carrots', 'Olive oil', 'Lemon', 'Herbs'] },
      { name: 'Spaghetti Bolognese', nutrition: { calories: 550, carbs: 70, fat: 20, protein: 25 }, ingredients: ['Whole grain spaghetti', 'Ground beef', 'Tomato sauce', 'Onion', 'Garlic', 'Parmesan cheese'] },
      { name: 'Vegetarian curry', nutrition: { calories: 400, carbs: 55, fat: 15, protein: 12 }, ingredients: ['Mixed vegetables', 'Chickpeas', 'Coconut milk', 'Curry spices', 'Brown rice'] }
    ];
    
    return {
      date: date.toISOString().split('T')[0],
      Breakfast: meals[Math.floor(Math.random() * 3)],
      Lunch: meals[3 + Math.floor(Math.random() * 3)],
      Dinner: meals[6 + Math.floor(Math.random() * 3)]
    };
  };

  // Generate a week's worth of meal plans
  const weekMealPlans = useMemo(() => {
    const plans = {};
    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + i);
      plans[day.toISOString().split('T')[0]] = generateDummyMealPlan(day);
    }
    return plans;
  }, [weekStart]);

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-400 via-green-300 to-blue-500 flex flex-col p-4">
      {!isCameraActive && (
        <div className="bg-white bg-opacity-90 rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full mx-auto">
        <div className="p-4 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">Your Weekly Meal Plan</h1>
          
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

          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-700">{formatDate(selectedDate)}</h2>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {mealTypes.map((mealType, index) => (
              <div 
                key={index} 
                className="bg-white bg-opacity-50 backdrop-blur-sm rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                onClick={() => setSelectedMeal(mealType)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="font-bold text-lg text-green-700">{mealType}</h2>
                    <p className="text-gray-700">{selectedMealPlan[mealType].name}</p>
                  </div>
                  <ChevronDown className="text-gray-400" size={20} />
                </div>
              </div>
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
                <h3 className="text-lg font-semibold mb-2 text-green-700">Your Meal Image</h3>
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
                  <button 
                    onClick={() => setIsCameraActive(true)} 
                    className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center justify-center"
                  >
                    <Camera size={20} className="mr-2" />
                    Take Photo
                  </button>
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