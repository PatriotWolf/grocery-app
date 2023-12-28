import { useState } from 'react';
import { APIRemote, Product } from '../types';
import axios from 'axios';
import { NotificationType } from './types';

const useProductStore = () => {
  const [product, setProducts] = useState<Product>({
    id: 123123123123,
    name: '',
    brand: '',
    barcode: 1231231231232,
    image: '',
  });
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, isLoading] = useState<boolean>(true);
  const [isNotify, toggleIsNotify] = useState<boolean>(false);
  const [notifyData, setNotifyData] = useState<NotificationType>({
    message: '',
    severity: 'success',
  });

  const openNotification = () => {
    toggleIsNotify(true);
  };

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    toggleIsNotify(false);
  };
  const fetchProduct = async (id: string) => {
    try {
      const url = 'http://localhost:3333/products/' + id;
      const { data } = await axios.get<APIRemote<Product>>(url, {});
      isLoading(false);
      const { data: product } = data;

      setProducts(product);
    } catch (error) {
      setError('error fetch');
      console.log(error);
    }
  };

  const updateProduct = async (product: Product) => {
    try {
      const url = 'http://localhost:3333/products';
      const { data } = await axios.put<APIRemote<Product>>(url, { ...product });
      data.data &&
        setNotifyData({
          severity: 'success',
          message: 'Saved!',
        });
    } catch (error) {
      setNotifyData({
        severity: 'warning',
        message: 'Error on save!',
      });

      console.log(error);
    }
    openNotification();
  };
  return {
    product,
    loading,
    error,
    isNotify,
    notifyData,
    openNotification,
    handleClose,
    fetchProduct,
    updateProduct,
  };
};

export default useProductStore;
