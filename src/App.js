import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './landingPage.js';
import DataCollection from './DataCollection.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/data-collection" element={<DataCollection />} />
      </Routes>
    </Router>
  );
}

export default App;