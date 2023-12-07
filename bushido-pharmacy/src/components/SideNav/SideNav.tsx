import React from 'react';

import styles from './SideNav.module.css';

type SideNavProps = {
  productsView: boolean;
  setProductsView: any;
  aboutAppView: boolean;
  setAboutAppView: any;
  statsView: boolean;
  setStatsView: any;
};

const SideNav = ({
  productsView,
  setProductsView,
  aboutAppView,
  setAboutAppView,
  statsView,
  setStatsView,
}: SideNavProps) => {
  const activateProducts = () => {
    setProductsView(true);
    setAboutAppView(false);
    setStatsView(false);
  };

  const activateAboutApp = () => {
    setProductsView(false);
    setAboutAppView(true);
    setStatsView(false);
  };

  const activateStats = () => {
    setProductsView(false);
    setAboutAppView(false);
    setStatsView(true);
  };

  return (
    <React.Fragment>
      <ul>
        <li
          onClick={activateProducts}
          className={productsView ? styles.listItemActive : styles.listItem}
        >
          Products
        </li>
        <li
          onClick={activateAboutApp}
          className={aboutAppView ? styles.listItemActive : styles.listItem}
        >
          About App
        </li>
        <li
          onClick={activateStats}
          className={statsView ? styles.listItemActive : styles.listItem}
        >
          Statistics
        </li>
      </ul>
    </React.Fragment>
  );
};

export default SideNav;
