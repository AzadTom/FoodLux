import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { ThemeProvider } from "./components/Theme/ThemeProvider.jsx";
import { Toaster } from "./components/ui/toast.jsx";
import { QueryClientProvider,QueryClient } from "@tanstack/react-query";

const queryClient  = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <App />
            <Toaster />
          </ThemeProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
