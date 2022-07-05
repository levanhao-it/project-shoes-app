import React from "react";
import PropTypes from "prop-types";
import { Box, Grid } from "@material-ui/core";
import Product from "features/Product/components/Product";
import { useSelector } from "react-redux";

Wishlist.propTypes = {};

function Wishlist(props) {
  const wishList = useSelector((state) => state.wishList.current);
  return (
    <Box paddingBottom={2}>
      <Grid container>
        {wishList.map((item) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Product data={item.product} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default Wishlist;
