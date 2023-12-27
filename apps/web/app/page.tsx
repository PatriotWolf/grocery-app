'use client';
import { useEffect } from 'react';
import { NextPage } from 'next';
import { Box, Toolbar, Typography } from '@mui/material';
import { PageProvider, useAppStoreCtx } from './context';
import useAppStore from './useAppStore';

const PageContainer: NextPage = () => {
  const { products, initFetch } = useAppStoreCtx();

  useEffect(() => {
    initFetch();
  }, []);
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <Typography variant="h3">HOME</Typography>
      {products.length}
    </Box>
  );
};

const Page: NextPage = () => {
  const store = useAppStore();
  return (
    <PageProvider value={store}>
      <PageContainer />
    </PageProvider>
  );
};

export default Page;
