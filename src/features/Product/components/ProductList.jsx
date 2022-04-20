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
            <Product
              imageProduct="http://nouthemes.net/html/trueshoes/images/shoe/2.jpg"
              nameProduct="Air Jordan 7 Retro"
              priceProduct="499"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Product
              imageProduct="http://nouthemes.net/html/trueshoes/images/shoe/1.jpg"
              nameProduct="Air Jordan 7 Retro TrueToSize"
              priceProduct="699"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Product
              imageProduct="http://nouthemes.net/html/trueshoes/images/shoe/3.jpg"
              nameProduct="Air Jordan 3 Retro"
              priceProduct="429"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Product
              imageProduct="http://nouthemes.net/html/trueshoes/images/shoe/4.jpg"
              nameProduct="Air Jordan 4 Retro"
              priceProduct="329"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Product
              imageProduct="http://nouthemes.net/html/trueshoes/images/shoe/5.jpg"
              nameProduct="Air Jordan 5 Retro"
              priceProduct="429"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Product
              imageProduct="http://nouthemes.net/html/trueshoes/images/shoe/6.jpg"
              nameProduct="Air Jordan 3 Retro"
              priceProduct="429"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Product
              imageProduct="http://nouthemes.net/html/trueshoes/images/shoe/7.jpg"
              nameProduct="Air Jordan 3 Retro"
              priceProduct="429"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Product
              imageProduct="http://nouthemes.net/html/trueshoes/images/shoe/8.jpg"
              nameProduct="Air Jordan 3 Retro"
              priceProduct="429"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Product
              imageProduct="http://nouthemes.net/html/trueshoes/images/shoe/9.jpg"
              nameProduct="Air Jordan 3 Retro"
              priceProduct="429"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Product
              imageProduct="http://nouthemes.net/html/trueshoes/images/shoe/10.jpg"
              nameProduct="Air Jordan 3 Retro"
              priceProduct="429"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Product
              imageProduct="http://nouthemes.net/html/trueshoes/images/shoe/11.jpg"
              nameProduct="Air Jordan 3 Retro"
              priceProduct="429"
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default ProductList;
