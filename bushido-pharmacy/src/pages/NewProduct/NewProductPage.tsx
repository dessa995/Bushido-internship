import React, { useEffect } from 'react';

import ProductForm from '../../components/ProductForm/ProductForm';
import { useSetDocumentTitle } from '../../hooks/useSetDocumentTitle';

const NewProductPage = () => {
  useSetDocumentTitle('New Product');

  return (
    <React.Fragment>
      <ProductForm id={''} />
    </React.Fragment>
  );
};

export default NewProductPage;
