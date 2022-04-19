import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';

import Pagination from '@material-ui/lab/Pagination';
import './styles.scss';

ProductPagination.propTypes = {};

function ProductPagination(props) {
  return (
    <Box className="pagination" marginTop={2}>
      <Pagination count={5} color="success" />
    </Box>
  );
}

export default ProductPagination;
