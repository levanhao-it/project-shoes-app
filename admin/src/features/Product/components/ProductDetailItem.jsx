import {
  Box,
  Chip,
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
import EditProductDetailPage from "../pages/EditProductDeatilPage";
import ProductDetailEditForm from "./ProductDetailEditForm";

ProductDetailItem.propTypes = {};

const columns = [
  { id: "salePrice", label: "Sale price", minWidth: 100 },
  {
    id: "quantity",
    label: "Quantity",
    minWidth: 170,
  },
  {
    id: "size",
    label: "Size",
    minWidth: 170,
  },

  {
    id: "color",
    label: "Color",
    minWidth: 170,
  },
  {
    id: "status",
    label: "status",
    minWidth: 170,
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 170,
    align: "right",
  },
];

function ProductDetailItem({ row }) {
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

        <TableCell>{row.salePrice}</TableCell>
        <TableCell>{row.quantity}</TableCell>
        <TableCell>{row.size}</TableCell>
        <TableCell>{row.color}</TableCell>
        <TableCell>
          {row.status ? (
            <Chip label="PUBLIC" color="primary" />
          ) : (
            <Chip label="PRIVATE" color="secondary" />
          )}
        </TableCell>

        <TableCell align="right">
          <IconButton size="medium" onClick={() => handleAction(row.id)}>
            <EditIcon fontSize="inherit" />
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Paper elevation={0}>
                <ProductDetailEditForm
                  onSubmit={handleSubmit}
                  values={row}
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

export default ProductDetailItem;
