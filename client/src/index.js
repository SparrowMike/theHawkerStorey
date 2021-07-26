import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";


const queryClient = new QueryClient();

ReactDOM.render(
  <Router>
     <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools />
    </QueryClientProvider>
  </Router>,
  document.getElementById("root")
);
