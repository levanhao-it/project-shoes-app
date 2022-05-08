import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import CartDetail from './components/CartDetail';
import CartSummary from './components/CartSummary';

CartFeature.propTypes = {};
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
}));

function CartFeature(props) {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Box>
        <Grid container spacing={7} className={classes.thread}>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <CartDetail />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <CartSummary />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default CartFeature;
