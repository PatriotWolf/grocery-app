import { useState } from 'react';
import { APIRemote, Product } from '../types';
import axios from 'axios';

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

  const updateProduct = async (
    product: Product,
    callback: (success: boolean) => void,
  ) => {
    try {
      const url = 'http://localhost:3333/products';
      const { data } = await axios.put<APIRemote<Product>>(url, { ...product });
      data.data && callback(true);
    } catch (error) {
      callback(false);

      console.log(error);
    }
  };
  return { product, loading, error, fetchProduct, updateProduct };
};

export default useProductStore;
