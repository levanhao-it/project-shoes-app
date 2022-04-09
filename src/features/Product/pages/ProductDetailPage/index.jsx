import React from 'react';
import PropTypes from 'prop-types';
import { Grid, makeStyles } from '@material-ui/core';
import ProductInfo from '../../components/ProductInfo';
import ProductSidebar from '../../components/ProductSidebar';

ProductDetailPage.propTypes = {
  
};

const useStyle = makeStyles((theme) => ({
  root: {
    width: '1200px',
    margin: 'auto',
  }
}))

function ProductDetailPage(props) {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <Grid container spacing={0} >
        <Grid item xs={7}>
          <ProductInfo />
        </Grid>

        <Grid item xs={5}>
          <ProductSidebar/>
        </Grid>
      </Grid>
    </div>
  );
}

export default ProductDetailPage;