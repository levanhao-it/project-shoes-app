import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import UserList from './components/UserList';
import PageDetailUser from './pages/PageDetailUser';
import PageListUser from './pages/PageListUser';

UserFeature.propTypes = {};

function UserFeature(props) {
  const match = useRouteMatch();

  return (
    <Box pt={4}>
      <Switch>
        <Route path={match.url} exact component={PageListUser} />
        <Route path={`${match.url}/:UserId`} component={PageDetailUser} />
      </Switch>
    </Box>
  );
}

export default UserFeature;
