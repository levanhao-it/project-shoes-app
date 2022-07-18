import React from "react";
import PropTypes from "prop-types";
import { Box, Container, Grid, Typography } from "@material-ui/core";
import DeliveryOrder from "features/Delivery/components/DeliveryOrder";
import CheckoutDetail from "../components/CheckoutDetail";
import ButtonActive from "components/component-custom/ButtonActive";

CheckoutPage.propTypes = {};

function CheckoutPage(props) {
  const handleClick = () => {};
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={8}>
          <CheckoutDetail />
          <Box mt={4}>
            <ButtonActive content="Create new order" onClick={handleClick} />
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={4}>
          <DeliveryOrder />
        </Grid>
      </Grid>
    </Container>
  );
}

export default CheckoutPage;
