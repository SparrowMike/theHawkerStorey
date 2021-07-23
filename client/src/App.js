import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar";
import Main from "./components/main";
import SignUp from "./components/singup";
import SignIn from "./components/singin";

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
