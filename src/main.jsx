import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/app";
import "./style/general.scss";
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer/>
    <BrowserRouter>
    <App />
    </BrowserRouter> 
  </StrictMode>
);
