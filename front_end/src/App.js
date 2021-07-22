import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar";
import Main from "./components/main";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Navbar />
          {/* <h1>Hi There! 🙋🏻‍♂️</h1> */}
          <Main />
        </Route>
        <Route path="/about">
          <h1>About</h1>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
