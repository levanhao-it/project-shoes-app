import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, makeStyles, Paper, Typography } from "@material-ui/core";
import { purple } from "@material-ui/core/colors";
import ProductEditForm from "../components/ProductEditForm";
import productApi from "components/api/productApi";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useSnackbar } from "notistack";
import useProduct from "../hooks/useProduct";

DetailPage.propTypes = {};

const useStyle = makeStyles((theme) => ({
  box: {
    padding: theme.spacing(0, 4),
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: {
    fontWeight: "bold",
  },

  button: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  },
}));

function DetailPage(props) {
  const classes = useStyle();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const {
    params: { productId },
    url,
  } = useRouteMatch();
  const { product } = useProduct(productId);

  const handleSubmit = async (values) => {
    try {
      const { status, message } = await productApi.update(productId, values);
      // ok then show user list
      if (status === "OK") {
        setTimeout(() => {
          history.push("/products");
        }, 1000);
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

  return (
    <div className={classes.box}>
      <Box className={classes.header}>
        <Typography component="h1" variant="h4" className={classes.heading}>
          Edit Product
        </Typography>
      </Box>
      <Paper elevation={0}>
        <ProductEditForm onSubmit={handleSubmit} product={product} />
      </Paper>
    </div>
  );
}

export default DetailPage;
