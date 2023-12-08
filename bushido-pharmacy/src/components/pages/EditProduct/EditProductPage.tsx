import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DataContext,
  manufacturersDataAtom,
  productDataAtom,
} from '../../../App';
import { IProduct } from '../../../services/interfaces';
import { useAtom } from 'jotai';

import styles from './EditProductPage.module.css';

const EditProductPage = () => {
  const { productToEdit, setProductToEdit } = useContext(DataContext);
  const [productsData, setProductsData] = useAtom(productDataAtom);
  const [manufacturersData] = useAtom(manufacturersDataAtom);

  const navigate = useNavigate();

  const handleNameChange = (e: any) => {
    e.preventDefault();
    setProductToEdit((prevProduct: IProduct) => ({
      ...prevProduct,
      name: e.target.value,
    }));
  };

  const handleManufacturerChange = (e: any) => {
    e.preventDefault();

    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const option = el.getAttribute('id');

    if (option !== productToEdit?.manufacturerDataId) {
      setProductToEdit((prevProduct: IProduct) => ({
        ...prevProduct,
        manufacturerDataId: option,
      }));
    }
  };

  const handlePriceChange = (e: any) => {
    e.preventDefault();
    setProductToEdit((prevProduct: IProduct) => ({
      ...prevProduct,
      price: e.target.value,
    }));
  };

  const handleDateChange = (e: any) => {
    e.preventDefault();
    setProductToEdit((prevProduct: IProduct) => ({
      ...prevProduct,
      expiryDate: new Date(e.target.value), // Convert the string to a Date object
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newProducts = productsData.filter(
      (product: IProduct) => product.id !== productToEdit.id
    ) as IProduct[];

    setProductsData([...newProducts, productToEdit]); // Spread the newProducts array and add the edited product
    // console.log('submitted');
    navigate('/');
  };

  useEffect(() => {
    // console.log('set items2', productsData);
    localStorage.setItem('products', JSON.stringify(productsData));
    console.log(productToEdit, 'edited object'); // Log the updated productsData when it changes
  }, [productsData]);

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
              value={productToEdit?.name}
              onChange={handleNameChange}
            />
          </div>
          {/* make a separate component for select */}
          <div className={styles.selectWrapper}>
            <select
              className={styles.select}
              name="manufacturer"
              id="manufacturer"
              onChange={handleManufacturerChange}
            >
              {manufacturersData.map((manu) => {
                console.log(manu);

                return (
                  <option key={manu.id} value={manu.name} id={manu.id}>
                    {manu.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={styles.inputWrapper}>
            <label className={styles.label} htmlFor="price">
              Price
            </label>
            <input
              className={styles.numberInput}
              type="number"
              name="price"
              id="price"
              value={productToEdit?.price}
              onChange={handlePriceChange}
            />
            <span className={styles.currency}>&#x20AC;</span>
          </div>
          <div className={styles.inputWrapper}>
            <input
              className={styles.dateInput}
              type="date"
              name="expiryDate"
              id="expiryDate"
              value={productToEdit?.expiryDate}
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

export default EditProductPage;
