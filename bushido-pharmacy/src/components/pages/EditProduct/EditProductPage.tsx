import React, { useContext, useState } from 'react';
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

  const [nameError, setNameError] = useState(false);
  const [manufatruerError, setManufatruerError] = useState(false);
  const [priceError, setPriceError] = useState(false);

  const [errors, setErrors] = useState({
    name: '',
    manufacturer: '',
    price: '',
  });

  const handleNameChange = (e: any) => {
    e.preventDefault();
    setProductToEdit((prevProduct: IProduct) => ({
      ...prevProduct,
      name: e.target.value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      name: e.target.value.trim() === '' ? 'Name is required' : '',
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
    setErrors((prevErrors) => ({
      ...prevErrors,
      manufacturer: option === '' ? 'Please select a manufacturer' : '',
    }));
  };

  const handlePriceChange = (e: any) => {
    e.preventDefault();
    setProductToEdit((prevProduct: IProduct) => ({
      ...prevProduct,
      price: e.target.value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      price: e.target.value <= 0 ? 'Invalid price' : '',
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

    const isFormValid = validateForm();

    if (isFormValid) {
      setProductsData([...newProducts, productToEdit]); // Spread the newProducts array and add the edited product
      navigate('/');
    }
  };

  const validateForm = () => {
    const nameError =
      productToEdit.name.trim() === '' ? 'Name is required' : '';
    if (nameError.length > 0) {
      setNameError(true);
    }
    const manufacturerError =
      productToEdit.manufacturerDataId === ''
        ? 'Please select a manufacturer'
        : '';
    if (manufacturerError.length > 0) {
      setManufatruerError(true);
    }
    const priceError = productToEdit.price <= 0 ? 'Invalid price' : '';
    if (priceError.length > 0) {
      setPriceError(true);
    }

    setErrors({
      name: nameError,
      manufacturer: manufacturerError,
      price: priceError,
    });

    return nameError === '' && manufacturerError === '' && priceError === '';
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
              className={nameError ? styles.textInputError : styles.textInput}
              type="text"
              name="name"
              id="name"
              value={productToEdit?.name}
              onChange={handleNameChange}
            />
            {nameError && (
              <span className={`${styles.errorMsg} left-[35%]`}>
                Invalid Product Name
              </span>
            )}
          </div>
          <div className={styles.selectWrapper}>
            <select
              className={manufatruerError ? styles.selectError : styles.select}
              name="manufacturer"
              id="manufacturer"
              onChange={handleManufacturerChange}
              defaultValue={productToEdit?.manufacturerDataId}
            >
              {manufacturersData.map((manu) => {
                return (
                  <option key={manu.id} value={manu.id} id={manu.id}>
                    {manu.name}
                  </option>
                );
              })}
            </select>
            {manufatruerError && (
              <span className={`${styles.errorMsg} left-[40%]`}>
                Please select Manufacturer
              </span>
            )}
          </div>
          <div className={styles.inputWrapper}>
            <label className={styles.label} htmlFor="price">
              Price
            </label>
            <input
              className={
                priceError ? styles.numberInputError : styles.numberInput
              }
              type="number"
              name="price"
              id="price"
              min={0}
              value={productToEdit?.price}
              onChange={handlePriceChange}
            />
            <span className={styles.currency}>&#x20AC;</span>
            {priceError && (
              <span className={`${styles.errorMsg} left-[35%]`}>
                Invalid Product Price
              </span>
            )}
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
