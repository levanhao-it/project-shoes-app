import React from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, makeStyles, withStyles } from '@material-ui/core';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import AddressList from './components/AddressList';
import { purple } from '@material-ui/core/colors';
import AddAddress from './components/AddAddress';

AddressFeature.propTypes = {};
const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: '#5048e5',
    '&:hover': {
      backgroundColor: '#3832a0',
    },
    borderRadius: '5px',
  },
}))(Button);
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    float: 'right',
  },
}));

function AddressFeature(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <AddressList />
      <ColorButton
        variant="contained"
        color="primary"
        className={classes.margin}
        startIcon={<AddLocationIcon />}
        onClick={handleClickOpen}
      >
        Add
      </ColorButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
      >
        <AddAddress />
      </Dialog>
    </div>
  );
}

export default AddressFeature;
