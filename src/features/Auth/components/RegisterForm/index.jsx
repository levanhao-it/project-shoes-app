import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Link, makeStyles, Typography } from '@material-ui/core';
import ButtonActive from 'components/component-custom/ButtonActive';

import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from '../../../../components/form-controls/InputField';
import PasswordField from '../../../../components/form-controls/PasswordField';

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '350px',
    padding: '10px 40px',
    textAlign: 'center',
  },
  title: {
    margin: '10px 0 20px 0',
  },
}));

function RegisterForm(props) {
  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required('Please enter full name')
      .test('Should has at least two words', 'Please enter at least two words', (value) => {
        const words = value.split(' ');
        return words.length >= 2;
      }),
    email: yup.string().required('Please enter email').email('Please enter valid email'),
    phone: yup
      .string()
      .required('Please enter phone number')
      .min(10, 'Phone number must be at least 10 characters'),
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
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const handleSubmit = (values) => {
    console.log('Todo form: ', values);
    const { onSubmit } = props;
    if (onSubmit) {
      onSubmit(values);
    }
    form.reset();
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h2 className="sign-in__title">Sign Up</h2>
      <Typography className={classes.title}>Create an account</Typography>

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="fullName" label="Full Name" form={form} />
        <InputField name="email" label="Email" form={form} />
        <InputField name="phone" label="Phone" form={form} />

        <PasswordField name="password" label="Password" form={form} />
        <PasswordField name="confirmPassword" label="Confirm Password" form={form} />

        {/* <Button
          variant="contained"
          margin="outlined"
          fullWidth
          size="large"
          style={{ backgroundColor: '#2AC37D' }}
          type="submit"
        >
          <Typography variant="h6"> Create an account</Typography>
        </Button> */}

        <ButtonActive content="Create an account" type="submit" />

        <Typography>
          <Box sx={{ fontFamily: 'default', m: 1, fontSize: 12 }}>
            Have a account?
            <Link href="#" color={'#111'}>
              Sign in
            </Link>
          </Box>
        </Typography>
      </form>
    </div>
  );
}

export default RegisterForm;
