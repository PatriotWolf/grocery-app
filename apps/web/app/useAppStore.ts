import { useState } from 'react';
import axios from 'axios';

import { PageDetail, Product, ProductFilter, ProductRemote } from './types';
/**
 *
 * WHY NO REDUX: the reason not using redux yet as this is such a small project and no cross module data happening yet.
 *
 */
const useAppStore = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [pageData, setPageData] = useState<PageDetail | undefined>(undefined);
  const [filter, setFilter] = useState<ProductFilter>({ page: 1 });
  const onClearFilter = () => {
    setFilter({ page: 1 });
  };

  const fetchProducts = async () => {
    try {
      const url = 'http://localhost:3333/products';
      const { data } = await axios.get<ProductRemote>(url, {
        params: {
          ...filter,
        },
      });
      const { data: product, ...rest } = data;
      setProducts(product);
      setPageData(rest);
    } catch (error) {
      console.log(error);
    }
  };

  const initFetch = () => {
    fetchProducts();
  };
  return { products, pageData, fetchProducts, onClearFilter, initFetch };
};

export default useAppStore;
