import { yupResolver } from '@hookform/resolvers/yup';
import { LinearProgress, makeStyles, Typography } from '@material-ui/core';

import ButtonActive from 'components/component-custom/ButtonActive';

import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from '../../../../components/form-controls/InputField';
import PasswordField from '../../../../components/form-controls/PasswordField';
EditUserForm.propTypes = {
  onSubmit: PropTypes.func,
  user: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '350px',
    padding: '10px 40px',
    textAlign: 'center',
    position: 'absolute',
    top: '25%',
    left: '45%',
    marginTop: '-50px',
    marginLeft: '-50px',
  },
  title: {
    margin: '10px 0 20px 0',
  },
  heading: {
    fontSize: '26px',
    textTransform: 'uppercase',
  },
  processing: {
    left: '-65px',
    top: '-18px',
    width: '479px',
  },
}));

function EditUserForm({ user = {}, onSubmit = null }) {
  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required('Please enter full name')
      .test('Should has at least two words', 'Please enter at least two words', (value) => {
        const words = value.split(' ');
        return words.length >= 2;
      }),

    password: yup
      .string()
      .required('Please enter password')
      .min(6, 'Title must be at least 6 characters'),
    confirmPassword: yup
      .string()
      .required('Please enter confirm password')
      .oneOf([yup.ref('password'), null], 'Password does not match'),
  });
  const form = useForm({
    defaultValues: {
      fullName: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
    form.reset();
  };

  const { isSubmitting } = form.formState;

  const classes = useStyles();

  useEffect(() => {
    const fieldList = ['fullName'];
    const data = ['full_name'];
    fieldList.forEach((element, i) => {
      form.setValue(element, user[data[i]]);
    });
  }, [user]);

  return (
    <div className={classes.root}>
      {isSubmitting && <LinearProgress className={classes.processing} />}

      <h2 className={classes.heading}>Edit Customer</h2>

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="fullName" label="Full Name" form={form} />

        <PasswordField name="password" label="Password" form={form} />
        <PasswordField name="confirmPassword" label="Confirm Password" form={form} />

        <ButtonActive disabled={isSubmitting} content="Update" type="submit" />
      </form>
    </div>
  );
}

export default EditUserForm;
