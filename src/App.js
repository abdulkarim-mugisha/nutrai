// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import LandingPage from './landingPage.js';
// import DataCollection from './DataCollection.js';
// import MealPlanTab from './mealPlanTab.js';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/data-collection" element={<DataCollection />} />
//         <Route path="/meal-plan" element={<MealPlanTab />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ArrowUpRight, Book, User } from 'lucide-react';
import LandingPage from './landingPage.js';
import DataCollection from './DataCollection.js';
import MealPlanTab from './mealPlanTab.js';
import MyProgress from './MyProgressTab.js';
import MeTab from './MeTab.js';

const MainContent = () => {
  const [currentTab, setCurrentTab] = useState('mealPlan');
  const location = useLocation();
  const navigate = useNavigate();

  const renderTab = () => {
    switch (currentTab) {
      case 'progress':
        return <MyProgress />;
      case 'mealPlan':
        return <MealPlanTab />;
      case 'me':
        return <MeTab />;
      default:
        return <MealPlanTab />;
    }
  };

  // Only render tabs and content if we're not on the landing page or data collection page
  if (location.pathname === '/' || location.pathname === '/data-collection') {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/data-collection" element={<DataCollection />} />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-400 via-green-300 to-blue-500 flex flex-col">
      <div className="flex-grow">
        {renderTab()}
      </div>

      <div className="bg-white bg-opacity-90 shadow-lg p-4">
        <div className="max-w-5xl mx-auto flex justify-around">
          <button 
            onClick={() => {
              setCurrentTab('progress');
              navigate('/app/progress');
            }}
            className={`text-center transition ${currentTab === 'progress' ? 'text-green-600' : 'text-gray-600'} hover:text-green-800`}
          >
            <ArrowUpRight size={24} />
            <div>My Progress</div>
          </button>
          <button 
            onClick={() => {
              setCurrentTab('mealPlan');
              navigate('/app/meal-plan');
            }}
            className={`text-center transition ${currentTab === 'mealPlan' ? 'text-green-600' : 'text-gray-600'} hover:text-green-800`}
          >
            <Book size={24} />
            <div>Meal Plan</div>
          </button>
          <button 
            onClick={() => {
              setCurrentTab('me');
              navigate('/app/me');
            }}
            className={`text-center transition ${currentTab === 'me' ? 'text-green-600' : 'text-gray-600'} hover:text-green-800`}
          >
            <User size={24} />
            <div>Me</div>
          </button>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/data-collection" element={<DataCollection />} />
        <Route path="/app/*" element={<MainContent />} />
      </Routes>
    </Router>
  );
}

export default App;
