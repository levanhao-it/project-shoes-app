import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, makeStyles, Paper, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import queryString from "query-string";
import { useHistory, useLocation } from "react-router-dom";
import ProductFilters from "../components/ProductFilters";
import { purple } from "@material-ui/core/colors";
import ProductList from "../components/ProductList";
import productApi from "components/api/productApi";

ListPage.propTypes = {};

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

function ListPage(props) {
  const classes = useStyle();
  const [productList, setProductList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await productApi.getAll({ page: 1, size: 5 });
      setProductList(data.products);
    };

    fetchProduct();
  }, []);

  const handleAddProduct = () => {
    history.push("/products/add");
  };

  return (
    <div className={classes.box}>
      <Box className={classes.header}>
        <Typography component="h1" variant="h4" className={classes.heading}>
          Products
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
      <Paper elevation={0}>
        <ProductFilters />
      </Paper>
      <ProductList data={productList} />
    </div>
  );
}

export default ListPage;
