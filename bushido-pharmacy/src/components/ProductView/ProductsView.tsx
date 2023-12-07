import React, { useState, useEffect } from 'react';

import styles from './ProductView.module.css';
import { IManufacturer, IProduct } from '../../services/interfaces';
import { Link } from 'react-router-dom';

const ProductView = () => {
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
        const data = JSON.parse(rawData);
        setProductsData(data);
      } else {
        setProductsData(products);
      }
    };

    fetchLocalStorage();
  }, []);

  return (
    <React.Fragment>
      <div className={styles.testDiv}>
        <Link to="/newProduct" className={styles.addNewProductBtn}>
          Add New Product
        </Link>
        <ul>
          {productsData.map((product) => {
            console.log(typeof product.expiryDate);
            return (
              <li key={product.id} className={styles.productListItem}>
                <div>
                  <h3>{product?.name}</h3>
                  <p>{product?.manufacturer?.name}</p>
                  <p>{product?.price} &#x20AC;</p>
                  <p>{`${product?.expiryDate?.getDay()}.${
                    product?.expiryDate?.getMonth() + 1
                  }.${product?.expiryDate?.getFullYear()}.`}</p>
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

export default ProductView;
