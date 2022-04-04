import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import SignInFeature from './features/SignIn';
import Register from './features/Auth/components/Register';

function App() {
  return (
    <div className="App">
      <Header />
      <SignInFeature />
      <Footer />
    </div>
  );
}

export default App;
