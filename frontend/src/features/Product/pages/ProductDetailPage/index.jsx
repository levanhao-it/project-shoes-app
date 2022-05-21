import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Hidden, makeStyles } from '@material-ui/core';
import ProductInfo from '../../components/ProductInfo';
import ProductSidebar from '../../components/ProductSidebar';
import ProductRecomend from '../../components/ProductRecomend';
import ProductTabs from 'features/Product/components/ProductTabs';

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

      {/* Laptop */}
      <Hidden smDown>
        <Grid container spacing={0} >
          <Grid item xs={12} md={8} lg={8}>
            <ProductInfo />
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
            <ProductSidebar/>
          </Grid>
          
          <Grid item xs={12} md={12} lg={12}>
          <ProductRecomend />
          </Grid>
        </Grid>

      </Hidden>

      {/* Tablet - Mobile */}
      <Hidden mdUp>
      <Grid container spacing={0} >
          <Grid item xs={12} sm={12} >
            <ProductSidebar/>
          </Grid>

          <Grid item xs={12} sm={12} >
              <ProductTabs />
          </Grid>
          
          <Grid item xs={12} sm={12}>
          <ProductRecomend />
          </Grid>
        </Grid>
      </Hidden>
     


    </div>
  );
}

export default ProductDetailPage;