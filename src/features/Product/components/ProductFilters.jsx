import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import FilterByCategory from './Filters/FilterByCategory';
import FilterByPrice from './Filters/FilterByPrice';
import FilterByBrand from './Filters/FilterByBrand';
import FilterByWidth from './Filters/FilterByWidth';

ProductFilters.propTypes = {};

function ProductFilters(props) {
  return (
    <Box>
      <FilterByCategory />
      <FilterByPrice />

      <FilterByBrand />
      <FilterByWidth />
    </Box>
  );
}

export default ProductFilters;
