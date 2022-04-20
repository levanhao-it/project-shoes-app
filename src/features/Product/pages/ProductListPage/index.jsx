import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Grid, makeStyles, Typography } from '@material-ui/core';

import FilterAndSort from 'features/Product/components/FilterAndSort';
import ProductList from 'features/Product/components/ProductList';
import ProductPagination from 'features/Product/components/ProductPagination';
import OfferBanner from 'components/OfferBanner';

ProductListPage.propTypes = {};
const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '80px',
  },

  left: {
    width: '250px',
  },

  right: {
    flex: '1 1 0',
  },

  boxPagination: {
    width: '415px',
    margin: ' auto',
  },
  filter: {
    float: 'right',
    marginBottom: '20px',
  },
}));

function ProductListPage(props) {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Container maxWidth="lg" fixed>
        <OfferBanner />
        <Box className={classes.filter}>
          <FilterAndSort />
        </Box>
        <ProductList />
        <Box paddingBottom={7} className={classes.boxPagination}>
          <ProductPagination />
        </Box>
      </Container>
    </Box>
  );
}

export default ProductListPage;
