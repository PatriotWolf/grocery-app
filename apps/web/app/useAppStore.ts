import { useState } from 'react';
import axios from 'axios';

import {
  APIRemote,
  PageDetail,
  Product,
  ProductFilter,
  ProductRemote,
} from './types';
/**
 *
 * WHY NO REDUX: the reason not using redux yet as this is such a small project and no cross module data happening yet.
 *
 */
const useAppStore = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [pageData, setPageData] = useState<PageDetail | undefined>(undefined);
  const [filter, setFilter] = useState<ProductFilter>({ query: '', page: 1 });
  const onClearFilter = () => {
    setFilter({ page: 1 });
  };
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setFilter(prev => ({ ...prev, page: value }));
  };
  const updateQueryString = (value: string) => {
    setFilter(prev => ({ ...prev, query: value }));
  };

  const onSearchClick = async () => {
    setFilter(prev => ({ ...prev, page: 1 }));
    fetchProducts();
  };

  const fetchProducts = async () => {
    try {
      const url = 'http://localhost:3333/products';
      const { data } = await axios.get<APIRemote<ProductRemote>>(url, {
        params: {
          ...filter,
        },
      });
      console.log(data);
      const { data: response } = data;
      const { products, ...rest } = response;
      setProducts(response.products);
      setPageData(rest);
    } catch (error) {
      console.log(error);
    }
  };

  const initFetch = () => {
    fetchProducts();
  };
  return {
    products,
    pageData,
    filter,
    fetchProducts,
    onClearFilter,
    initFetch,
    handlePageChange,
    updateQueryString,
    onSearchClick,
  };
};

export default useAppStore;
