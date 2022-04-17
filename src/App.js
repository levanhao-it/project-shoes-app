import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ListPage from "./features/Product/pages/ListPage";
import ProductDetailPage from "./features/Product/pages/ProductDetailPage";

import ProductFeature from "./features/Product";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import CartFeature from "./features/Cart";
import { makeStyles } from "@material-ui/styles";
import PaymentFeature from "./features/Payment";

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
          <Route path="/products" component={ProductFeature} />

          <Route path="/" component={Home} exact />
          <Route path="/cart" component={CartFeature} />
          <Route path="/payment" component={PaymentFeature} />

          <Route component={NotFound} />
        </Switch>
      </div>

      <Footer />
    </div>
  );
}

export default App;
