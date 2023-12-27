'use client';
import { useEffect } from 'react';
import { NextPage } from 'next';
import {
  Box,
  Toolbar,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Grid,
  Pagination,
  Paper,
  InputBase,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import { PageProvider, useAppStoreCtx } from './context';
import useAppStore from './useAppStore';
import { SortBy, SortOrder } from './constants';

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
    handleSortBy,
    handleSortOrder,
  } = useAppStoreCtx();

  useEffect(() => {
    initFetch();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [filter.page, filter.sort, filter.order]);
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 12, pt: 4 }}>
      <Toolbar />
      <Typography variant="h3">HOME</Typography>
      <Paper
        component="form"
        elevation={3}
        sx={{ p: '2px 4px', my: 3, display: 'flex', alignItems: 'center' }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          value={filter.query}
          placeholder="Start Search Product"
          inputProps={{ 'aria-label': 'search google maps' }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            updateQueryString(event.target.value);
          }}
        />

        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <Button
          color="primary"
          sx={{ p: '10px' }}
          aria-label="directions"
          onClick={() => onSearchClick()}
        >
          Search
        </Button>
      </Paper>

      <Paper
        elevation={0}
        sx={{
          my: 2,
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          border: theme => `0px solid ${theme.palette.divider}`,
          flexWrap: 'wrap',
        }}
      >
        <Typography mr={1}>Sort By:</Typography>
        <ToggleButtonGroup
          value={filter.sort}
          exclusive
          onChange={handleSortBy}
          aria-label="text alignment"
        >
          {Object.values(SortBy).map(val => (
            <ToggleButton value={val} key={'MenuItem' + val}>
              {val.toLocaleUpperCase()}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
        <ToggleButtonGroup
          value={filter.order}
          exclusive
          onChange={handleSortOrder}
          aria-label="text alignment"
        >
          <ToggleButton value={SortOrder.ASC} aria-label="left aligned">
            <ArrowDropDown />
          </ToggleButton>
          <ToggleButton value={SortOrder.DESC} aria-label="left aligned">
            <ArrowDropUp />
          </ToggleButton>
        </ToggleButtonGroup>
      </Paper>

      <Grid container spacing={4} mb={3}>
        {products.length > 0 &&
          products.map(product => {
            return (
              <Grid item xs={3} key={product.id}>
                <Card>
                  <CardMedia
                    sx={{ height: 140 }}
                    image={product.image}
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      Name: <br />
                      {product.name}
                    </Typography>
                    <Typography gutterBottom variant="body1" component="div">
                      Brand:
                      <br />
                      {product.brand}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button variant="contained" size="large">
                      Edit
                    </Button>
                  </CardActions>
                </Card>
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
