import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { Box } from '@material-ui/core';
import ListPage from './pages/ListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import NotFound from '../../components/NotFound';

ProductFeature.propTypes = {};

function ProductFeature(props) {
  const match = useRouteMatch();
  return (
    <Box pt={4}>
      <Switch>
        <Route path={match.url} exact component={ListPage} />
        <Route path={`${match.url}/:productId`} component={ProductDetailPage} exact />
        <Route component={NotFound} />
      </Switch>
    </Box>
  );
}

export default ProductFeature;
