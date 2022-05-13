import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import CartDetail from './components/CartDetail';
import CartSummary from './components/CartSummary';

CartFeature.propTypes = {};
const useStyles = makeStyles((theme) => ({
  root: {
    padding: '70px 0',
  },
  thread: {
    
  },
  box: {
    
  },
}));

function CartFeature(props) {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Box>
        <Grid container>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8} className={classes.thread}>
            <CartDetail />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} className={classes.box}>
            <CartSummary />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default CartFeature;
