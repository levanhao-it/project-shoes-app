import { Box, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ProductList from "features/Product/components/ProductList";
import Wishlist from "features/Wishlist/components/Wishlist";
import WishlistPagination from "features/Wishlist/components/WishlistPagination";
import React from "react";

WishListPage.propTypes = {};
const useStyles = makeStyles((theme) => ({
  pagination: {
    paddingBottom: "30px",
  },
  root: {
    margin: "0 20px",
  },
}));

function WishListPage(props) {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Box>
        <Wishlist />
      </Box>
      {/* <Box className={classes.pagination}>
        <WishlistPagination />
      </Box> */}
    </Paper>
  );
}

export default WishListPage;
