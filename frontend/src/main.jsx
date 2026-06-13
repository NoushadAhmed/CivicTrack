import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./index.css";

import {
  AuthProvider
} from "./context/AuthContext";

import {
  Toaster
} from "react-hot-toast";

import ErrorBoundary from "./components/ErrorBoundary";

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <ErrorBoundary>

      <AuthProvider>

        <Toaster
          position="top-right"
        />

        <App />

      </AuthProvider>

    </ErrorBoundary>

  </React.StrictMode>

);