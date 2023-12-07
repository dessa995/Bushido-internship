import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/pages/HomePage/HomePage';
import EditProductPage from './components/pages/EditProduct/EditProductPage';
import NewProductPage from './components/pages/NewProduct/NewProductPage';

// import './App.css'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/edit" element={<EditProductPage />} />
        <Route path="/newProduct" element={<NewProductPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
