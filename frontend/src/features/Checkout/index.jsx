import React from "react";
import PropTypes from "prop-types";
import { Box } from "@material-ui/core";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import NotFound from "components/NotFound";
import DeliveryPage from "./pages/DeliveryPage";
import CheckoutPage from "./pages/CheckoutPage";

CheckoutFeature.propTypes = {};

function CheckoutFeature(props) {
  const match = useRouteMatch();
  return (
    <Box>
      <Switch>
        <Route path={`${match.url}/delivery`} exact component={DeliveryPage} />
        <Route path={`${match.url}/bill`} component={CheckoutPage} exact />
        <Route component={NotFound} />
      </Switch>
    </Box>
  );
}

export default CheckoutFeature;
