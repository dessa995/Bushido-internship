import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound = () => {
  useEffect(() => {
    // Set the title when the component mounts
    document.title = 'Page Not Found';

    // Optionally, you can reset the title when the component unmounts
    return () => {
      document.title = 'Pharmacy App';
    };
  }, []);
  return (
    <div className={styles.contentWrapper}>
      <div className={styles.contentBox}>
        <h2 className={styles.contentHeading}>
          Page you are looking for is nowhere to be found... :({' '}
        </h2>
        <Link className={styles.linkBack} to={'/'}>
          Go to home?
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
