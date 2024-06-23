import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './landingPage.js';
import DataCollection from './DataCollection.js';
<<<<<<< HEAD
import MealPlanTab from './mealPlanTab.js';
=======
>>>>>>> 245a8cf8eb3775d387a32f3582e9736624e66b9a

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/data-collection" element={<DataCollection />} />
<<<<<<< HEAD
        <Route path="/meal-plan" element={<MealPlanTab />} />
=======
>>>>>>> 245a8cf8eb3775d387a32f3582e9736624e66b9a
      </Routes>
    </Router>
  );
}

export default App;