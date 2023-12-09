import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/pages/HomePage/HomePage';
import EditProductPage from './components/pages/EditProduct/EditProductPage';
import NewProductPage from './components/pages/NewProduct/NewProductPage';
import { atomWithStorage } from 'jotai/utils';
import { v4 as uuidv4 } from 'uuid';
import NotFound from './components/pages/NotFound/NotFound';

// import { IManufacturer, IProduct } from './services/interfaces';

export const DataContext = React.createContext<any | undefined>(undefined);

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
]);

const App: React.FC = () => {
  const [productToEdit, setProductToEdit] = useState(null);

  return (
    <DataContext.Provider
      value={{
        productToEdit,
        setProductToEdit,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/edit" element={<EditProductPage />} />
          <Route path="/newProduct" element={<NewProductPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </DataContext.Provider>
  );
};

export default App;
