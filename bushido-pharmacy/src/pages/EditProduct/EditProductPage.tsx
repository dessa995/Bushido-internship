import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductForm from '../../components/ProductForm/ProductForm';
import { useAtom } from 'jotai';
import { productDataAtom } from '../../App';

const EditProductPage: React.FC = () => {
  const { productId } = useParams();
  const [productToEdit, setProductToEdit] = useState({});
  const [productsData] = useAtom(productDataAtom);

  useEffect(() => {
    const product = productsData.find((product) => product.id === productId);

    if (product) {
      setProductToEdit(product);
    }
  }, []);

  return (
    <>
      <ProductForm id={productId} />
    </>
  );
};

export default EditProductPage;
