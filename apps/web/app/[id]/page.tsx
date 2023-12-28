'use client';
import { useEffect } from 'react';
import { Box, Card, CardContent, CardMedia } from '@mui/material';

import useProductStore from './useProductStore';

import FormComponents from './components/FormComponent';
import FlashMessage from './components/NotificationBar';
interface Props {
  params: { id: string };
}
const Page = ({ params: { id } }: Props) => {
  const {
    product,
    loading,
    error,
    isNotify,
    notifyData,
    handleClose,
    fetchProduct,
    updateProduct,
  } = useProductStore();

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
          <FormComponents
            product={product}
            onSubmit={values => {
              updateProduct(values);
            }}
          />
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}></Box>
      </Box>
      <FlashMessage
        open={isNotify}
        handleClose={handleClose}
        notifyData={notifyData}
      />
    </Card>
  );
};

export default Page;
