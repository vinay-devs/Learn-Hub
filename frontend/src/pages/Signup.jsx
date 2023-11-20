import { useReducer, useState } from "react";
import reducer from "../reducer/sharedReducer";
import validator from "validator";

const Signup = ({ setSignUp }) => {
  const [state, dispatch] = useReducer(reducer, {
    userName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({
      userName: !validator.isLength(state.userName, { min: 4, max: 10 }),
      email: !validator.isEmail(state.email),
      password: !validator.isLength(state.password, { min: 6 }),
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: name.toUpperCase(), payload: value });
  };
  return (
    <>
      <div>
        <h1>SignUp</h1>
        <form
          style={{ display: "flex", flexDirection: "column", width: "50%" }}
          onSubmit={handleSubmit}
        >
          <label htmlFor="UserName">Username:</label>
          <input onChange={handleChange} name="userName" type="text" />
          {error.userName && (
            <span>UserName length must be from 4 to 10 character</span>
          )}
          <label htmlFor="Email">Email</label>
          <input type="email" name="email" onChange={handleChange} />
          {error.email && <span>Check your Email Again</span>}
          <label htmlFor="password">Password:</label>
          <input onChange={handleChange} type="password" name="password" />
          {error.password && (
            <span>Password Length must be min of 6 character</span>
          )}
          <button type="submit">SignUp</button>
        </form>
      </div>
      <button onClick={() => setSignUp(false)}>Login</button>
    </>
  );
};

export default Signup;
