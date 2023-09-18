import React from 'react';
import './App.css';
import News from './Components/News';
import Favorites from './Components/Favorites';
import { Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Routes>
      <Route path="/" element={<News />} />
      <Route path="/favorites" element={<Favorites />} />
    </Routes>
  );
}

export default App;
