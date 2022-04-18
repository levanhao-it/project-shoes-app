import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, makeStyles, Typography } from '@material-ui/core';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CartList from '../CartList';

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
    width: '50%',
    backgroundColor: '#000',
    color: '#fff',
    height: '50px',
    fontSize: '16px',
    fontWeight: '600',
    '&:hover': {
      backgroundColor: '#000',
      color: '#ccc',
      opacity: '0.7',
      transition: 'all 0.3s ease-in-out',
    },
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
  title: {
    fontSize: '2.6rem',
    textTransform: 'uppercase',
    color: '#000',
    fontWeight: 'bold',
    paddingBottom: '2rem ',
  },
}));

function CartDetail(props) {
  const classes = useStyles();
  return (
    <Box>
      <Typography variant="h3" className={classes.title}>
        Your Bag
      </Typography>
      <Typography variant="h5"> TOTAL (2 products) 9,5$</Typography>
      <CartList />
      <Box mt={3}>
        <Button variant="contained" className={classes.buttonCart} size="large">
          <Box display="flex" justifyContent="space-between" width="100%">
            <ArrowBackIcon fontSize="large" />
            <Typography variant="h5" className={classes.buttonTitle}>
              continue shopping
            </Typography>
          </Box>
        </Button>
      </Box>
    </Box>
  );
}

export default CartDetail;