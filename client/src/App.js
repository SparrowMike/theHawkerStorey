import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import HawkerStallDisplay from "./components/HawkerStallDisplay";
import HawkerCentreDisplay from "./components/HawkerCentreDisplay";
import UserProfile from "./components/UserProfile";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

function App() {
  const queryClient = new QueryClient();

  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Navbar />
        <Switch>
          <Route path="/" exact>
            <Main />
          </Route>

          <Route path="/users/:id">
          <UserProfile />
          </Route>
          
          <Route path="/:centreName/:stall">
            <HawkerStallDisplay />
          </Route>
          <Route path="/:centreName/">
            <HawkerCentreDisplay />
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
