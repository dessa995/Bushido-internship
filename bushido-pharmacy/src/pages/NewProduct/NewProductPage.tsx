import React, { useEffect } from 'react';

import ProductForm from '../../components/ProductForm/ProductForm';

const NewProductPage = () => {
  useEffect(() => {
    // Set the title when the component mounts
    document.title = 'New Product';

    // Optionally, you can reset the title when the component unmounts
    return () => {
      document.title = 'Pharmacy App';
    };
  }, []);
  return (
    <React.Fragment>
      <ProductForm id={''} />
    </React.Fragment>
  );
};

export default NewProductPage;
