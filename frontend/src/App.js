import { Collapse, Fade, makeStyles } from "@material-ui/core";
import { WIDTH_HEADER } from "constant";
import UserFeature from "features/User";
import { useEffect, useState } from "react";
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
    [theme.breakpoints.down("sm")]: {
      marginTop: "90px",
    },
  },
}));

function App() {
  const classes = useStyle();
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = (e) => {
    console.log(window.pageYOffset);
    if (window.pageYOffset > WIDTH_HEADER && window.pageYOffset > lastScrollY) {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }

    setLastScrollY(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="App">
      <Collapse in={showHeader}>
        <Header />
      </Collapse>

      <div className={classes.root}>
        <Switch>
          <Redirect from="/home" to="/" exact />
          <Route path="/products" component={ProductFeature} />

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
