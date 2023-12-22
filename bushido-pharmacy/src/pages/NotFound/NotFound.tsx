import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';
import { useSetDocumentTitle } from '../../hooks/useSetDocumentTitle';

const NotFound = () => {
  useSetDocumentTitle('Not found');

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
