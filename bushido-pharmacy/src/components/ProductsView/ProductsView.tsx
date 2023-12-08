import React, { useContext } from 'react';

import styles from './ProductView.module.css';
import { IProduct } from '../../services/interfaces';
import { Link, useNavigate } from 'react-router-dom';
import { DataContext, productDataAtom } from '../../App';
import { useAtom } from 'jotai';

import { format } from 'date-fns';

const ProductsView = () => {
  const { setProductToEdit } = useContext(DataContext);
  // const { setProductsData } = useContext(DataContext);

  const [productsData] = useAtom(productDataAtom);

  const navigate = useNavigate();
  console.log('Products data', productsData);

  const handleEditClick = (product: IProduct) => {
    setProductToEdit(product);
    navigate('/edit');
  };

  // const fetchLocalStorage = () => {
  //   const rawData = localStorage.getItem('products');
  //   if (rawData && rawData !== '[]') {
  //     const data = JSON.parse(rawData, (key, value) => {
  //       if (key === 'expiryDate' && typeof value === 'string') {
  //         return new Date(value);
  //       }
  //       return value;
  //     });
  //     console.log(data);

  //     setProductsData(data);
  //   } else {
  //     setProductsData(products);
  //   }
  // };

  // useEffect(() => {
  //   fetchLocalStorage();
  // }, []);

  return (
    <React.Fragment>
      <div className={styles.listWrapper}>
        <Link to="/newProduct" className={styles.addNewProductBtn}>
          Add New Product
        </Link>
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
                    {product?.manufacturer?.name}
                  </p>
                  <p className={styles.productPrice}>
                    Price: {product?.price} &#x20AC;
                  </p>
                  <p className={styles.productExpiryDate}>
                    Expiry date:{' '}
                    {format(new Date(product.expiryDate), 'dd.MM.yyyy')}
                  </p>
                </div>
                <button
                  className={styles.listBtn}
                  onClick={() => {
                    handleEditClick(product);
                  }}
                >
                  Edit
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default ProductsView;
