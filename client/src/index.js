import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import { QueryClient } from "react-query";
// import { QueryClientProvider } from "react-query";
// import { ReactQueryDevtools } from "prop-types";

// const queryClient = new QueryClient();

ReactDOM.render(
  <Router>
    <App />
    {/* <ReactQueryDevtools /> */}
  </Router>,
  document.getElementById("root")
);
