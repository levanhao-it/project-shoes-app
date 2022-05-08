import React from 'react';
import PropTypes from 'prop-types';
import ProductSilder from '../ProductSlider';
import ProductTabs from '../ProductTabs';
import ProductRecomend from '../ProductRecomend';

ProductInfo.propTypes = {
  
};

function ProductInfo(props) {
  return (
    <div>
      <ProductSilder />
      <ProductTabs />
    </div>
  );
}

export default ProductInfo;