import { Box, Button, Dialog, DialogContent, makeStyles, Typography } from '@material-ui/core';
import Close from '@material-ui/icons/Close';
import React, { useState } from 'react';
import LogIn from '../../../../features/Auth/components/LogIn';
import Register from '../../../../features/Auth/components/Register';
import './styles.scss';

HeaderAuthentic.propTypes = {};

const useStyles = makeStyles((theme) => ({
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
    margin: '10px 0 20px'
  },
  footerTitle: {
    color: '#8d8d8d'
  },
  footerLink: {
    marginLeft: '4px',
    textDecoration: 'underline',
    cursor: 'pointer'
  }
}));

const MODE = {
  LOGIN: 'login',
  REGISTER: 'resgister'
}

function HeaderAuthentic(props) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const classes = useStyles();
  return (
    <div>
      <div className="header-authetic">
        <p className="header-authetic__info">
          460 West 34th Street, 15th floor, New York - Hotline: 804-377-3580 - 804-399-3580
        </p>

        <ul className="header-authetic__list">
          <Button  className="header-authetic__link" onClick={handleClickOpen}>
            Register
          </Button>

          <Button  className="header-authetic__item" onClick={handleClickOpen}>
            Login
          </Button>

          <li className="header-authetic__item">
            <a className="header-authetic__link">Usd</a>
          </li>

          <li className="header-authetic__item">
            <a className="header-authetic__link">Language</a>
          </li>
        </ul>
      </div>

      <Dialog open={open} onClose={handleClose} disableEscapeKeyDown>
        <Close className={classes.icon} onClick={handleClose}></Close>
        <DialogContent>
          {mode === MODE.LOGIN && (
            <>
              <LogIn />
              <Box display='flex' className={classes.footerForm}>
                <Typography variant='p' component = "p" className={classes.footerTitle}>Not a member? </Typography> 
                <Typography variant='span' component='span' className={classes.footerLink} onClick={() => setMode(MODE.REGISTER)}>Join Us</Typography>

              </Box>
            </>
          )}

          {mode === MODE.REGISTER && (
            <>
              <Register />
              <Box display= 'flex' className={classes.footerForm}>
                <Typography variant='p' component = "p" className={classes.footerTitle} >Already a member? </Typography> 
                <Typography variant='span' component='span'  className={classes.footerLink} onClick={() => setMode(MODE.LOGIN)}>Sign In</Typography>
              </Box>
              
            </>
          )}

        </DialogContent>
      </Dialog>


    </div>
  );
}

export default HeaderAuthentic;
