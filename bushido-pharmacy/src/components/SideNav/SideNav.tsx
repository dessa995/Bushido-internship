import React from 'react';

import styles from './SideNav.module.css';

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
          {/* add link elements after fixing routes */}
          <li
            onClick={activateProducts}
            className={productsView ? styles.listItemActive : styles.listItem}
          >
            Products
          </li>
          <li
            onClick={activateStats}
            className={statsView ? styles.listItemActive : styles.listItem}
          >
            Statistics
          </li>
          <li
            onClick={activateAboutApp}
            className={aboutAppView ? styles.listItemActive : styles.listItem}
          >
            About App
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default SideNav;
