import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import ListPage from './features/Product/pages/ListPage';

function App() {
  return (
    <div className="App">
      <Header />
      <ListPage />

      {/* <Register /> */}
      <Footer />
    </div>
  );
}

export default App;
