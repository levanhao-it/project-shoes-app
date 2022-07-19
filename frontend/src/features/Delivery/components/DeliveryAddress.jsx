import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import AirportShuttleOutlinedIcon from "@material-ui/icons/AirportShuttleOutlined";
import StoreMallDirectoryOutlinedIcon from "@material-ui/icons/StoreMallDirectoryOutlined";
import InputField from "components/form-controls/InputField";
import ButtonActive from "components/component-custom/ButtonActive";
import DeliveryOption from "./DeliveryOption";
import addressApi from "api/addressApi";
import StorageKeys from "constant/storage-keys";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AddIcon from "@material-ui/icons/Add";
import AddressDelete from "features/Address/components/AddressDelete";
import AddressEdit from "features/Address/components/AddressEdit";
import AddressAdd from "features/Address/components/AddressAdd";
import CheckCircleSharpIcon from "@material-ui/icons/CheckCircleSharp";
import { useSnackbar } from "notistack";

DeliveryAddress.propTypes = {};

const useStyle = makeStyles((theme) => ({
  headingTitle: {
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: "26px",
  },
  subHeading: {
    fontSize: "16px",
  },
  iconDelivery: {
    fontSize: "20px",
  },
  boxAddress: {
    minHeight: "140px",
    border: "2px solid #ccc",
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    cursor: "pointer",
  },

  boxAddressActive: {
    minHeight: "140px",
    border: "2px solid #000",
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "relative",
    cursor: "pointer",
  },
  nameAddress: {
    fontWeight: "bold",
  },
  btnAddress: {
    "& > span": {
      textTransform: "capitalize",
      fontWeight: "bold",
      textDecoration: "underline",
    },

    "& > span:hover": {
      backgroundColor: "#000",
      color: "#fff",
    },
  },
  iconActive: {
    position: "absolute",
    fontSize: "32px",
    right: "-12px",
    color: "#000",
    top: "-10px",
  },
}));

const MODE = {
  ADD: "add",
  DELETE: "delete",
  UPDATE: "update",
};

function DeliveryAddress(props) {
  const classes = useStyle();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.ADD);
  const [addressList, setAddressList] = useState([]);
  const [address, setAddress] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    (async () => {
      try {
        const email =
          JSON.parse(localStorage.getItem(StorageKeys.USER)).email || "";
        const { data } = await addressApi.getAll({ email });
        setAddressList(data);
        const addressActive = data.find((x) => x.defaultAddress);
        setAddress(addressActive);
      } catch (error) {
        console.log("Failed to fetch products", error);
      }
    })();
  }, []);

  const handleSubmit = async (values) => {
    console.log(values);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickAdd = () => {
    setMode(MODE.ADD);
    handleClickOpen();
  };

  const handleClickEdit = (address, e) => {
    e.stopPropagation();
    setMode(MODE.UPDATE);
    setAddress(address);
    handleClickOpen();
  };

  const handleClickDelete = (e) => {
    e.stopPropagation();
    setMode(MODE.DELETE);
    handleClickOpen();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handelSubmitSuccess = (data) => {
    setAddressList(data);
  };

  const handleChangeDefault = async (address) => {
    try {
      const values = {
        defaultAddress: true,
        email: JSON.parse(localStorage.getItem(StorageKeys.USER)).email || "",
      };

      await addressApi.update(address.id, values);

      const email =
        JSON.parse(localStorage.getItem(StorageKeys.USER)).email || "";
      const { data } = await addressApi.getAll({ email });

      setAddressList(data);
      setAddress(address);
      enqueueSnackbar("Set default for your address successfully!", {
        variant: "success",
        autoHideDuration: 1000,
      });
    } catch (error) {
      console.log("Fail to set default for your address: ", error.message);
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 1000,
      });
    }
  };

  return (
    <>
      <Box mt={4}>
        <Typography variant="h3" className={classes.headingTitle}>
          Shipping Adrress
        </Typography>
        <Box mt={4}>
          <Grid container spacing={2}>
            {addressList.map((address) => (
              <Grid item xs={12} sm={12} md={6} lg={6} key={address.id}>
                <Box
                  className={
                    address.defaultAddress
                      ? classes.boxAddressActive
                      : classes.boxAddress
                  }
                  onClick={() => handleChangeDefault(address)}
                >
                  {address.defaultAddress && (
                    <CheckCircleSharpIcon className={classes.iconActive} />
                  )}
                  <Typography className={classes.nameAddress}>
                    {address.fullName}
                  </Typography>
                  <Box>
                    <Typography>{address.address}</Typography>
                    <Typography>{address.phoneNumber}</Typography>
                  </Box>

                  <Box>
                    <Button
                      size="small"
                      className={classes.btnAddress}
                      onClick={(e) => handleClickEdit(address, e)}
                    >
                      Edit
                    </Button>
                    {!address.defaultAddress && (
                      <Button
                        size="small"
                        className={classes.btnAddress}
                        onClick={(e) => handleClickDelete(e)}
                      >
                        Remove
                      </Button>
                    )}
                  </Box>
                </Box>
              </Grid>
            ))}

            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Box className={classes.boxAddress}>
                <Typography>New address</Typography>
                <Box>
                  <IconButton aria-label="delete" onClick={handleClickAdd}>
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Box mt={4}>
        <Typography variant="h3" className={classes.headingTitle}>
          Delivery options
        </Typography>

        <DeliveryOption
          titleDelivery="Standard Delivery"
          descDelivery="Enter your address to see when you'll get your order"
          icon={<AirportShuttleOutlinedIcon className={classes.iconDelivery} />}
          active
        />
        <DeliveryOption
          titleDelivery="Pick up a order at the store"
          descDelivery="Pay now and find a store near you"
          icon={
            <StoreMallDirectoryOutlinedIcon className={classes.iconDelivery} />
          }
        />
      </Box>

      <ButtonActive
        content="Review and pay"
        widthBtn={matches ? "100%" : "50%"}
        onClick={handleSubmit}
      />

      <Dialog open={open} onClose={handleClose} disableEscapeKeyDown>
        <DialogContent>
          {mode === MODE.UPDATE && (
            <>
              <AddressEdit
                data={address}
                closeDialog={handleClose}
                handelSubmitSuccess={handelSubmitSuccess}
              />
            </>
          )}

          {mode === MODE.DELETE && (
            <>
              <AddressDelete
                data={address}
                closeDialog={handleClose}
                handelSubmitSuccess={handelSubmitSuccess}
              />
            </>
          )}

          {mode === MODE.ADD && (
            <>
              <AddressAdd
                closeDialog={handleClose}
                handelSubmitSuccess={handelSubmitSuccess}
              />
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DeliveryAddress;
