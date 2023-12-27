'use client';
import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Snackbar,
  TextField,
  Alert,
} from '@mui/material';

import { Formik, FormikProps, Field, FieldProps } from 'formik';

import useProductStore from './useProductStore';
import { Product } from '../types';
import { editSchedulingSchema } from './constans';
interface Props {
  params: { id: string };
}
const Page = ({ params: { id } }: Props) => {
  const [isNotify, toggleIsNotify] = useState<boolean>(false);
  const [notifyData, setNotifyData] = useState<{
    message: string;
    severity: 'success' | 'warning';
  }>({
    message: '',
    severity: 'success',
  });
  const { product, loading, error, fetchProduct, updateProduct } =
    useProductStore();

  const notify = () => {
    toggleIsNotify(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    toggleIsNotify(false);
  };

  useEffect(() => {
    id && fetchProduct(id);
  }, [id]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <Card sx={{ display: 'flex' }}>
      <CardMedia
        component="img"
        sx={{ width: '40vw' }}
        image={product?.image}
        alt="Live from space album cover"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Formik<Product>
            initialValues={product}
            validationSchema={editSchedulingSchema}
            onSubmit={values => {
              updateProduct(values, success => {
                if (success) {
                  setNotifyData({
                    severity: 'success',
                    message: 'Saved!',
                  });
                } else {
                  setNotifyData({
                    severity: 'warning',
                    message: 'Error on save!',
                  });
                }
                notify();
              });
            }}
            enableReinitialize
          >
            {({
              values,
              errors,
              touched,
              submitForm,
            }: FormikProps<Product>) => (
              <>
                <Field name="name">
                  {({ field }: FieldProps<string, Product>) => (
                    <Box mb={3}>
                      <TextField
                        fullWidth
                        id="name"
                        name="name"
                        label="Name"
                        value={values.name}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        error={touched.name && Boolean(errors.name)}
                        helperText={touched.name && errors.name}
                      />
                    </Box>
                  )}
                </Field>
                <Field name="brand">
                  {({ field }: FieldProps<string, Product>) => (
                    <Box mb={3}>
                      <TextField
                        fullWidth
                        id="brand"
                        name="brand"
                        label="Brand"
                        value={values.brand}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        error={touched.brand && Boolean(errors.brand)}
                        helperText={touched.brand && errors.brand}
                      />
                    </Box>
                  )}
                </Field>
                <Field name="barcode">
                  {({ field }: FieldProps<string, Product>) => (
                    <Box mb={3}>
                      <TextField
                        fullWidth
                        id="barcode"
                        name="barcode"
                        label="Barcode"
                        value={values.barcode}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        error={touched.barcode && Boolean(errors.barcode)}
                        helperText={touched.barcode && errors.barcode}
                      />
                    </Box>
                  )}
                </Field>
                <Button type="submit" onClick={submitForm}>
                  Save
                </Button>
                <Button variant="contained" color="warning" href="/">
                  Cancel
                </Button>
              </>
            )}
          </Formik>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}></Box>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isNotify}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={notifyData.severity}
          sx={{ width: '100%' }}
        >
          {notifyData.message}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default Page;
