import React, { useState } from 'react';
import styles from './HomePage.module.css';
import SideNav from '../../components/SideNav/SideNav';

import ProductsView from '../../components/ProductsView/ProductsView';
import AboutApp from '../../components/AboutApp/AboutApp';
import StatisticsView from '../../components/Statistics/StatisticsView';

const HomePage = () => {
  const [productsView, setProductsView] = useState(true);
  const [aboutAppView, setAboutAppView] = useState(false);
  const [statsView, setStatsView] = useState(false);

  return (
    <>
      <div className={styles.pageWrapper}>
        <SideNav
          productsView={productsView}
          setProductsView={setProductsView}
          aboutAppView={aboutAppView}
          setAboutAppView={setAboutAppView}
          statsView={statsView}
          setStatsView={setStatsView}
        />
        {productsView && <ProductsView />}
        {aboutAppView && <AboutApp />}
        {statsView && <StatisticsView />}
      </div>
    </>
  );
};

export default HomePage;
