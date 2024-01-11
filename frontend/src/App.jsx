import { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Routes from "./Routes/index";
import { AuthProvider } from "./provider/AuthProvider";
import "./assets/css/App.css";

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
