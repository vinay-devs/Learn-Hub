import { useReducer } from "react";
import reducer from "../reducer/sharedReducer";

const Login = ({ setSignUp }) => {
  const [state, dispatch] = useReducer(reducer, {
    userName: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: name.toUpperCase(), payload: value });
  };
  return (
    <>
      <h1>Login</h1>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          width: "50%",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="username">UserName</label>
        <input onChange={handleChange} type="text" name="userName" />
        <label htmlFor="password">Password</label>
        <input type="text" name="password" />
        <button type="submit">Login</button>
      </form>
      <button onClick={() => setSignUp(true)}>SignUp</button>
    </>
  );
};

export default Login;
