import React from 'react';
import PropTypes from 'prop-types';
import AddressForm from '../AddressForm';
import { makeStyles } from '@material-ui/core';

AddAddress.propTypes = {};

function AddAddress(props) {
  return (
    <div>
      <AddressForm />
    </div>
  );
}

export default AddAddress;
