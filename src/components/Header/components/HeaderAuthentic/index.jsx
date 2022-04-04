import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { makeStyles } from '@mui/styles';
import { Dialog, DialogContent } from '@mui/material';
import Register from '../../../../features/Auth/components/Register';

HeaderAuthentic.propTypes = {};

const useStyles = makeStyles((theme) => ({
  dialog: {
    fontSize: '1.6rem',
    minWidth: '300px',
  },
}));

function HeaderAuthentic(props) {
  const [open, setOpen] = React.useState(false);

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
          <li className="header-authetic__item">
            <a href="./" className="header-authetic__link">
              Login
            </a>
          </li>

          <li className="header-authetic__item">
            <a onClick={handleClickOpen} className="header-authetic__link">
              Register
            </a>
          </li>

          <li className="header-authetic__item">
            <a href="./" className="header-authetic__link">
              Usd
            </a>
          </li>

          <li className="header-authetic__item">
            <a href="./" className="header-authetic__link">
              Language
            </a>
          </li>
        </ul>
      </div>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose} className={classes.dialog}>
        <DialogContent>
          <Register />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default HeaderAuthentic;
