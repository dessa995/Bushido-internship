import React from 'react';

import styles from './ProductView.module.css';
import { IProduct } from '../../services/interfaces';
import { Link, useNavigate } from 'react-router-dom';
import {
  productDataAtom,
  manufacturersDataAtom,
  productToEditAtom,
} from '../../App';
import { useAtom, useSetAtom } from 'jotai';

import { format } from 'date-fns';
import { RESET } from 'jotai/utils';

const ProductsView = () => {
  const setProductToEditAtom = useSetAtom(productToEditAtom);

  const [productsData, setProductsData] = useAtom(productDataAtom);
  const [manufacturersData] = useAtom(manufacturersDataAtom);

  const navigate = useNavigate();

  const handleAddNewClick = () => {
    setProductToEditAtom(RESET);
    navigate('/newProduct');
  };

  const handleEditClick = (product: IProduct) => {
    setProductToEditAtom(product);
    navigate('/edit');
  };

  const handleDelete = (productToDelete: IProduct) => {
    const newArray = productsData.filter(
      (product: IProduct) => product.id !== productToDelete.id
    );

    console.log(newArray);
    setProductsData(newArray);
  };

  return (
    <React.Fragment>
      <div className={styles.listWrapper}>
        <button onClick={handleAddNewClick} className={styles.addNewProductBtn}>
          Add New Product
        </button>
        <ul>
          {productsData.map((product: any, index: any) => {
            return (
              <li
                key={product.id}
                className={`${styles.productListItem} ${
                  index !== 0 && 'border-t-2 border-cyan-400'
                }`}
              >
                <div className={styles.productInfoWrapper}>
                  <h3 className={styles.productName}>{product?.name}</h3>
                  <p className={styles.productManufacturer}>
                    {
                      manufacturersData.find(
                        (manufacturer) =>
                          manufacturer.id === product.manufacturerDataId
                      )?.name
                    }
                  </p>
                  <p className={styles.productPrice}>
                    Price: {product?.price} &#x20AC;
                  </p>
                  <p className={styles.productExpiryDate}>
                    Expiry date:{' '}
                    {format(new Date(product.expiryDate), 'dd.MM.yyyy')}
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
              </li>
            );
          })}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default ProductsView;
