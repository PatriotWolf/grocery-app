'use client';
import { useEffect } from 'react';
import { NextPage } from 'next';
import { Typography } from '@mui/material';
import { SearchBar } from '../components';
import ControlSection from './components/ControlSection';
import { PageProvider, useAppStoreCtx } from './context';
import useAppStore from './useAppStore';
import GridSection from './components/GridSection';

const PageContainer: NextPage = () => {
  const { filter, initFetch, fetchProducts, updateQueryString, onSearchClick } =
    useAppStoreCtx();

  useEffect(() => {
    initFetch();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [filter.page, filter.sort, filter.order]);
  return (
    <>
      <Typography variant="h3">HOME</Typography>
      <SearchBar
        searchString={filter.query || ''}
        onChange={updateQueryString}
        onSearchClick={onSearchClick}
      />
      <ControlSection />
      <GridSection />
    </>
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
