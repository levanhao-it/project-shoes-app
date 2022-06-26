import Sidebar from "./components/Sidebar";

import { makeStyles } from "@material-ui/core";
import { Redirect, Route, Switch } from "react-router-dom";
import UserFeature from "./features/User";
import Header from "./components/Header";
import NotFound from "./components/NotFound";
import LoginFeature from "./features/Auth";
import ProductFeature from "features/Product";
import "./App.css";
import CategoryFeature from "features/Category";
import OrderFeature from "features/Order";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    marginTop: "64px",
  },
}));
function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <div className={classes.root}>
        <Header />
        <Sidebar />
        <div className={classes.content}>
          <Switch>
            <Redirect from="/home" to="/" exact />
            <Route path="/users" component={UserFeature} />
            <Route path="/categories" component={CategoryFeature} />
            <Route path="/login" component={LoginFeature} />
            <Route path="/products" component={ProductFeature} />
            <Route path="/orders" component={OrderFeature} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
