import React from "react";
import PropTypes from "prop-types";
import { Box } from "@material-ui/core";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import AddressList from "./components/AddressList";

AddressFeauture.propTypes = {};

function AddressFeauture(props) {
  const match = useRouteMatch();
  return (
    <Box pt={4}>
      <Switch>
        <Route path={match.url} exact component={AddressList} />
      </Switch>
    </Box>
  );
}

export default AddressFeauture;
