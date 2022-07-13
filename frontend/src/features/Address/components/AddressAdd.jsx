import React from "react";
import PropTypes from "prop-types";
import AddressAddForm from "./AddressAddForm";
import { useSnackbar } from "notistack";
import addressApi from "api/addressApi";

AddressAdd.propTypes = {
  closeDialog: PropTypes.func,
};

function AddressAdd({ closeDialog }) {
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = (values) => {
    try {
      const fetchAddress = async () => {
        await addressApi.add(values);
      };

      fetchAddress();
      if (closeDialog) {
        closeDialog();
      }
      enqueueSnackbar("Add your address successfully!", {
        variant: "success",
        autoHideDuration: 1000,
      });
    } catch (error) {
      console.log("Fail to add your address: ", error.message);
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 1000,
      });
    }
  };
  return (
    <div>
      <AddressAddForm onSubmit={handleSubmit} closeDialog={closeDialog} />
    </div>
  );
}

export default AddressAdd;
