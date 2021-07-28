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
import React, { useState } from "react";

export const AuthContext = React.createContext();

function App() {
  const queryClient = new QueryClient();
  const [accessToken, setAccessToken] = useState("");
  const [user, setUser] = useState("");

  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <AuthContext.Provider accessToken={accessToken}>
          <Navbar />
          <Switch>
            <Route path="/" exact>
              <Main />
            </Route>

            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/login">
              <SignIn setUser={setUser} setAccessToken={setAccessToken} />
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
          </Switch>
        </AuthContext.Provider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
