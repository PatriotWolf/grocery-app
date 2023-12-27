import * as yup from 'yup';

export const editSchedulingSchema = () =>
  yup.object().shape({
    name: yup.string().typeError('must be string'),
    brand: yup.string().typeError('must be string'),
    barcode: yup.number().typeError('must be number'),
  });
