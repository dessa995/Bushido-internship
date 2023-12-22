import React from 'react';

import styles from './SideNav.module.css';
import { Link } from 'react-router-dom';

type SideNavProps = {
  productsView: boolean;
  setProductsView: React.Dispatch<React.SetStateAction<boolean>>;
  aboutAppView: boolean;
  setAboutAppView: React.Dispatch<React.SetStateAction<boolean>>;
  statsView: boolean;
  setStatsView: React.Dispatch<React.SetStateAction<boolean>>;
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
      <div className="relative w-[25%]">
        <ul className={styles.optionsList}>
          <li
            onClick={activateProducts}
            className={productsView ? styles.listItemActive : styles.listItem}
          >
            <Link to={`/`}>Products</Link>
          </li>
          <li
            onClick={activateStats}
            className={statsView ? styles.listItemActive : styles.listItem}
          >
            <Link to={`/statistics`}>Statistics</Link>
          </li>
          <li
            onClick={activateAboutApp}
            className={aboutAppView ? styles.listItemActive : styles.listItem}
          >
            <Link to={`/about`}>About App</Link>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default SideNav;
