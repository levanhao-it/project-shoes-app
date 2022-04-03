import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Checkbox, FormControlLabel, Grid, Link, Paper, TextField, Typography } from '@mui/material';
import './styles.scss'
import { fontSize, margin } from '@mui/system';

SignInForm.propTypes = {
  
};

function SignInForm(props) {
  return (
    <Grid>
      <Paper elevation={10} className='sign-in'>
       <Grid align='center'>
        <img src="http://nouthemes.net/html/trueshoes/images/logo.png" alt="logo" className='sign-in__img'/>
          <h2 className='sign-in__title'>Sign In</h2>
          <TextField
            label="Email Address*"
            multiline
            className='sign-in__input'
            margin="normal"
            fullWidth
          />

          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            className='sign-in__input'
            margin="normal"
            fullWidth
          />
          <Grid justifyContent={'space-between'} alignItems={'center'} display='flex'>
            <FormControlLabel control={<Checkbox />} label="Keep me signed in" />
            <Link href="#" underline='none' color='#bcbcbc' fontSize={'12px'}>Forgotten your password?</Link>
          </Grid>

          <Grid>
            <Typography>
              <Box sx={{ fontFamily: 'default', m: 1, fontSize: 12 }}>By logging in, you agree to our Privacy Policy and Terms of Use.</Box>
            </Typography>

            <Button variant="contained" fullWidth size='large' style={{backgroundColor: '#2AC37D'}}>
              <Typography variant='h6'>Sign in</Typography>
            </Button>

            <Typography>
              <Box sx={{ fontFamily: 'default', m: 1, fontSize: 12 }}>Not a Member? 
                <Link href='#' color={'#111'}>Join Us.</Link>
              </Box>
            </Typography>
          </Grid>

          
       </Grid>

      </Paper>
    </Grid>
  );
}

export default SignInForm;