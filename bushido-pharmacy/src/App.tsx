import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import EditProductPage from './pages/EditProduct/EditProductPage';
import NewProductPage from './pages/NewProduct/NewProductPage';
import NotFound from './pages/NotFound/NotFound';
import ProductsView from './pages/ProductsView/ProductsView';
import StatisticsView from './pages/Statistics/StatisticsView';
import AboutApp from './pages/AboutApp/AboutApp';
import SideNav from './components/SideNav/SideNav';

const App: React.FC = () => {
  const [productsView, setProductsView] = useState(true);
  const [aboutAppView, setAboutAppView] = useState(false);
  const [statsView, setStatsView] = useState(false);

  return (
    <BrowserRouter>
      <div className="flex lg:flex-row flex-col justify-end px-16 p-5">
        <SideNav
          productsView={productsView}
          setProductsView={setProductsView}
          aboutAppView={aboutAppView}
          setAboutAppView={setAboutAppView}
          statsView={statsView}
          setStatsView={setStatsView}
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsView />} />
          <Route path="/statistics" element={<StatisticsView />} />
          <Route path="/about" element={<AboutApp />} />
          <Route path="/edit/:productId" element={<EditProductPage />} />
          <Route path="/newProduct" element={<NewProductPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
