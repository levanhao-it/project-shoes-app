import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import ListPage from './features/Product/pages/ListPage';
import ProductDetailPage from './features/Product/pages/ProductDetailPage';

import ProductFeature from './features/Product';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import NotFound from './components/NotFound';
import Home from './components/Home';
import CartFeature from './features/Cart';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Redirect from="/home" to="/" exact />
        <Route path="/products" component={ProductFeature} />

        <Route path="/" component={Home} exact />
        <Route path="/cart" component={CartFeature} />

        <Route component={NotFound} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
