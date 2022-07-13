import React from "react";
import PropTypes from "prop-types";
import AddressEditForm from "./AddressEditForm";
import { useSnackbar } from "notistack";
import addressApi from "api/addressApi";

AddressEdit.propTypes = {
  closeDialog: PropTypes.func,
};

function AddressEdit({ data, closeDialog }) {
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = (id, values) => {
    try {
      const fetchAddress = async () => {
        await addressApi.update(id, values);
      };

      fetchAddress();
      if (closeDialog) {
        closeDialog();
      }
      enqueueSnackbar("Edit your address successfully!", {
        variant: "success",
        autoHideDuration: 1000,
      });
    } catch (error) {
      console.log("Fail to edit your address: ", error.message);
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 1000,
      });
    }
  };

  return (
    <div>
      <AddressEditForm
        onSubmit={handleSubmit}
        data={data}
        closeDialog={closeDialog}
      />
    </div>
  );
}

export default AddressEdit;
