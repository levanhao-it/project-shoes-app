import React from 'react';
import PropTypes from 'prop-types';
import CartItem from '../CartItem';
import { Box } from '@material-ui/core';

CartList.propTypes = {};

function CartList(props) {
  return (
    <Box>
      <CartItem
        imageProduct="http://nouthemes.net/html/trueshoes/images/shoe/6.jpg"
        nameProduct="ZX 5K BOOST Shoes"
        priceProduct="150"
        colorProduct="Blue"
        sizeProduct="6.5"
        quantityProduct="2"
      />
      <CartItem
        imageProduct="http://nouthemes.net/html/trueshoes/images/shoe/7.jpg"
        nameProduct="ZX 6K BOOST Shoes Size 7"
        priceProduct="150"
        colorProduct="  Pink"
        sizeProduct="7"
        quantityProduct="1"
      />
    </Box>
  );
}

export default CartList;
