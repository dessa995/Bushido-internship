import React, { useEffect, useState } from 'react';
import { IProduct } from '../../../services/interfaces';
import { productDataAtom, manufacturersDataAtom } from '../../../App';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';

import ProductForm from '../../ProductForm/ProductForm';

const NewProductPage = () => {
  return (
    <React.Fragment>
      <ProductForm />
    </React.Fragment>
  );
};

export default NewProductPage;
