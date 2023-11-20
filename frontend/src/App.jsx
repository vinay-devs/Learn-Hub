import { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const [signup, setSignUp] = useState(true);
  return (
    <>
      {signup ? (
        <Signup setSignUp={setSignUp} />
      ) : (
        <Login setSignUp={setSignUp} />
      )}
    </>
  );
}

export default App;
