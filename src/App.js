import { makeStyles } from "@material-ui/styles";
import UserFeature from "features/User";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import CartFeature from "./features/Cart";
import PaymentFeature from "./features/Payment";
import ProductFeature from "./features/Product";

const useStyle = makeStyles((theme) => ({
  root: {
    marginTop: "180px",
  },
}));

function App() {
  const classes = useStyle();
  return (
    <div className="App">
      <Header />

      <div className={classes.root}>
        <Switch>
          <Redirect from="/home" to="/" exact />
          <Route path="/products" component={ProductFeature} exact />

          <Route path="/" component={Home} exact />
          <Route path="/cart" component={CartFeature} />
          <Route path="/payment" component={PaymentFeature} />
          <Route path="/user" component={UserFeature} />

          <Route component={NotFound} />
        </Switch>
      </div>

      <Footer />
    </div>
  );
}

export default App;
