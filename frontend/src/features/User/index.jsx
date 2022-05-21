import { Box, Container, Grid, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import UserSidebar from './components/UserSidebar';
import AccountPage from './pages/AccountPage';
import OrderListPage from './pages/OrderListPage';
import WishListPage from './pages/WishListPage';

UserFeature.propTypes = {};

const useStyle = makeStyles((theme) => ({
  root: {
    backgroundColor: '#f7f7f7',
  },
  container: {
    padding: '80px 0',
  },
  // ml: {
  //   marginLeft: '14px',
  // },
  // mr: {
  //   marginRight: '14px',
  // },
}));

function UserFeature(props) {
  const classes = useStyle();
  const match = useRouteMatch();
  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <Grid container>
          <Hidden smDown>
            <Grid item xs={12} sm={12} md={3} lg={3} >
              <UserSidebar />
            </Grid>
          </Hidden>
          <Grid item xs={12} sm={12} md={9} lg={9} >
            <Switch>
              <Route path={`${match.url}`} exact component={AccountPage} />
              <Route path={`${match.url}/order`} exact component={OrderListPage} />
              <Route path={`${match.url}/whishList`} extact component={WishListPage} />
            </Switch>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default UserFeature;
