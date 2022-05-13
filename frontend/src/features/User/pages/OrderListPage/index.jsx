import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import OrderDetail from 'features/User/components/OrderDetail';
import { makeStyles } from '@material-ui/styles';

OrderListPage.propTypes = {};
const useStyle = makeStyles((theme) => ({
  root: {
    margin: '0 20px',
  },
}));

function OrderListPage(props) {
  const classes = useStyle();
  return (
    <Box className={classes.root}>
      <OrderDetail />
      <OrderDetail />
    </Box>
  );
}

export default OrderListPage;
