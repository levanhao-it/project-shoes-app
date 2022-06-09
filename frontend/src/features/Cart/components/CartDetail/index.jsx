import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, makeStyles, Typography } from '@material-ui/core';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CartList from '../CartList';
import ButtonActive from 'components/component-custom/ButtonActive';

CartDetail.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0px 25px',
  },
  thread: {
    borderBottom: '1px solid #e6e6e6',
    padding: '10px 10px',
  },
  box: {
    borderBottom: '1px solid #e6e6e6',
    padding: '30px 10px',
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
    fontSize: '20px',
    fontWeight: '600',
  },
  title: {
    fontSize: '26px',
    textTransform: 'uppercase',
    color: '#000',
    fontWeight: 'bold',
    paddingBottom: '20px ',
  },
}));

function CartDetail(props) {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Typography variant="h3" className={classes.title}>
        Your Bag
      </Typography>
      <Typography variant="h6"> TOTAL (2 products) 9,5$</Typography>
      <CartList />
      <Box mt={3}>
        <ButtonActive content="Shopping Continue" />
      </Box>
    </Box>
  );
}

export default CartDetail;