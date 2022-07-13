import React from "react";
import { Box } from "@material-ui/core";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import WishlistPage from "./components/WishlistPage";

WishlistFeauture.propTypes = {};

function WishlistFeauture(props) {
  const match = useRouteMatch();
  return (
    <Box pt={4}>
      <Switch>
        <Route path={match.url} exact component={WishlistPage} />
      </Switch>
    </Box>
  );
}

export default WishlistFeauture;
