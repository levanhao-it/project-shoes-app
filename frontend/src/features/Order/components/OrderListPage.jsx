import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, makeStyles, Typography } from "@material-ui/core";
import OrderDetail from "./OrderDetail";
import orderApi from "api/orderApi";
import StorageKeys from "constant/storage-keys";

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
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const email =
          JSON.parse(localStorage.getItem(StorageKeys.USER)).email || "";
        const { data } = await orderApi.getAll({ email });
        setOrderList(data);
      } catch (error) {
        console.log("Failed to fetch products", error);
      }
    })();
  }, []);

  return (
    <Box className={classes.root}>
      <Typography component="h2" variant="h4" className={classes.heading}>
        My orders
      </Typography>
      {orderList.map((order) => (
        <OrderDetail data={order} />
      ))}
    </Box>
  );
}

export default OrderListPage;
