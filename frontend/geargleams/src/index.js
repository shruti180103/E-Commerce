import React from "react";
import { createRoot } from "react-dom/client"; // Update import statement
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./App.css";
import { Provider } from "react-redux";
import Store from "./redux/store";

// Replace ReactDOM.render with createRoot
const root = createRoot(document.getElementById("root"));

// Render your application inside the root
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
