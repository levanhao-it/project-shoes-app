import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/Auth/userSlice';
import { Link } from 'react-router-dom';

Header.propTypes = {};
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    backgroundColor: '#fff',
    color: 'rgb(107 114 128)',
    borderBottom: '1px solid #d1d5db',
  },
  tool: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  login: {
    cursor: 'pointer',
    fontSize: '14px',
    fontFamily:
      'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
  },
  title: {
    fontSize: '18px',
    fontFamily:
      'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
  },
}));

function Header(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user.current.data);

  const isLoggedIn = !!loggedInUser.accessToken;
  const handleLogoutClick = () => {
    const action = logout();
    dispatch(action);
  };
  return (
    <div>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.tool}>
          <Typography className={classes.title} variant="h6" noWrap>
            Manager Dashboard
          </Typography>
          {!isLoggedIn && (
            <Typography className={classes.login} variant="h6" noWrap component={Link} to="/login">
              Login
            </Typography>
          )}
          {isLoggedIn && (
            <>
              <Typography>
                {' '}
                Hi, <span>{loggedInUser.userName}</span>
              </Typography>
              <Typography className={classes.login} variant="h6" noWrap onClick={handleLogoutClick}>
                Logout
              </Typography>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
