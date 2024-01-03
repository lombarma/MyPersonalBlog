import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage'; // Vos composants de page
import SearchPage from './SearchPage';
import Navbar from "./Navbar";
import LoginPage from "./LoginPage";

function App() {
  return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* Autres routes ici */}
        </Routes>
      </Router>
  );
}

export default App;
