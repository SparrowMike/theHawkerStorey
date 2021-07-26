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
        <Navbar />
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/login">
          <SignIn />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
