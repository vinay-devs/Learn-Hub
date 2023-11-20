import { useState } from "react";
import axios from "axios";

const [token, setToken] = useState;

const addToken = (token) => {
  setToken(token);
  localStorage.setItem("user", token);
};

const getToken = () => {
  localStorage.getItem("user");
};

const signUp = (credential) => {
  axios.post("/signup", { credential }).then((res) => addToken(res));
};

const login = (credential) => {
  axios.post(
    "/login",
    { credential }.then((res) => addToken(res))
  );
};

export default { addToken, getToken, signUp, login };
