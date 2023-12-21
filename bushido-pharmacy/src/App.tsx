import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import EditProductPage from './pages/EditProduct/EditProductPage';
import NewProductPage from './pages/NewProduct/NewProductPage';
import NotFound from './pages/NotFound/NotFound';
import { atomWithStorage } from 'jotai/utils';
import { v4 as uuidv4 } from 'uuid';

export const productToEditAtom = atomWithStorage('productToEdit', {
  id: '',
  name: '',
  manufacturerDataId: '',
  price: 0,
  expiryDate: new Date(),
});

export const manufacturersDataAtom = atomWithStorage('manufacturers', [
  {
    name: 'Hemofarm',
    id: '1',
  },
  {
    name: 'Bayer Bayer',
    id: '2',
  },
  {
    name: 'Ivančić i sinovi',
    id: '3',
  },
  {
    name: 'Nije u Sistemu',
    id: '99999',
  },
]);

export const productDataAtom = atomWithStorage('products', [
  {
    id: uuidv4(),
    name: 'aspirin',
    manufacturerDataId: '1',
    price: 3,
    expiryDate: new Date(2025, 1, 15),
  },
  {
    id: uuidv4(),
    name: 'letizen',
    manufacturerDataId: '1',
    price: 5,
    expiryDate: new Date(2028, 8, 24),
  },
  {
    id: uuidv4(),
    name: 'kardiopirin',
    manufacturerDataId: '2',
    price: 7,
    expiryDate: new Date(2022, 0, 31),
  },
  {
    id: uuidv4(),
    name: 'brufen',
    manufacturerDataId: '3',
    price: 21,
    expiryDate: new Date(2026, 0, 31),
  },
  {
    id: uuidv4(),
    name: 'analgin',
    manufacturerDataId: '99999',
    price: 13,
    expiryDate: new Date(2027, 4, 9),
  },
  {
    id: uuidv4(),
    name: 'xizal',
    manufacturerDataId: '1',
    price: 6,
    expiryDate: new Date(2024, 4, 9),
  },
  {
    id: uuidv4(),
    name: 'tylol hot',
    manufacturerDataId: '2',
    price: 21,
    expiryDate: new Date(2026, 4, 9),
  },
  {
    id: uuidv4(),
    name: 'paracetamol',
    manufacturerDataId: '99999',
    price: 3,
    expiryDate: new Date(2026, 4, 9),
  },
  {
    id: uuidv4(),
    name: 'nixar',
    manufacturerDataId: '3',
    price: 7,
    expiryDate: new Date(2027, 11, 9),
  },
  {
    id: uuidv4(),
    name: 'duobiotic',
    manufacturerDataId: '1',
    price: 2,
    expiryDate: new Date(2027, 4, 9),
  },
]);

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/edit" element={<EditProductPage />} />
        <Route path="/newProduct" element={<NewProductPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
