import {
  Box,
  Collapse,
  IconButton,
  makeStyles,
  Paper,
  TableCell,
  TableRow,
} from "@material-ui/core";
import { purple } from "@material-ui/core/colors";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import productApi from "components/api/productApi";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import useProduct from "../hooks/useProduct";
import ProductEditForm from "./ProductEditForm";

ProductItem.propTypes = {};

const columns = [
  { id: "name", label: "Name", minWidth: 300 },
  { id: "stock", label: "Stock", minWidth: 100 },
  {
    id: "price",
    label: "Price",
    minWidth: 170,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "category",
    label: "Category",
    minWidth: 170,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 170,
    align: "right",
  },
];

function ProductItem({ row }) {
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const handleAction = (id) => {
    history.push(`/products/${id}`);
  };
  const { enqueueSnackbar } = useSnackbar();

  const { product } = useProduct(row.id);

  const handleSubmit = async (values) => {
    try {
      const { status, message } = await productApi.update(row.id, values);
      setOpen(false);
      // ok then show user list
      if (status === "OK") {
        // do something here
        enqueueSnackbar("Edit product success", {
          variant: "success",
          autoHideDuration: 1000,
        });
      } else {
        enqueueSnackbar(message, { variant: "error", autoHideDuration: 1000 });
      }
    } catch (error) {
      console.log("Faied to fetch product: ", error.message);
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 1000,
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      const { status, message } = await productApi.remove(id);
      setOpen(false);
      // ok then show user list
      if (status === "OK") {
        // do something here
        enqueueSnackbar("Delete product successfully", {
          variant: "success",
          autoHideDuration: 1000,
        });
      } else {
        enqueueSnackbar(message, { variant: "error", autoHideDuration: 1000 });
      }
    } catch (error) {
      console.log("Faied to delete product: ", error.message);
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 1000,
      });
    }
  };

  return (
    <>
      <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowRightIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
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

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Paper elevation={0}>
                <ProductEditForm
                  onSubmit={handleSubmit}
                  product={product}
                  onDelete={handleDelete}
                />
              </Paper>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default ProductItem;
