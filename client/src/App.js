import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "prop-types";
import HawkerCentre from "./data/hawkerCentre";

function App() {
  const queryClient = new QueryClient();

  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <HawkerCentre />
        <Switch>
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
      </QueryClientProvider>
    </Router>
  );
}

export default App;
