import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  manufacturersDataAtom,
  productDataAtom,
  productToEditAtom,
} from '../../App';
import { IProduct } from '../../services/interfaces';
import { useAtom } from 'jotai';

import styles from './ProductForm.module.css';
import { RESET } from 'jotai/utils';
import { v4 as uuidv4 } from 'uuid';

const ProductForm = () => {
  const [productToEdit, setProductToEdit] = useAtom(productToEditAtom);
  const [productsData, setProductsData] = useAtom(productDataAtom);
  const [manufacturersData] = useAtom(manufacturersDataAtom);

  const navigate = useNavigate();

  const [nameError, setNameError] = useState(false);
  const [manufacturerError, setManufacturerError] = useState(false);
  const [priceError, setPriceError] = useState(false);

  const handleNameChange = (e: any) => {
    e.preventDefault();
    if (productToEdit.id.length) {
      setProductToEdit((prevProduct: IProduct) => ({
        ...prevProduct,
        name: e.target.value,
      }));
    } else {
      setProductToEdit((prevProduct: IProduct) => ({
        ...prevProduct,
        id: uuidv4(),
        name: e.target.value,
      }));
    }
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
      expiryDate: new Date(e.target.value),
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newProducts = productsData.filter(
      (product: IProduct) => product.id !== productToEdit.id
    ) as IProduct[];

    const isFormValid = validateForm();

    if (isFormValid) {
      setProductsData([...newProducts, productToEdit]);
      setProductToEdit(RESET);
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
      setManufacturerError(true);
    }
    const priceError = productToEdit.price <= 0 ? 'Invalid price' : '';
    if (priceError.length > 0) {
      setPriceError(true);
    }

    return nameError === '' && manufacturerError === '' && priceError === '';
  };

  useEffect(() => {
    const manufacturerSelect = document.getElementById(
      'manufacturer'
    ) as HTMLSelectElement;

    if (manufacturerSelect) {
      if (productToEdit?.manufacturerDataId) {
        manufacturerSelect.value = productToEdit.manufacturerDataId;
      } else {
        manufacturerSelect.value = 'disabled';
      }
    }
  }, [productToEdit?.manufacturerDataId]);

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
              className={manufacturerError ? styles.selectError : styles.select}
              name="manufacturer"
              id="manufacturer"
              onChange={handleManufacturerChange}
              defaultValue={
                productToEdit?.manufacturerDataId
                  ? productToEdit?.manufacturerDataId
                  : 'disabled'
              }
            >
              <option value={'disabled'} disabled hidden>
                - Please select Manufacturer -
              </option>
              {manufacturersData.map((manu) => {
                return (
                  <option key={manu.id} value={manu.id} id={manu.id}>
                    {manu.name}
                  </option>
                );
              })}
            </select>
            {manufacturerError && (
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
              value={
                new Date(productToEdit?.expiryDate).toISOString().split('T')[0]
              }
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

export default ProductForm;
