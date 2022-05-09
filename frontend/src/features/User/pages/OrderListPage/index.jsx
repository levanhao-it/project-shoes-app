import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import OrderDetail from 'features/User/components/OrderDetail';

OrderListPage.propTypes = {
  
};

function OrderListPage(props) {
  return (
    <Box>
      <OrderDetail />
      <OrderDetail />
    </Box>
  );
}

export default OrderListPage;