import { useAtom, useSetAtom } from 'jotai';
import React from 'react';
import {
  manufacturersDataAtom,
  productDataAtom,
  productToEditAtom,
} from '../../../App';
import { IProduct } from '../../../services/interfaces';

import styles from './ProductCard.module.css';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const ProductCard = ({ product }: { product: IProduct }) => {
  const [productsData, setProductsData] = useAtom(productDataAtom);
  const [manufacturersData] = useAtom(manufacturersDataAtom);
  const setProductToEditAtom = useSetAtom(productToEditAtom);

  const navigate = useNavigate();

  const handleEditClick = (product: IProduct) => {
    setProductToEditAtom(product);
    navigate('/edit');
  };

  const handleDelete = (productToDelete: IProduct) => {
    const newArray = productsData.filter(
      (product: IProduct) => product.id !== productToDelete.id
    );

    setProductsData(newArray);
  };
  return (
    <React.Fragment>
      <div className={styles.productInfoWrapper}>
        <h3 className={styles.productName}>{product?.name}</h3>
        <p className={styles.productManufacturer}>
          {
            manufacturersData.find(
              (manufacturer) => manufacturer.id === product.manufacturerDataId
            )?.name
          }
        </p>
        <p className={styles.productPrice}>Price: {product?.price} &#x20AC;</p>
        <p className={styles.productExpiryDate}>
          Expiry date: {format(new Date(product.expiryDate), 'dd.MM.yyyy')}
        </p>
      </div>
      <div className={styles.buttonsWrapper}>
        <button
          className={styles.listBtn}
          onClick={() => {
            handleEditClick(product);
          }}
        >
          Edit
        </button>
        <button
          className={styles.deleteBtn}
          onClick={() => {
            handleDelete(product);
          }}
        >
          Delete
        </button>
      </div>
    </React.Fragment>
  );
};

export default ProductCard;
