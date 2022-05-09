import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import UserSidebar from './components/UserSidebar';
import AccountPage from './pages/AccountPage';
import OrderListPage from './pages/OrderListPage';
import WishListPage from './pages/WishListPage';

UserFeature.propTypes = {
  
};

const useStyle = makeStyles((theme) => ({
  root: {
    backgroundColor: '#f7f7f7'
  },
  container: {
    width:'1200px',
    margin: "auto",
    padding:'80px 0'
  }
}))

function UserFeature(props) {
  const classes = useStyle();
  const match = useRouteMatch()
  return (
    <div className={classes.root}>
      <Box className={classes.container}>
        <Grid container spacing={6}>
          <Grid item xs={3}>
            <UserSidebar/>
          </Grid>
          <Grid item xs={9}>
            <Switch>
              <Route path={`${match.url}`} exact component={AccountPage}/>
              <Route path={`${match.url}/order`} exact component={OrderListPage}/>
              <Route path={`${match.url}/whishList`} extact component={WishListPage}/>
            </Switch>
          </Grid>
        </Grid>

      </Box>

    </div>
  );
}

export default UserFeature;