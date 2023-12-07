import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/pages/HomePage/HomePage';
import EditProductPage from './components/pages/EditProduct/EditProductPage';
import NewProductPage from './components/pages/NewProduct/NewProductPage';
import { IManufacturer, IProduct } from './services/interfaces';

// import './App.css'
export const DataContext = React.createContext<any | undefined>(undefined);

const App: React.FC = () => {
  const [productToEdit, setProductToEdit] = useState(null);
  const [productsData, setProductsData] = useState<IProduct[]>([]);
  const [manufacturersData, setManufacturersData] = useState<IManufacturer[]>(
    []
  );

  const manufacturers = [
    {
      name: 'Hemofarm',
      id: '1',
    },
    {
      name: 'Bayer Bayer',
      id: '2',
    },
  ];

  // manufacturers.map((item, index) => ({ ...item, id: index + 1 }));

  useEffect(() => {
    const fetchLocalStorage = () => {
      const rawData = localStorage.getItem('manufacturers');
      if (rawData && rawData.length > 2) {
        console.log('rawdata', rawData.length);

        const data = JSON.parse(rawData);
        setManufacturersData(data);
      } else {
        console.log('else branch');

        setManufacturersData(manufacturers);
        localStorage.setItem(
          'manufacturers',
          JSON.stringify(manufacturersData)
        );
      }
    };

    fetchLocalStorage();
  }, []);

  useEffect(() => {
    localStorage.setItem('manufacturers', JSON.stringify(manufacturersData));
  }, [manufacturersData]);

  const date = new Date();

  const products = [
    {
      id: '1',
      name: 'aspirin',
      manufacturer: manufacturers[0],
      price: 3,
      expiryDate: date,
    },
    {
      id: '2',
      name: 'letizen',
      manufacturer: manufacturers[0],
      price: 5,
      expiryDate: date,
    },
    {
      id: '3',
      name: 'kardiopirin',
      manufacturer: manufacturers[1],
      price: 7,
      expiryDate: date,
    },
  ];

  return (
    <DataContext.Provider
      value={{
        productToEdit,
        setProductToEdit,
        products,
        productsData,
        setProductsData,
        manufacturersData,
        setManufacturersData,
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
