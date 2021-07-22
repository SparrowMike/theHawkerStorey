import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Navbar />
          <h1>Main Component Route. See App.js</h1>
        </Route>
        <Route path="/about">
          <h1>About</h1>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
