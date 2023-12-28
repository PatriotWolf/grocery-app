'use client';
import { useEffect } from 'react';
import { NextPage } from 'next';
import { Typography, Button, Grid, Pagination } from '@mui/material';
import { MediaCard, SearchBar } from '../components';
import ControlSection from './components/ControlSection';
import { PageProvider, useAppStoreCtx } from './context';
import useAppStore from './useAppStore';

const PageContainer: NextPage = () => {
  const {
    products,
    filter,
    pageData,
    initFetch,
    handlePageChange,
    fetchProducts,
    updateQueryString,
    onSearchClick,
  } = useAppStoreCtx();

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

      <Grid container spacing={4} mb={3}>
        {products.length > 0 &&
          products.map(product => {
            return (
              <Grid item xs={3} key={product.id}>
                <MediaCard
                  image={product.image}
                  ActionSection={() => (
                    <Button
                      variant="contained"
                      size="large"
                      href={'/' + product.id}
                    >
                      Edit
                    </Button>
                  )}
                >
                  <Typography gutterBottom variant="h6" component="div">
                    Name: <br />
                    {product.name}
                  </Typography>
                  <Typography gutterBottom variant="body1" component="div">
                    Brand:
                    <br />
                    {product.brand}
                  </Typography>
                </MediaCard>
              </Grid>
            );
          })}
      </Grid>
      {products.length > 0 && (
        <Pagination
          page={filter.page}
          onChange={handlePageChange}
          count={pageData?.lastPage}
          sx={{
            pb: 9,
          }}
        />
      )}
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
