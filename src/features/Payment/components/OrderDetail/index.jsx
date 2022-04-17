import React from 'react';
import PropTypes from 'prop-types';
import { Box, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import OrderDetailItem from '../OrderDetailItem';



OrderDetail.propTypes = {
  
};

const useStyle = makeStyles((theme) => ({
  root: {
    marginTop: '40px'
  },
  container: {
    padding: '24px 15px',
    border: '1px solid #ccc',
  },
  headingTitle: {
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
  title: {
    textTransform: 'uppercase',
    fontSize: '14px'
  },
  titleActive: {
    textTransform: 'uppercase',
    fontSize: '14px',
    fontWeight:'bold'
  },
  containerOrder: {
    padding: '40px 0',
    borderTop: '1px solid #ccc',
    borderBottom: '1px solid #ccc'
  }


}))

function OrderDetail(props) {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <Box className={classes.container}>
        <Typography variant='h4'className={classes.headingTitle}>Order summary</Typography>

        <Box display="flex" justifyContent= "space-between" mt={2}>
          <Typography variant='p' className={classes.title}>Orginal price</Typography>
          <Typography variant='p' className={classes.title}>$310.00</Typography>
        </Box>

        <Box display="flex" justifyContent= "space-between" mt={2}>
          <Typography variant='p' className={classes.title}>Sale</Typography>
          <Typography variant='p' className={classes.title}>- $48.00</Typography>
        </Box>

        <Box display="flex" justifyContent= "space-between" mt={2}>
          <Typography variant='p' className={classes.title}>2 items</Typography>
          <Typography variant='p' className={classes.title}>$262.00</Typography>
        </Box>

        <Box display="flex" justifyContent= "space-between" mt={2}>
          <Typography variant='p' className={classes.title}>Delivery</Typography>
          <Typography variant='p' className={classes.title}>Free</Typography>
        </Box>

        <Box display="flex" justifyContent= "space-between" mt={2}>
          <Typography variant='p' className={classes.titleActive}>Total</Typography>
          <Typography variant='p' className={classes.titleActive}>$262.00</Typography>
        </Box>
      </Box>

      <TextField label="Enter your promo code" variant="outlined" fullWidth margin="normal" />

      <Box className={classes.containerOrder}>
        <Typography variant='h4'className={classes.headingTitle}>Order details</Typography>
        <OrderDetailItem/>
        <OrderDetailItem/>
        <OrderDetailItem/>
      </Box>


    </div>
  );
}

export default OrderDetail;