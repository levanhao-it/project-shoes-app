import { Button, Dialog, DialogContent, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import LogIn from '../../../../features/Auth/components/LogIn';
import Register from '../../../../features/Auth/components/Register';
import './styles.scss';

HeaderAuthentic.propTypes = {};

const useStyles = makeStyles((theme) => ({
  dialog: {
    fontSize: '1.6rem',
    minWidth: '300px',
  },
}));

function HeaderAuthentic(props) {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  const handleClickOpenLogin = () => {
    setOpenLogin(true);
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
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
          <Button onClick={handleClickOpenRegister} className="header-authetic__link">
            Register
          </Button>

          <Button onClick={handleClickOpenLogin} className="header-authetic__item">
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

      <Dialog open={openLogin} onClose={handleCloseLogin} disableEscapeKeyDown>
        <DialogContent>
          <LogIn />
        </DialogContent>
      </Dialog>

      <Dialog
        disableEscapeKeyDown
        open={openRegister}
        onClose={handleCloseRegister}
        className={classes.dialog}
      >
        <DialogContent>
          <Register />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default HeaderAuthentic;
