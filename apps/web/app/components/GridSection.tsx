'use client';
import { Typography, Button, Grid, Pagination } from '@mui/material';
import { MediaCard } from '../../components';
import { useAppStoreCtx } from '../context';

const GridSection = () => {
  const { products, pageData, filter, handlePageChange } = useAppStoreCtx();
  return (
    <>
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

export default GridSection;
