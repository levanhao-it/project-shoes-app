import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import { IconButton, TableCell, TableRow } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

OrderItem.propTypes = {};

const columns = [
  { id: "id", label: "Id", minWidth: 100 },
  { id: "email", label: "Email", minWidth: 100 },
  {
    id: "quantityItem",
    label: "Quanity Item",
    minWidth: 170,
  },
  {
    id: "total",
    label: "Total",
    minWidth: 170,
  },
  {
    id: "subtotal",
    label: "Sub Total",
    minWidth: 170,
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 50,
    align: "right",
  },
];

function OrderItem({ row }) {
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const handleAction = (id) => {
    history.push(`/products/${id}`);
  };
  const { enqueueSnackbar } = useSnackbar();

  // const handleSubmit = async (values) => {
  //   try {
  //     const { status, message } = await productApi.update(row.id, values);
  //     setOpen(false);
  //     // ok then show user list
  //     if (status === "OK") {
  //       // do something here
  //       enqueueSnackbar("Edit product success", {
  //         variant: "success",
  //         autoHideDuration: 1000,
  //       });
  //     } else {
  //       enqueueSnackbar(message, { variant: "error", autoHideDuration: 1000 });
  //     }
  //   } catch (error) {
  //     console.log("Faied to fetch product: ", error.message);
  //     enqueueSnackbar(error.message, {
  //       variant: "error",
  //       autoHideDuration: 1000,
  //     });
  //   }
  // };

  // const handleDelete = async (id) => {
  //   try {
  //     const { status, message } = await productApi.remove(id);
  //     setOpen(false);
  //     // ok then show user list
  //     if (status === "OK") {
  //       // do something here
  //       enqueueSnackbar("Delete product successfully", {
  //         variant: "success",
  //         autoHideDuration: 1000,
  //       });
  //     } else {
  //       enqueueSnackbar(message, { variant: "error", autoHideDuration: 1000 });
  //     }
  //   } catch (error) {
  //     console.log("Faied to delete product: ", error.message);
  //     enqueueSnackbar(error.message, {
  //       variant: "error",
  //       autoHideDuration: 1000,
  //     });
  //   }
  // };

  return (
    <>
      <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
        {columns.map((column) => {
          const value = row[column.id];
          return (
            <TableCell key={column.id} align={column.align}>
              {column.id === "actions" ? (
                <IconButton size="medium" onClick={() => handleAction(row.id)}>
                  <EditIcon fontSize="inherit" />
                </IconButton>
              ) : (
                value
              )}
            </TableCell>
          );
        })}
      </TableRow>
    </>
  );
}

export default OrderItem;
