import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
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
