import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Checkbox, FormControlLabel, Grid, Link, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import InputField from '../../../../components/form-controls/InputField';
import PasswordField from '../../../../components/form-controls/PasswordField';

LogInForm.propTypes = {
  onSubmit: PropTypes.func,
};

const schema = yup.object().shape({
  email: yup.string().required('Please enter email').email('Please enter valid email'),
  password: yup.string().required('Please enter password').min(6, 'Title must be at least 6 characters'),
});

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '20',
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
  },
  submit: {
    backgroundColor: '#2AC37D',
    fontSize: '14px'
  },
  img: {
    width: '100px'
  }
}))

function LogInForm(props) {
  const classes = useStyles();
  console.log(classes)

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema)
  })

  const handelSubmit = (values) => {
    console.log(values)
    const {onSubmit} = props;
    if(onSubmit){
      onSubmit(values)
    }

    form.reset();
  }


  return (
    <Grid align='center'>
    <img className={classes.img} src="http://nouthemes.net/html/trueshoes/images/logo.png" alt="logo"/>
      <Typography className={classes.title} component='h3' variant='h5'>
        Sign In
      </Typography>
      
      <form onSubmit={form.handleSubmit(handelSubmit)}>
        <InputField name='email' label='Email' form={form}/>
        <PasswordField name='password' label='Password' form={form}/>
        <Grid justifyContent={'space-between'} alignItems={'center'} display='flex'>
          <FormControlLabel control={<Checkbox />} label="Keep me signed in" />
          <Link href="#" underline='none'>Forgotten your password?</Link>
        </Grid>

        <Grid>
          <Typography>
            <Box sx={{ fontFamily: 'default', m: 1, fontSize: 12 }}>By logging in, you agree to our <Link href='#'> Privacy Policy </Link> and <Link href='#'> Terms of Use </Link> </Box>
          </Typography>

          <Button className={classes.submit} variant="contained" fullWidth size='large' type='submit' style={{ backgroundColor: '#2AC37D' }} >Sign in</Button>

          <Typography>
            <Box sx={{ fontFamily: 'default', m: 1, fontSize: 12 }}>Not a Member? 
              <Link href='#' color={'#111'}>Join Us</Link>
            </Box>
          </Typography>
        </Grid>
      </form>

      
    </Grid>
  );
}

export default LogInForm;