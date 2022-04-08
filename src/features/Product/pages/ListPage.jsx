import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import ProductList from '../components/ProductList';
import OfferBanner from '../components/OfferBanner';
import ProductSort from '../components/ProductSort';
import Pagination from '@material-ui/lab/Pagination';
import ProductFilters from '../components/ProductFilters';

ListPage.propTypes = {};
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

  pagination: {
    marginTop: '10px',
  },
  ProductFilters: {
    overflow: 'hidden',
    width: 'inherit',
    height: 'inherit',
    maxWidth: 'inherit',
    maxWeight: 'inherit',
  },
}));

function ListPage(props) {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Container maxWidth="lx">
        <Grid container spacing={2}>
          <Grid item xs={0} sm={3} md={3} lg={3}>
            <ProductFilters />
          </Grid>
          <Grid item xs={12} sm={9} md={9} lg={9}>
            <OfferBanner />

            <Box display="flex">
              <Box flexGrow={1}>
                <ProductSort />
              </Box>
              <Box flexShrink={0}>
                <Pagination count={5} color="success" className={classes.pagination} />
              </Box>
            </Box>
            <ProductList />
            <Box display="flex" paddingBottom={5}>
              <Box flexGrow={1}>
                <ProductSort />
              </Box>
              <Box flexShrink={0}>
                <Pagination count={5} color="success" className={classes.pagination} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
