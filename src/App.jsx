import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Hero'
import AnalyticsPage from './pages/salescomponent'; // Replace with actual page component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/analytics-page" element={<AnalyticsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
