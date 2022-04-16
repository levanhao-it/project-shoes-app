import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, makeStyles, Typography } from '@material-ui/core';

import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

CartDetail.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '7rem 0',
  },
  thread: {
    borderBottom: '1px solid #e6e6e6',
    padding: '1rem 1rem',
  },
  box: {
    borderBottom: '1px solid #e6e6e6',
    padding: '3rem 1rem',
  },
  buttonCart: {
    width: '80%',
    backgroundColor: '#000',
    color: '#fff',
    height: '50px',
    fontSize: '16px',
    fontWeight: '600',
  },
  buttonHeart: {
    width: 'calc(20% - 5px)',
    marginLeft: '5px',
    height: '50px',
    border: '2px solid #000',
  },
  buttonTitle: {
    fontSize: '16px',
    fontWeight: '600',
  },
}));

function CartDetail(props) {
  const classes = useStyles();
  return (
    <Box>
      <Typography>Hello User</Typography>
      <Typography variant="h2">Your Bag</Typography>
      <CartList />
      <Box mt={3}>
        <Button variant="contained" className={classes.buttonCart} size="large">
          <Box display="flex" justifyContent="space-between" width="100%">
            <Typography variant="h5" className={classes.buttonTitle}>
              ADD TO CART
            </Typography>
            <ArrowRightAltIcon fontSize="large" />
          </Box>
        </Button>
      </Box>
    </Box>
  );
}

export default CartDetail;
