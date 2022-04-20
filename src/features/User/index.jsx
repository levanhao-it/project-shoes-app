import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@material-ui/core';
import UserSidebar from './components/UserSidebar';
import { makeStyles } from '@material-ui/styles';
import AccountPage from './pages/AccountPage';

UserFeature.propTypes = {
  
};

const useStyle = makeStyles((theme) => ({
  root: {
    backgroundColor: '#f7f7f7'
  },
  container: {
    width:'1200px',
    margin: "auto",
    padding:'80px 0'
  }
}))

function UserFeature(props) {
  const classes = useStyle()
  return (
    <div className={classes.root}>
      <Box className={classes.container}>
        <Grid container spacing={6}>
          <Grid item xs={3}>
            <UserSidebar/>
          </Grid>
          <Grid item xs={9}>
            <AccountPage />
          </Grid>
        </Grid>

      </Box>

    </div>
  );
}

export default UserFeature;