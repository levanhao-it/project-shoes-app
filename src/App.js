import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ListPage from "./features/Product/pages/ListPage";
import ProductDetailPage from "./features/Product/pages/ProductDetailPage";

function App() {
  return (
    <div className="App">
      <Header />
      {/* <ListPage /> */}

      {/* <Register /> */}
      <ProductDetailPage />
      <Footer />
    </div>
  );
}

export default App;
