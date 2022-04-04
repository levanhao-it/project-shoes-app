
import PropTypes from 'prop-types';
import './styles.scss';
import { makeStyles } from '@mui/styles';
import { Dialog, DialogContent } from '@mui/material';
import Register from '../../../../features/Auth/components/Register';

import { Button } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import React, { useState } from 'react';
import LogIn from '../../../../features/Auth/components/LogIn';
HeaderAuthentic.propTypes = {};

const useStyles = makeStyles((theme) => ({
  dialog: {
    fontSize: '1.6rem',
    minWidth: '300px',
  },
}));

function HeaderAuthentic(props) {
  const [open, setOpen] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenRegister = () => {
    setOpenRegister(true);
  };

  const handleCloseRegister = () => {
    setOpenRegister(false);
  };

  const classes = useStyles();
  return (
    <div>
      <div className="header-authetic">
        <p className="header-authetic__info">
          460 West 34th Street, 15th floor, New York - Hotline: 804-377-3580 - 804-399-3580
        </p>

        <ul className="header-authetic__list">
          
          <Button onClick={handleClickOpenRegister} className="header-authetic__link">Register</Button>
          

          <Button onClick={handleClickOpen} className="header-authetic__item">
            Login
          </Button>

          <li className="header-authetic__item">
            <a  className="header-authetic__link">Usd</a>
          </li>

          <li className="header-authetic__item">
            <a className="header-authetic__link">Language</a>
          </li>
        </ul>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        disableEscapeKeyDown
      >
        <DialogContent>
          <LogIn />
        </DialogContent>
      </Dialog>

      <Dialog disableEscapeKeyDown open={openRegister} onClose={handleCloseRegister} className={classes.dialog}>
        <DialogContent>
          <Register />
        </DialogContent>
      </Dialog>
      
    </div>

    

  );
}

export default HeaderAuthentic;
