import React, { useState, useEffect } from 'react';
import styles from './HomePage.module.css';
import SideNav from '../../components/SideNav/SideNav';
import { Outlet, Navigate } from 'react-router-dom';

const HomePage = () => {
  const [productsView, setProductsView] = useState(false);
  const [aboutAppView, setAboutAppView] = useState(false);
  const [statsView, setStatsView] = useState(false);

  useEffect(() => {
    setProductsView(true);
  }, []);

  const redirectToProducts = () => <Navigate to="/products" replace />;

  return (
    <>
      {redirectToProducts()} {/* Render the redirection */}
      <div className={styles.pageWrapper}>
        <SideNav
          productsView={productsView}
          setProductsView={setProductsView}
          aboutAppView={aboutAppView}
          setAboutAppView={setAboutAppView}
          statsView={statsView}
          setStatsView={setStatsView}
        />
        <Outlet />
      </div>
    </>
  );
};

export default HomePage;
