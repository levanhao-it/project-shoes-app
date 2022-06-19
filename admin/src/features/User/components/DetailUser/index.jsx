import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Paper, Typography } from '@material-ui/core';

DetailUser.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0 32px',
  },
  paper: {},
  textHeading: {
    fontSize: '18px',
    fontWeight: '600',
    lineHeight: '1.375',
    padding: '32px 24px',
  },
  ul: {
    listStyle: 'none',
    padding: '0',
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
}));

function DetailUser(props) {
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
              <Typography className={classes.value}> 1</Typography>
            </li>
            <li className={classes.li}>
              <Typography className={classes.title}>Full Name: </Typography>
              <Typography className={classes.value}>Lee Van Hao</Typography>
            </li>
            <li className={classes.li}>
              <Typography className={classes.title}>Email:</Typography>
              <Typography className={classes.value}>test@gmail.com</Typography>
            </li>
            <li className={classes.li}>
              <Typography className={classes.title}>Password:</Typography>
              <Typography className={classes.value}>123123</Typography>
            </li>
          </ul>
        </Box>
      </Paper>
    </div>
  );
}

export default DetailUser;
