import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { purple } from "@material-ui/core/colors";
import { Box, Button, makeStyles, Paper, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import orderApi from "components/api/orderApi";
import AddIcon from "@material-ui/icons/Add";
import OrderList from "../components/OrderList";

ListOrderPage.propTypes = {};
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

function ListOrderPage(props) {
  const classes = useStyle();
  const [orders, setOrders] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await orderApi.getAll();
      setOrders(data);
    };

    fetchProduct();
  }, []);

  const handleAddProduct = () => {
    history.push(`/orders/add`);
  };
  return (
    <div className={classes.box}>
      <Box className={classes.header}>
        <Typography component="h1" variant="h4" className={classes.heading}>
          Orders
        </Typography>
        <Button
          variant="contained"
          className={classes.button}
          startIcon={<AddIcon />}
          onClick={handleAddProduct}
        >
          Add
        </Button>
      </Box>
      {/* <Paper elevation={0}>
        <ProductFilters />
      </Paper> */}
      <OrderList data={orders} />
    </div>
  );
}

export default ListOrderPage;
