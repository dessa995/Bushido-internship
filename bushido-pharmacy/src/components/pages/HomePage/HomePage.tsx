import React, { useState } from 'react';
import styles from './HomePage.module.css';
import SideNav from '../../SideNav/SideNav';

import ProductsView from '../../ProductsView/ProductsView';
import AboutApp from '../../AboutApp/AboutApp';
import StatisticsView from '../../Statistics/StatisticsView';

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
