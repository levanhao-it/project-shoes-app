import React from "react";
import PropTypes from "prop-types";
import { Box, makeStyles, Typography } from "@material-ui/core";
import OrderDetail from "./OrderDetail";

OrderListPage.propTypes = {};

const useStyle = makeStyles((theme) => ({
  root: {
    margin: "0 20px",
  },
  heading: {
    textAlign: "center",
    textTransform: "uppercase",
    marginBottom: theme.spacing(4),
  },
}));

function OrderListPage(props) {
  const classes = useStyle();
  return (
    <Box className={classes.root}>
      <Typography component="h2" variant="h4" className={classes.heading}>
        My orders
      </Typography>
      <OrderDetail />
      <OrderDetail />
    </Box>
  );
}

export default OrderListPage;
