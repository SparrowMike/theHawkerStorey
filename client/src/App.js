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

  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <ReactQueryDevtools initialIsOpen={false} />
          <Navbar />
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
        </ThemeProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
