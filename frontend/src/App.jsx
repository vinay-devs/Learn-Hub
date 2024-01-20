import Routes from "./Routes/index";
import { AuthProvider } from "./provider/AuthProvider";
import { ToastContainer } from "react-toastify";
import "./assets/css/App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthProvider>
      <Routes />
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
