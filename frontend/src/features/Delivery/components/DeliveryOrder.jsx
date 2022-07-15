import React from "react";
import PropTypes from "prop-types";
import { Box, makeStyles, Typography } from "@material-ui/core";
import OrderSumary from "components/OrderSumary";
import DeliveryOrderItem from "./DeliveryOrderItem";

DeliveryOrder.propTypes = {};

const useStyle = makeStyles((theme) => ({
  root: {
    marginTop: "40px",
  },
  headingTitle: {
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: "24px",
  },
  containerOrder: {
    padding: "40px 0",
  },
}));

function DeliveryOrder(props) {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <OrderSumary />
      <Box className={classes.containerOrder}>
        <Typography variant="h4" className={classes.headingTitle}>
          Order details
        </Typography>
        <DeliveryOrderItem />
      </Box>
    </div>
  );
}

export default DeliveryOrder;
