import React from 'react';
import PropTypes from 'prop-types';
import EditUserForm from '../components/EditUserForm';
import { useHistory, useRouteMatch } from 'react-router-dom';
import useUserDetail from '../hooks/useUserDetail';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { unwrapResult } from '@reduxjs/toolkit';
import { edit } from 'features/Auth/userSlice';
import userApi from 'components/api/userApi';

PageEditUser.propTypes = {};

function PageEditUser(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const {
    params: { userId },
    url,
  } = useRouteMatch();
  const { user, loading } = useUserDetail(userId);
  const userData = user.data;
  const handleSubmit = async (values) => {
    try {
      // const action = edit(userId, values);
      // const resultAction = await dispatch(action);
      // const user = unwrapResult(resultAction);
      console.log(values);
      const { status, message } = await userApi.update(userId, values);
      if (status === 'OK') {
        setTimeout(() => {
          history.push('/users');
        }, 1000);
        // do something here
        enqueueSnackbar('Edit Customer Success', { variant: 'success', autoHideDuration: 1000 });
      } else {
        enqueueSnackbar(message, { variant: 'error', autoHideDuration: 1000 });
      }
    } catch (error) {
      console.log('failed to register user: ', error.message);
      enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 1000 });
    }
  };

  return (
    <div>
      <EditUserForm user={userData} onSubmit={handleSubmit} />
    </div>
  );
}

export default PageEditUser;
