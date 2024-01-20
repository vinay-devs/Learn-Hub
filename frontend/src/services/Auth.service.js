import axios from "axios";
const baseURL = "http://localhost:5500";

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
      return res;
    })
    .catch((err) => err.response);
};

const login = (credential, isAdmin) => {
  if (isAdmin) {
    return axios.post(baseURL + "/admin/login", { credential }).then((res) => {
      addToken(res.data.token);
      return res.data;
    });
  } else {
    return axios.post(baseURL + "/user/login", { credential }).then((res) => {
      if (res.status == 200) {
        addToken(res.data.token);
        return res.data;
      } else {
        return res;
      }
    });
  }
};

export default { addToken, getToken };
export { signUp, login };
