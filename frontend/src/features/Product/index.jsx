import { Box } from '@material-ui/core';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import NotFound from '../../components/NotFound';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductListPage from './pages/ProductListPage';

ProductFeature.propTypes = {};

function ProductFeature(props) {
  const match = useRouteMatch();
  return (
    <Box pt={4}>
      <Switch>
        <Route path={match.url} exact component={ProductListPage} />
        <Route path={`${match.url}/:productId`} component={ProductDetailPage} exact />
        <Route component={NotFound} />
      </Switch>
    </Box>
  );
}

export default ProductFeature;
