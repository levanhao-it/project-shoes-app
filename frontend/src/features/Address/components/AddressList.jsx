import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import addressApi from 'api/addressApi';
import StorageKeys from 'constant/storage-keys';
import AddressDetail from './AddressDetail';
import AddressAdd from './AddressAdd';

AddressList.propTypes = {};

const useStyle = makeStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
  },
  btn: {
    '& > span': {
      textTransform: 'capitalize',
    },
  },
}));

function AddressList(props) {
  const classes = useStyle();
  const [addressList, setAddressList] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeAddress = (data) => {
    setAddressList(data);
  };

  useEffect(() => {
    (async () => {
      try {
        const email = JSON.parse(localStorage.getItem(StorageKeys.USER)).email || '';
        const { data } = await addressApi.getAll({ email });
        setAddressList(data);
      } catch (error) {
        console.log('Failed to fetch products', error);
      }
    })();
  }, []);

  return (
    <Paper variant={0}>
      <Box padding={2}>
        <Box className={classes.header}>
          <Typography component="h2" variant="h6">
            My Address
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            className={classes.btn}
            onClick={handleClickOpen}
          >
            Add new address
          </Button>
        </Box>

        {addressList.map((address) => {
          return <AddressDetail data={address} onUpdate={handleChangeAddress} />;
        })}
      </Box>
      <Dialog open={open} onClose={handleClose} disableEscapeKeyDown>
        <DialogContent>
          <AddressAdd closeDialog={handleClose} handelSubmitSuccess={handleChangeAddress} />
        </DialogContent>
      </Dialog>
    </Paper>
  );
}

export default AddressList;
