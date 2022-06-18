import React from "react";
import PropTypes from "prop-types";
import { Box, makeStyles } from "@material-ui/core";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { Router } from "@material-ui/icons";
import ListPage from "./pages/ListPage";
import DetailPage from "./pages/DetailPage";

ProductFeature.propTypes = {};

const useStyle = makeStyles((theme) => ({
  box: {
    padding: theme.spacing(8, 0),
    backgroundColor: "#f9fafc",
  },
}));

function ProductFeature(props) {
  const match = useRouteMatch();
  const classes = useStyle();

  return (
    <Box className={classes.box}>
      <Switch>
        <Route path={match.url} component={ListPage} />
        <Route path={`${match.url}/:productId`} component={DetailPage} />
      </Switch>
    </Box>
  );
}

export default ProductFeature;
