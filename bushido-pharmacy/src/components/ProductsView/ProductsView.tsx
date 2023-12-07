import React, { useState, useEffect } from 'react';

import styles from './ProductView.module.css';
import { IManufacturer, IProduct } from '../../services/interfaces';
import { Link } from 'react-router-dom';

const ProductsView = () => {
  const [productsData, setProductsData] = useState<IProduct[]>([]);

  const date = new Date();

  const hemofarm: IManufacturer = {
    id: '1',
    name: 'Hemofarm',
  };

  const bayerBayer: IManufacturer = {
    id: '2',
    name: 'Bayer Bayer',
  };

  const products = [
    {
      id: '1',
      name: 'aspirin',
      manufacturer: hemofarm,
      price: 3,
      expiryDate: date,
    },
    {
      id: '2',
      name: 'letizen',
      manufacturer: hemofarm,
      price: 5,
      expiryDate: date,
    },
    {
      id: '3',
      name: 'kardiopirin',
      manufacturer: bayerBayer,
      price: 7,
      expiryDate: date,
    },
  ];

  useEffect(() => {
    const fetchLocalStorage = () => {
      const rawData = localStorage.getItem('products');
      if (rawData) {
        const data = JSON.parse(rawData, (key, value) => {
          if (key === 'expiryDate' && typeof value === 'string') {
            return new Date(value);
          }
          return value;
        });
        setProductsData(data);
      } else {
        setProductsData(products);
        localStorage.setItem('products', JSON.stringify(productsData));
      }
    };

    fetchLocalStorage();
  }, []);

  return (
    <React.Fragment>
      <div className={styles.listWrapper}>
        <Link to="/newProduct" className={styles.addNewProductBtn}>
          Add New Product
        </Link>
        <ul>
          {productsData.map((product, index) => {
            console.log(typeof product.expiryDate);
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
                    {`${product?.expiryDate.getDate()}.${
                      product?.expiryDate?.getMonth() + 1
                    }. ${product?.expiryDate?.getFullYear()}`}
                  </p>
                </div>
                <Link to="/edit" className={styles.listBtn}>
                  Edit
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default ProductsView;
