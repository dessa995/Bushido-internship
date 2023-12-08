import React, { useContext, useEffect } from 'react';
import { DataContext, productDataAtom } from '../../../App';
import { IProduct } from '../../../services/interfaces';
import { useAtom } from 'jotai';
// import { v4 as uuidv4 } from 'uuid';

const EditProductPage = () => {
  const { productToEdit, setProductToEdit } = useContext(DataContext);
  const [productsData, setProductsData] = useAtom(productDataAtom);

  const handleNameChange = (e: any) => {
    e.preventDefault();
    setProductToEdit((prevProduct: IProduct) => ({
      ...prevProduct,
      name: e.target.value,
    }));
  };

  const handleManufacturerChange = (e: any) => {
    e.preventDefault();
    if (e.target.value !== productToEdit.manufacturer.name) {
      setProductToEdit((prevProduct: IProduct) => ({
        ...prevProduct,
        manufacturer: {
          ...prevProduct.manufacturer,
          name: e.target.value,
          // id: String(uuidv4()),
        },
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
      expiryDate: e.target.value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newProducts = productsData.filter(
      (product: IProduct) => product.id !== productToEdit.id
    );
    newProducts.push(productToEdit);
    setProductsData(newProducts);
    console.log('submited');
  };

  useEffect(() => {
    console.log('set items2', productsData);
    localStorage.setItem('products', JSON.stringify(productsData));
    console.log(productsData, 'editor effect'); // Log the updated productsData when it changes
  }, [productsData]);

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Product Name: </label>
          <input
            type="text"
            name="name"
            id="name"
            value={productToEdit?.name}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <label htmlFor="manufacturer">Manufacturer: </label>
          <input
            type="text"
            name="manufacturer"
            id="manufacturer"
            value={productToEdit?.manufacturer?.name}
            onChange={handleManufacturerChange}
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            value={productToEdit?.price}
            onChange={handlePriceChange}
          />
          <span>&#x20AC;</span>
        </div>
        <div>
          <input
            type="date"
            name="expiryDate"
            id="expiryDate"
            value={productToEdit?.expiryDate}
            onChange={handleDateChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </React.Fragment>
  );
};

export default EditProductPage;
