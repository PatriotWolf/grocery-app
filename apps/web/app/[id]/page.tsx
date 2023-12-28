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

import { Formik, FormikProps, Field, FieldProps, getIn } from 'formik';

import useProductStore from './useProductStore';
import { Product } from '../types';
import { editSchedulingSchema, formList } from './constans';
import { FormEntry } from './types';
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

  const openNotification = () => {
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
                openNotification();
              });
            }}
            enableReinitialize
          >
            {({ errors, touched, submitForm }: FormikProps<Product>) => (
              <>
                {formList.map(({ label, name }: FormEntry) => (
                  <Field name={name} key={'input' + label}>
                    {({ field }: FieldProps<string, Product>) => (
                      <Box mb={3}>
                        <TextField
                          fullWidth
                          id={name}
                          name={name}
                          label={label}
                          value={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          error={
                            getIn(touched, name) && Boolean(getIn(errors, name))
                          }
                          helperText={
                            getIn(touched, name) && getIn(errors, name)
                          }
                        />
                      </Box>
                    )}
                  </Field>
                ))}

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
