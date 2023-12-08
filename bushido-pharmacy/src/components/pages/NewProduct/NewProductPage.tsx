import React, { useEffect, useState } from 'react';
import { IProduct } from '../../../services/interfaces';
import { productDataAtom, manufacturersDataAtom } from '../../../App';
import { useAtom } from 'jotai';

import styles from '../EditProduct/EditProductPage.module.css';

import { v4 as uuidv4 } from 'uuid';

const NewProductPage = () => {
  const [productsData, setProductsData] = useAtom(productDataAtom);

  const [nameError, setNameError] = useState(false);
  const [manufatruerError, setManufatruerError] = useState(false);
  const [priceError, setPriceError] = useState(false);

  const [manufacturersData, setManufacturersData] = useAtom(
    manufacturersDataAtom
  );

  const [newProduct, setNewProduct] = useState<IProduct>({
    id: '',
    name: '',
    manufacturer: {
      name: '',
      id: '',
    },
    price: 0,
    expiryDate: new Date(),
  });

  const handleNameChange = (e: any) => {
    e.preventDefault();
    setNewProduct((prevProduct: IProduct) => ({
      ...prevProduct,
      id: uuidv4(),
      name: e.target.value,
    }));
  };

  const handleManufacturerChange = (e: any) => {
    e.preventDefault();

    setNewProduct((prevProduct: IProduct) => ({
      ...prevProduct,
      manufacturer: {
        name: e.target.value,
        id: e.target.id,
      },
    }));
  };

  const handlePriceChange = (e: any) => {
    e.preventDefault();
    setNewProduct((prevProduct: IProduct) => ({
      ...prevProduct,
      price: e.target.value,
    }));
  };

  const handleDateChange = (e: any) => {
    e.preventDefault();
    const selectedDate = new Date(e.target.value);
    setNewProduct((prevProduct: IProduct) => ({
      ...prevProduct,
      expiryDate: selectedDate,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newArray = productsData;
    newArray.push(newProduct);
    setProductsData(newArray);
  };

  return (
    <React.Fragment>
      <div className="flex h-screen w-full justify-center items-center max-w-[2000px]">
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputWrapper}>
            <label htmlFor="name" className={styles.label}>
              Product Name:{' '}
            </label>
            <input
              className={styles.textInput}
              type="text"
              name="name"
              id="name"
              value={newProduct?.name}
              onChange={handleNameChange}
            />
          </div>
          <div className={styles.selectWrapper}>
            <select
              className={styles.select}
              name="manufacturer"
              id="manufacturer"
              onChange={handleManufacturerChange}
              defaultValue={'disabled'}
            >
              <option value={'disabled'} disabled hidden>
                - Please select Manufacturer -
              </option>
              {manufacturersData?.map((manu) => (
                <option key={manu?.id} value={manu?.name} id={manu?.id}>
                  {manu?.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="price" className={styles.label}>
              Price
            </label>
            <input
              className={styles.numberInput}
              type="number"
              name="price"
              id="price"
              value={newProduct?.price}
              onChange={handlePriceChange}
            />
            <span>&#x20AC;</span>
          </div>
          <div className={styles.inputWrapper}>
            <input
              className={styles.dateInput}
              type="date"
              name="expiryDate"
              id="expiryDate"
              value={newProduct?.expiryDate.toISOString().split('T')[0]}
              onChange={handleDateChange}
            />
          </div>
          <button className={styles.submitBtn} type="submit">
            Submit
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default NewProductPage;
