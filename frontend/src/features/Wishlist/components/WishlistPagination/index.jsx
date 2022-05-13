import { Box } from '@material-ui/core';
import React from 'react';
import Pagination from '@material-ui/lab/Pagination';

WishlistPagination.propTypes = {};

function WishlistPagination(props) {
  return (
    <Box className="pagination" marginTop={2}>
      <Pagination count={10} color="success" />
    </Box>
  );
}

export default WishlistPagination;
