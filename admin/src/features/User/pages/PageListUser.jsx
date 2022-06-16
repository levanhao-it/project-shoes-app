import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, makeStyles, Typography, withStyles } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';
import UserList from '../components/UserList';
import { useHistory, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import userApi from 'components/api/userApi';

PageListUser.propTypes = {};

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  },
}))(Button);
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  padding: {
    padding: '0 50px',
  },
  box: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  h1: {
    margin: '0 ',
  },
}));

function PageListUser(props) {
  const classes = useStyles();

  const [userList, setUserList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const listUser = await userApi.getAllUser();
        setUserList(listUser);
      } catch (error) {
        console.log('Failed to fetch getAllUser list', error);
      }
    })();
  }, []);

  return (
    <div className={classes.padding}>
      <Box className={classes.box}>
        <h1 className={classes.h1}>Customers</h1>
        <ColorButton variant="contained" color="primary" className={classes.margin}>
          + Add
        </ColorButton>
      </Box>
      {/* <UserList data={userList} /> */}
    </div>
  );
}

export default PageListUser;
