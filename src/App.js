import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SignInFeature from "./features/SignIn";

function App() {
  return (
    <div className="App">
      {/* <Header /> */}
      <SignInFeature />
      {/* <Footer /> */}
    </div>
  );
}

export default App;
