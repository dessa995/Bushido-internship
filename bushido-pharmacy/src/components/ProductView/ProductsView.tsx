import React, { useState, useEffect } from "react";

import styles from "./ProductView.module.css";

const ProductView = () => {
  const [productsData, setProductsData] = useState<IProduct[]>([]);

  const date = new Date();

  const hemofarm: IManufacturer = {
    id: "1",
    name: "Hemofarm",
  };

  const bayerBayer: IManufacturer = {
    id: "2",
    name: "Bayer Bayer",
  };

  const products = [
    {
      id: "1",
      name: "aspirin",
      manufacturer: hemofarm,
      price: 3,
      expiryDate: date,
    },
    {
      id: "2",
      name: "letizen",
      manufacturer: hemofarm,
      price: 5,
      expiryDate: date,
    },
    {
      id: "3",
      name: "kardiopirin",
      manufacturer: bayerBayer,
      price: 7,
      expiryDate: date,
    },
  ];

  useEffect(() => {
    const fetchLocalStorage = () => {
      const rawData = localStorage.getItem("products");
      if (rawData) {
        const data = JSON.parse(rawData);
        setProductsData(data);
      } else {
        setProductsData(products);
      }
    };

    fetchLocalStorage();
  }, []);

  console.log(productsData);

  return (
    <React.Fragment>
      <div className={styles.testDiv}>
        <ul>
          {productsData.map((product) => (
            <li key={product.id} className={styles.productListItem}>
              <div>
                <h3>{product.name}</h3>
                <p>{product.manufacturer.name}</p>
                <p>{product.price} &#x20AC;</p>
                <p>{`${product.expiryDate.getDay()}.${
                  product.expiryDate.getMonth() + 1
                }.${product.expiryDate.getFullYear()}.`}</p>
              </div>
              <button className={styles.listBtn}>Edit</button>
            </li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default ProductView;
