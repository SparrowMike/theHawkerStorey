import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Navbar />
          <Main />
        </Route>
        <Route path="/signup">
          <Navbar />
          <SignUp />
        </Route>
        <Route path="/login">
          <Navbar />
          <SignIn />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
