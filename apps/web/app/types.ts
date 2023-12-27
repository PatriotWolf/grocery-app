import { SortBy, SortOrder } from './constants';

export interface Product {
  id: number;
  name: string;
  brand: string;
  barcode: number;
  image: string;
}

export interface PageDetail {
  count: number;
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
  lastPage: number;
}

export interface ProductFilter {
  query?: string;
  page?: number;
  name?: string;
  sort?: SortBy;
  order?: SortOrder;
}

export interface ProductRemote extends PageDetail {
  products: Product[];
}

export interface APIRemote<T> {
  data: T;
  message: string;
}
