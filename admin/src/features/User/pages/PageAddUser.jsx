import React from 'react';
import PropTypes from 'prop-types';
import AddUserForm from '../components/AddUserForm';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { unwrapResult } from '@reduxjs/toolkit';
import { register } from 'features/Auth/userSlice';
import { useHistory } from 'react-router-dom';

PageAddUser.propTypes = {};

function PageAddUser(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = async (values) => {
    try {
      console.log('Form Submit: ', values);
      const action = register(values);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);

      // close dialog
      history.push('/users');
      // do something here
      console.log('New User: ', user);
      enqueueSnackbar('Add Customer Success', { variant: 'success', autoHideDuration: 1000 });
    } catch (error) {
      console.log('failed to register user: ', error.message);
      enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 1000 });
    }
  };
  return (
    <div>
      <AddUserForm onSubmit={handleSubmit} />
    </div>
  );
}

export default PageAddUser;
