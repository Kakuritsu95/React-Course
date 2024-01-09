import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App-v2";
// import { Star } from "./Star";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <Star maxVote={10} />  */}
  </React.StrictMode>
);
