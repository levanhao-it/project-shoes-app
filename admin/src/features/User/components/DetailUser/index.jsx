import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, makeStyles, Paper, Typography } from '@material-ui/core';
import userApi from 'components/api/userApi';
import { useEffect } from 'react';

DetailUser.propTypes = {
  user: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0 32px',
  },
  paper: {
    marginBottom: '20px',
  },
  textHeading: {
    fontSize: '18px',
    fontWeight: '600',
    lineHeight: '1.375',
    padding: '32px 24px',
  },
  ul: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
  },
  li: {
    padding: '12px 24px',
    borderBottom: '1px solid #e0e0e0',
    display: 'flex',
    justifyContent: 'flex-start',
    fontSize: '14px',
    '&:first-child': {
      borderTop: '1px solid #e0e0e0',
    },
  },
  title: {
    fontSize: '14px',
    fontWeight: '600',

    minWidth: '180px',
  },
  value: {
    fontSize: '14px',
    fontWeight: '500',
    color: 'rgb(101 116 139)',
  },
  margin: {
    float: 'right',
  },
}));

function DetailUser({ user = {} }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper variant="outlined" className={classes.paper}>
        <Box className={classes.heading}>
          <Typography className={classes.textHeading}>Basics Detail</Typography>
        </Box>
        <Box>
          <ul className={classes.ul}>
            <li className={classes.li}>
              <Typography className={classes.title}>Id User:</Typography>
              <Typography className={classes.value}> {user['idUser']}</Typography>
            </li>
            <li className={classes.li}>
              <Typography className={classes.title}>Full Name: </Typography>
              <Typography className={classes.value}>{user['full_name']}</Typography>
            </li>
            <li className={classes.li}>
              <Typography className={classes.title}>Email:</Typography>
              <Typography className={classes.value}>{user['email']}</Typography>
            </li>
            <li className={classes.li}>
              <Typography className={classes.title}> Quantity Order:</Typography>
              <Typography className={classes.value}>{user['quantityOrders']}</Typography>
            </li>
          </ul>
        </Box>
      </Paper>
      <Button variant="outlined" className={classes.margin} color="secondary">
        Delete User
      </Button>
    </div>
  );
}

export default DetailUser;
