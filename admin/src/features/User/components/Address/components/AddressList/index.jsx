import React from 'react';
import PropTypes from 'prop-types';
import Address from '../Address';

AddressList.propTypes = {};

function AddressList(props) {
  return (
    <div>
      <Address />
      <Address />
    </div>
  );
}

export default AddressList;
