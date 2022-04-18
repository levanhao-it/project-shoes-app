import React from 'react';
import PropTypes from 'prop-types';
import LogInForm from '../LogInForm';

LogIn.propTypes = {};

function LogIn(props) {
  const handleSubmit = (values) => {
    console.log('Form Submit:', values);
  };
  return (
    <div>
      <LogInForm onSubmit={handleSubmit} />
    </div>
  );
}

export default LogIn;
