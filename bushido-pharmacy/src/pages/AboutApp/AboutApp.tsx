import React, { useEffect } from 'react';
import styles from './AboutApp.module.css';

const AboutApp = () => {
  useEffect(() => {
    // Set the title when the component mounts
    document.title = 'About App';

    // Optionally, you can reset the title when the component unmounts
    return () => {
      document.title = 'Pharmacy App';
    };
  }, []);
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
