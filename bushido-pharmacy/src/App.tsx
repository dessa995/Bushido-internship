import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/pages/HomePage/HomePage';
import EditProductPage from './components/pages/EditProduct/EditProductPage';
import NewProductPage from './components/pages/NewProduct/NewProductPage';
import { atomWithStorage } from 'jotai/utils';
// import { IManufacturer, IProduct } from './services/interfaces';

// import './App.css'
export const DataContext = React.createContext<any | undefined>(undefined);

export const manufacturersDataAtom = atomWithStorage('manufactorers', [
  {
    name: 'Hemofarm',
    id: '1',
  },
  {
    name: 'Bayer Bayer',
    id: '2',
  },
]);

export const productDataAtom = atomWithStorage('products', [
  {
    id: '1',
    name: 'aspirin',
    manufacturer: {
      name: 'Hemofarm',
      id: '1',
    },
    price: 3,
    expiryDate: new Date(2025, 1, 15),
  },
  {
    id: '2',
    name: 'letizen',
    manufacturer: {
      name: 'Hemofarm',
      id: '1',
    },
    price: 5,
    expiryDate: new Date(2028, 8, 24),
  },
  {
    id: '3',
    name: 'kardiopirin',
    manufacturer: {
      name: 'Bayer Bayer',
      id: '2',
    },
    price: 7,
    expiryDate: new Date(2022, 0, 31),
  },
]);

const App: React.FC = () => {
  // const [productsData, setProductsData] = useState<IProduct[]>([]);
  // const [manufacturersData, setManufacturersData] = useState<IManufacturer[]>(
  //   []
  // );

  // const manufacturers = [
  //   {
  //     name: 'Hemofarm',
  //     id: '1',
  //   },
  //   {
  //     name: 'Bayer Bayer',
  //     id: '2',
  //   },
  // ];

  // manufacturers.map((item, index) => ({ ...item, id: index + 1 }));

  // const fetchLocalStorage = () => {
  //   const rawData = localStorage.getItem('manufacturers');
  //   if (rawData && rawData.length > 2) {
  //     console.log('App if grana');

  //     const data = JSON.parse(rawData);
  //     setManufacturersData(data);
  //   } else {
  //     console.log('app else branch');

  //     setManufacturersData(manufacturers);
  //     localStorage.setItem('manufacturers', JSON.stringify(manufacturersData));
  //   }
  // };

  // useEffect(() => {
  //   fetchLocalStorage();
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem('manufacturers', JSON.stringify(manufacturersData));
  // }, [manufacturersData]);

  // const date = new Date();

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
        </Routes>
      </BrowserRouter>
    </DataContext.Provider>
  );
};

export default App;
