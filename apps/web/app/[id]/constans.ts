import * as yup from 'yup';
import { FormEntry } from './types';

export const editSchedulingSchema = () =>
  yup.object().shape({
    name: yup.string().typeError('must be string'),
    brand: yup.string().typeError('must be string'),
    barcode: yup.number().typeError('must be number'),
  });

export const formList: FormEntry[] = [
  {
    name: 'name',
    label: 'Product Name',
  },
  {
    name: 'brand',
    label: 'Brand Name',
  },
  {
    name: 'barcode',
    label: 'Barcode',
  },
];
