import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductForm from '../../components/ProductForm/ProductForm';
import { useAtom } from 'jotai';
import { productDataAtom } from '../../services/InitialData';

const EditProductPage: React.FC = () => {
  const { productId } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_productToEdit, setProductToEdit] = useState({});
  const [productsData] = useAtom(productDataAtom);

  useEffect(() => {
    // Set the title when the component mounts
    document.title = 'Edit Product';

    // Optionally, you can reset the title when the component unmounts
    return () => {
      document.title = 'Pharmacy App';
    };
  }, []);

  useEffect(() => {
    const product = productsData.find((product) => product.id === productId);

    if (product) {
      setProductToEdit(product);
    }
  }, [productId, productsData]);

  return (
    <>
      <ProductForm id={productId} />
    </>
  );
};

export default EditProductPage;
