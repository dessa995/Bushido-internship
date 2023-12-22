import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  manufacturersDataAtom,
  productDataAtom,
} from '../../services/InitialData';
import { IProduct } from '../../services/interfaces';
import { useAtom } from 'jotai';

import styles from './ProductForm.module.css';
import { v4 as uuidv4 } from 'uuid';

type productFormProps = {
  id: string | undefined;
};

const ProductForm = ({ id }: productFormProps) => {
  const [productToEdit, setProductToEdit] = useState<IProduct>({
    id: '',
    name: '',
    manufacturerDataId: '',
    price: 0,
    expiryDate: new Date(),
  });
  const [productsData, setProductsData] = useAtom(productDataAtom);
  const [manufacturersData] = useAtom(manufacturersDataAtom);

  const navigate = useNavigate();

  const [nameError, setNameError] = useState(false);
  const [manufacturerError, setManufacturerError] = useState(false);
  const [priceError, setPriceError] = useState(false);

  useEffect(() => {
    const product = productsData.find((product) => product.id === id);

    if (product) {
      setProductToEdit(product);
    }
  }, [id, productsData]);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (productToEdit && productToEdit.id.length) {
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

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setProductToEdit((prevProduct: IProduct) => ({
      ...prevProduct,
      price: parseFloat(e.target.value) || 0,
    }));
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const dateValue = e.target.value;
    const [year, month, day] = dateValue.split('-');

    setProductToEdit((prevProduct: IProduct) => ({
      ...prevProduct,
      expiryDate: new Date(`${month}/${day}/${year}`),
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newProducts = productsData.filter(
      (product: IProduct) => product.id !== productToEdit.id
    ) as IProduct[];

    const isFormValid = validateForm();

    if (isFormValid) {
      setProductsData([...newProducts, productToEdit]);
      setProductToEdit({
        id: '',
        name: '',
        manufacturerDataId: '',
        price: 0,
        expiryDate: new Date(),
      });
      navigate('/');
    }
  };

  const handleCancel = () => {
    // e.preventDefault();
    setProductToEdit({
      id: '',
      name: '',
      manufacturerDataId: '',
      price: 0,
      expiryDate: new Date(),
    });
    navigate('/');
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
    const priceError =
      productToEdit.price === undefined || productToEdit.price <= 0
        ? 'Invalid price'
        : '';
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
              value={
                productToEdit?.price !== undefined ? productToEdit?.price : ''
              }
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
            <label htmlFor="expiryDate" className={styles.label}>
              Expiry Date
            </label>
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
          <div className={styles.buttonsWrapper}>
            <button className={styles.submitBtn} type="submit">
              Submit
            </button>
            <button className={styles.cancelButton} onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default ProductForm;
