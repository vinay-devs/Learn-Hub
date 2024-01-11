import axios from "axios";
import { useNavigate } from "react-router-dom";
const baseURL = "http://localhost:5500";

const navigateFn = () => {
  const navigate = useNavigate();
  return navigate;
};

const addToken = (token) => {
  return localStorage.setItem("user", token);
};

const getToken = () => {
  return localStorage.getItem("user");
};

const signUp = (credential) => {
  return axios
    .post(baseURL + "/user/signup", { credential })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => err.response);
};

const login = (credential, isAdmin) => {
  if (isAdmin) {
    return axios.post(baseURL + "/admin/login", { credential }).then((res) => {
      console.log(res);
      addToken(res);
    });
  } else {
    return axios.post(baseURL + "/user/login", { credential }).then((res) => {
      if (res.status == 200) {
        addToken(res.data.token);
        return res.status;
      } else {
        return "Status is not 200";
      }
    });
  }
};

export default { addToken, getToken };
export { signUp, login };
