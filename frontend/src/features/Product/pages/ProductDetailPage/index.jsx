import React from 'react';
import PropTypes from 'prop-types';
import { Grid, makeStyles } from '@material-ui/core';
import ProductInfo from '../../components/ProductInfo';
import ProductSidebar from '../../components/ProductSidebar';
import ProductRecomend from '../../components/ProductRecomend';

ProductDetailPage.propTypes = {
  
};

const useStyle = makeStyles((theme) => ({
  root: {
    padding: '60px 40px 0'
  }
}))

function ProductDetailPage(props) {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <Grid container spacing={0} >
        <Grid item xs={8}>
          <ProductInfo />
        </Grid>

        <Grid item xs={4}>
          <ProductSidebar/>
        </Grid>
        
        <Grid item xs={12}>
        <ProductRecomend />
        </Grid>
       
      </Grid>
    </div>
  );
}

export default ProductDetailPage;