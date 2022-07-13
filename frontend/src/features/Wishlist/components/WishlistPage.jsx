import React from "react";
import PropTypes from "prop-types";
import { Box, Grid, Paper } from "@material-ui/core";
import Product from "features/Product/components/Product";
import { useSelector } from "react-redux";

WishlistPage.propTypes = {};

function WishlistPage(props) {
  const wishList = useSelector((state) => state.wishList.current);
  return (
    <Paper variant={0}>
      <Box padding={2}>
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
    </Paper>
  );
}

export default WishlistPage;
