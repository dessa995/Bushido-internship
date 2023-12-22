import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import EditProductPage from './pages/EditProduct/EditProductPage';
import NewProductPage from './pages/NewProduct/NewProductPage';
import NotFound from './pages/NotFound/NotFound';
import ProductsView from './pages/ProductsView/ProductsView';
import StatisticsView from './pages/Statistics/StatisticsView';
import AboutApp from './pages/AboutApp/AboutApp';
import SideNav from './components/SideNav/SideNav';
import { ROUTES } from './constants/navigation';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="flex lg:flex-row flex-col justify-end px-16 p-5">
        <SideNav />
        <Routes>
          <Route path={ROUTES.HOME} element={<ProductsView />} />
          <Route path={ROUTES.STATISTICS} element={<StatisticsView />} />
          <Route path={ROUTES.ABOUT} element={<AboutApp />} />
          <Route path={ROUTES.EDIT_PRODUCT} element={<EditProductPage />} />
          <Route path={ROUTES.NEW_PRODUCT} element={<NewProductPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
