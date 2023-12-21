import React from 'react';

import styles from './ProductView.module.css';
import { IProduct } from '../../services/interfaces';
import { useNavigate } from 'react-router-dom';
import { productDataAtom, productToEditAtom } from '../../App';
import { useAtom, useSetAtom } from 'jotai';

import { RESET } from 'jotai/utils';
import ProductCard from './ProductCard/ProductCard';

const ProductsView = () => {
  const setProductToEditAtom = useSetAtom(productToEditAtom);

  const [productsData] = useAtom(productDataAtom);

  const navigate = useNavigate();

  const handleAddNewClick = () => {
    setProductToEditAtom(RESET);
    navigate('/newProduct');
  };

  return (
    <React.Fragment>
      <div className={styles.listWrapper}>
        <button onClick={handleAddNewClick} className={styles.addNewProductBtn}>
          Add New Product
        </button>
        <ul>
          {productsData.map((product: IProduct, index: number) => (
            <li
              key={product.id}
              className={`${styles.productListItem} ${
                index !== 0 && 'border-t-2 border-cyan-400'
              }`}
            >
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default ProductsView;
