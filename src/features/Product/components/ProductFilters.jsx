import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles } from '@material-ui/core';
import FilterByCategory from './Filters/FilterByCategory';
import FilterByPrice from './Filters/FilterByPrice';
import FilterByBrand from './Filters/FilterByBrand';
import FilterByWidth from './Filters/FilterByWidth';
import FilterBySize from './Filters/FilterBySize';
import FilterByColor from './Filters/FilterByColor';

ProductFilters.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: 'hidden scroll',
    direction: 'inherit',
    boxSizing: 'border-box!important',
    position: 'relative',
    display: 'block',
    height: '600px',
    width: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      width: '0.6rem',
      backgroundColor: '#fff',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#2AC37D',
      borderRadius: '0.5em',
      boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: '#F5F5F5',
    },
  },
}));

function ProductFilters(props) {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <FilterByCategory />
      <FilterByPrice />

      <FilterByBrand />
      <FilterByWidth />
      <FilterBySize />
      <FilterByColor />
    </Box>
  );
}

export default ProductFilters;
