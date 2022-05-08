import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import DeliveryForm from '../../components/DeliveryForm';
import OrderDetail from '../../components/OrderDetail';

DeliveryPage.propTypes = {
  
};

function DeliveryPage(props) {
  return (
    <div>
      <Grid container spacing={8}>
        <Grid item xs={8}>
          <DeliveryForm />
        </Grid>

        <Grid item xs={4}>
          <OrderDetail />
        </Grid>
      </Grid>
    </div>
  );
}

export default DeliveryPage;