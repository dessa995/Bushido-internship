import React, { useEffect, useState } from 'react';
import { IProduct } from '../../../services/interfaces';
import { productDataAtom, manufacturersDataAtom } from '../../../App';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';

import styles from '../EditProduct/EditProductPage.module.css';

import { v4 as uuidv4 } from 'uuid';

const NewProductPage = () => {
  const [productsData, setProductsData] = useAtom(productDataAtom);

  const navigate = useNavigate();

  const [manufacturersData] = useAtom(manufacturersDataAtom);

  const [nameError, setNameError] = useState(false);
  const [manufatruerError, setManufatruerError] = useState(false);
  const [priceError, setPriceError] = useState(false);

  const [newProduct, setNewProduct] = useState<IProduct>({
    id: '',
    name: '',
    manufacturerDataId: '',
    price: 0,
    expiryDate: new Date(),
  });

  const [errors, setErrors] = useState({
    name: '',
    manufacturer: '',
    price: '',
  });

  const handleNameChange = (e: any) => {
    e.preventDefault();
    setNameError(false);
    setNewProduct((prevProduct: IProduct) => ({
      ...prevProduct,
      id: uuidv4(),
      name: e.target.value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      name: e.target.value.trim() === '' ? 'Name is required' : '',
    }));
  };

  const handleManufacturerChange = (e: any) => {
    e.preventDefault();
    setManufatruerError(false);

    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const option = el.getAttribute('id');

    console.log(option);

    setNewProduct((prevProduct: IProduct) => ({
      ...prevProduct,
      manufacturerDataId: option,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      manufacturer: option === '' ? 'Please select a manufacturer' : '',
    }));
  };

  const handlePriceChange = (e: any) => {
    e.preventDefault();
    setPriceError(false);
    setNewProduct((prevProduct: IProduct) => ({
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
    const selectedDate = new Date(e.target.value);
    setNewProduct((prevProduct: IProduct) => ({
      ...prevProduct,
      expiryDate: selectedDate,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const isFormValid = validateForm();

    if (isFormValid) {
      const newArray = productsData;
      newArray.push(newProduct);
      setProductsData(newArray);
      navigate('/');
    } else {
      console.log(newProduct);
    }
  };

  const validateForm = () => {
    const nameError = newProduct.name.trim() === '' ? 'Name is required' : '';
    if (nameError.length > 0) {
      setNameError(true);
    }
    const manufacturerError =
      newProduct.manufacturerDataId === ''
        ? 'Please select a manufacturer'
        : '';
    if (manufacturerError.length > 0) {
      setManufatruerError(true);
    }
    const priceError = newProduct.price <= 0 ? 'Invalid price' : '';
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
              value={newProduct?.name}
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
            {manufatruerError && (
              <span className={`${styles.errorMsg} left-[40%]`}>
                Please select Manufacturer
              </span>
            )}
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="price" className={styles.label}>
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
              value={newProduct?.price}
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
