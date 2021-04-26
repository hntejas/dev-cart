import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { DataContextProvider, DataContext } from "./store/data/dataContext";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <DataContextProvider>
      <Router>
        <App />
      </Router>
    </DataContextProvider>
  </StrictMode>,
  rootElement
);
