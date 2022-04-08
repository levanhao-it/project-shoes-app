import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@material-ui/core';
import Product from './Product';

ProductList.propTypes = {};

function ProductList(props) {
  return (
    <div>
      <Box paddingBottom={2}>
        <Grid container>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Product />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Product />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Product />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Product />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Product />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Product />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Product />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Product />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default ProductList;
