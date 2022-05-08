import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import InputField from '../../../../components/form-controls/InputField';
import { useForm } from 'react-hook-form';
import DeliveryOption from '../DeliveryOption';
import AirportShuttleOutlinedIcon from '@material-ui/icons/AirportShuttleOutlined';
import StoreMallDirectoryOutlinedIcon from '@material-ui/icons/StoreMallDirectoryOutlined';
import ButtonActive from '../../../../components/component-custom/ButtonActive';

DeliveryForm.propTypes = {
  
};

const useStyle = makeStyles((theme) => ({
  headingTitle: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    margin: '40px 0 15px',
    fontSize: '26px'
  },
  subHeading: {
    fontSize: '16px'
  },
  iconDelivery: {
    fontSize: '20px'
  }
}))

function DeliveryForm(props) {
  const classes = useStyle();
  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      address: '',
      email: '',
      phone: '',
      locationStore: '',
    },
  });
  return (
    <form>
      <Typography variant='h3' className={classes.headingTitle}>Shipping Adrress</Typography>
      
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <InputField name='firstName' label='First Name *' form={form}/>
        </Grid>
        <Grid item xs={6}>
          <InputField name='lastName' label='Last Name *' form={form}/>
        </Grid>
      </Grid>

      <InputField name='address' label='Find delivery address *' form={form}/>

      <Typography variant='h3' className={classes.headingTitle}>Delivery options</Typography>
      <DeliveryOption titleDelivery="Standard Delivery" descDelivery="Enter your address to see when you'll get your order" icon={<AirportShuttleOutlinedIcon className={classes.iconDelivery} />} active/>
      <DeliveryOption titleDelivery="Pick up a order at the store" descDelivery="Pay now and find a store near you" icon = {<StoreMallDirectoryOutlinedIcon className={classes.iconDelivery}/>}/>

      <Typography variant='h3' className={classes.headingTitle}>Near by store</Typography>
      <Typography variant='p' className={classes.subHeading}>Please provide a location to find the most convenient store:</Typography>
      <InputField name='locationStore' label='Location *' form={form}/>
      
      <ButtonActive content = "search for store" widthBtn="40%" />

      <Typography variant='h3' className={classes.headingTitle}>Contact details</Typography>
      <Typography variant='p' className={classes.subHeading}>We'll use these details to keep you informed on your delivery.</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <InputField name='email' label='Email *' form={form}/>
        </Grid>
        <Grid item xs={6}>
          <InputField name='phone' label='Phone *' form={form}/>
        </Grid>
      </Grid>

      <ButtonActive content = "Review and pay" widthBtn="40%"/>



    </form>
  );
}

export default DeliveryForm;