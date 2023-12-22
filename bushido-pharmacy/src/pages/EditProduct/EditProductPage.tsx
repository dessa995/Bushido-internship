import React from 'react';
import { useParams } from 'react-router-dom';
import ProductForm from '../../components/ProductForm/ProductForm';
import { useSetDocumentTitle } from '../../hooks/useSetDocumentTitle';

const EditProductPage: React.FC = () => {
  const { productId } = useParams();

  useSetDocumentTitle('Edit Product');

  return (
    <>
      <ProductForm id={productId} />
    </>
  );
};

export default EditProductPage;
