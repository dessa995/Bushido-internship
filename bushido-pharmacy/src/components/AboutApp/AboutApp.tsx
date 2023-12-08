import React from 'react';
import styles from './AboutApp.module.css';

const AboutApp = () => {
  return (
    <div className={styles.aboutWrapper}>
      <div className="flex flex-col gap-2 items-center justify-center">
        <h2 className={styles.aboutHeading}>App created by Desimir Popović</h2>
        <p className={styles.aboutVersion}>Version: 1.0</p>
      </div>
    </div>
  );
};

export default AboutApp;
