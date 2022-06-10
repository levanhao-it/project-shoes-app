import { Box, Grid, Hidden, makeStyles } from '@material-ui/core';
import ProductTabsMobile from 'features/Product/components/ProductTabsMobile';
import React from 'react';
import ProductInfo from '../../components/ProductInfo';
import ProductRecomend from '../../components/ProductRecomend';
import ProductSidebar from '../../components/ProductSidebar';
import { Helmet } from 'react-helmet-async';

ProductDetailPage.propTypes = {};

const useStyle = makeStyles((theme) => ({
  root: {
    padding: '60px 40px 0',
    [theme.breakpoints.down('xs')]: {
      padding: '40px 20px',
    },
  },

  tabsMobile: {
    marginTop: '20px',
  },
}));

function ProductDetailPage(props) {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <Helmet>
        <title>Product Detail</title>
      </Helmet>
      {/* Laptop */}
      <Hidden smDown>
        <Grid container spacing={0}>
          <Grid item xs={12} md={8} lg={8}>
            <ProductInfo />
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
            <ProductSidebar />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <ProductRecomend />
          </Grid>
        </Grid>
      </Hidden>

      {/* Tablet - Mobile */}
      <Hidden mdUp>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12}>
            <ProductSidebar />
          </Grid>

          <Box className={classes.tabsMobile}>
            <ProductTabsMobile />
          </Box>

          <Grid item xs={12} sm={12}>
            <ProductRecomend />
          </Grid>
        </Grid>
      </Hidden>
    </div>
  );
}

export default ProductDetailPage;
