import React, { useState, useEffect } from "react";
import qs from "qs";
import { createBrowserHistory } from "history";
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

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

export const AuthContext = React.createContext();

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#000814",
    },
    secondary: {
      main: "#e63946",
    },
  },
  typography: {
    fontFamily: [
      "Nunito",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
});

function App() {
  const queryClient = new QueryClient();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userState, setUserState] = useState({
    accessToken: "",
    user_id: "",
    username: "",
    email: "",
    posts_history: [],
    loggedIn: false,
  });

<<<<<<< HEAD
  console.log(userState);

  const history = createBrowserHistory();

  // useEffect(()=> {
  //   userState.logged_in ?
  // })

  // useEffect(() => {
  //   const filterParams = history.location.search.substr(1);
  //   console.log(filterParams);
  //   const filtersFromParams = qs.parse(filterParams);
  //   console.log(filtersFromParams);

  //   history.push(userState);
  // }, [history, userState]);

=======
>>>>>>> master
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ThemeProvider theme={theme}>
          <AuthContext.Provider userState={userState}>
            <ReactQueryDevtools initialIsOpen={false} />
            <Navbar
              userState={userState}
              setUserState={setUserState}
              loggedIn={loggedIn}
            />
            <Switch>
              <Route path="/" exact>
                <Main />
              </Route>

              <Route path="/signup">
                <SignUp />
              </Route>
              <Route path="/login">
                <SignIn setUserState={setUserState} setLoggedIn={setLoggedIn} />
              </Route>
              <Route path="/users/:id">
                <UserProfile userState={userState} />
              </Route>

              <Route path="/:centreName/:stall">
                <HawkerStallDisplay />
              </Route>
              <Route path="/:centreName/">
                <HawkerCentreDisplay />
              </Route>
            </Switch>
          </AuthContext.Provider>
        </ThemeProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
