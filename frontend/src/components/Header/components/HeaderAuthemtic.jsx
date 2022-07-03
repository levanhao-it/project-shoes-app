import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import Close from '@material-ui/icons/Close';
import { HEADER_AUTHENTIC } from 'constant';
import LogIn from 'features/Auth/components/LogIn';
import Register from 'features/Auth/components/Register';
import { logout } from 'features/Auth/userSlice';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

HeaderAuthentic.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0, 4),
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
    height: `${HEADER_AUTHENTIC}`,
    backgroundColor: '#f5f5f5',
  },

  list: {
    display: 'flex',
    listStyle: 'none',

    '& > li': {
      padding: theme.spacing(0, 2),
      fontSize: '0.8rem',
    },

    '& > li:hover': {
      color: '#757575',
      cursor: 'pointer',
    },

    '& > li ~ li': {
      borderLeft: '1px solid #000',
    },
  },

  dialog: {
    fontSize: '1.6rem',
    minWidth: '300px',
    position: 'relative',
  },
  icon: {
    float: 'right',
    position: 'absolute',
    top: '5px',
    right: '5px',
    cursor: 'pointer',
    fontSize: '30px',
  },
  footerForm: {
    justifyContent: 'center',
    margin: '10px 0 20px',
  },
  footerTitle: {
    color: '#8d8d8d',
  },
  footerLink: {
    marginLeft: '4px',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  menu: {
    paddingTop: '40px',
  },
}));

const MODE = {
  LOGIN: 'login',
  REGISTER: 'resgister',
};

function HeaderAuthentic(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const loggedInUser = useSelector((state) => state.user.isLoggedIn);

  const isLoggedIn = !!loggedInUser;
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUserClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    const action = logout();
    dispatch(action);
    history.push('/');
  };

  const handleClickLogin = () => {
    setMode(MODE.LOGIN);
    handleClickOpen();
  };

  const handleClickRegister = () => {
    setMode(MODE.REGISTER);
    handleClickOpen();
  };

  const classes = useStyles();
  return (
    <>
      <Box className={classes.root}>
        <Typography variant="body2">
          460 West 34th Street, 15th floor, New York - Hotline: 804-377-3580 - 804-399-3580
        </Typography>
        <ul className={classes.list}>
          <li>Help</li>
          {!isLoggedIn && (
            <>
              <li onClick={handleClickRegister}>Join Us</li>
              <li onClick={handleClickLogin}>Sign In</li>
            </>
          )}
          {isLoggedIn && (
            <li>
              <IconButton style={{ padding: '0px' }} color="inherit" onMouseOver={handleUserClick}>
                <AccountCircle />
              </IconButton>
            </li>
          )}
        </ul>
      </Box>
      <Menu
        className={classes.menu}
        style={{ top: '25px' }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        getContentAnchorEl={null}
        MenuListProps={{ onMouseLeave: handleCloseMenu }}
      >
        <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>

      <Dialog open={open} onClose={handleClose} disableEscapeKeyDown>
        <Close className={classes.icon} onClick={handleClose}></Close>
        <DialogContent>
          {mode === MODE.LOGIN && (
            <>
              <LogIn closeDialog={handleClose} />
              <Box display="flex" className={classes.footerForm}>
                <Typography variant="p" component="p" className={classes.footerTitle}>
                  Not a member?{' '}
                </Typography>
                <Typography
                  variant="span"
                  component="span"
                  className={classes.footerLink}
                  onClick={() => setMode(MODE.REGISTER)}
                >
                  Join Us
                </Typography>
              </Box>
            </>
          )}

          {mode === MODE.REGISTER && (
            <>
              <Register closeDialog={handleClickLogin} />
              <Box display="flex" className={classes.footerForm}>
                <Typography variant="p" component="p" className={classes.footerTitle}>
                  Already a member?{' '}
                </Typography>
                <Typography
                  variant="span"
                  component="span"
                  className={classes.footerLink}
                  onClick={() => setMode(MODE.LOGIN)}
                >
                  Sign In
                </Typography>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default HeaderAuthentic;
