import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import DeliveryPage from './pages/DeliveryPage';


const useStyle = makeStyles((theme) => ({
  root: {
    width: '1200px',
    margin: 'auto',
    padding: '20px'
  }
}))

function PaymentFeature(props) {
  const classes = useStyle()
  return (
    <div className={classes.root}>
        <DeliveryPage />
    </div>
  );
}

export default PaymentFeature;