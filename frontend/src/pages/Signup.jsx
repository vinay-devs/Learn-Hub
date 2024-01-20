import { useState } from "react";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import { signUp } from "../services/Auth.service";
import {
  Button,
  Container,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";

const Signup = () => {
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    userName: false,
    email: false,
    password: false,
  });

  const navigate = useNavigate();

  function handleUserNameChange(e) {
    setUsername(e.target.value);
    setError((prev) => {
      return {
        ...prev,
        userName: validator.isLength(userName, { min: 4, max: 10 }),
      };
    });
  }
  function handleEmailChange(e) {
    setEmail(e.target.value);
    setError((prev) => ({ ...prev, email: validator.isEmail(email) }));
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
    setError((prev) => ({
      ...prev,
      password: validator.isLength(password, { min: 6 }),
    }));
  }

  return (
    <>
      <Container
        sx={{ backgroundColor: "#f5f5dc", margin: "auto", minHeight: "100vh" }}
        maxWidth="false"
      >
        <div>
          <h1>SignUp</h1>
          <form
            style={{ display: "flex", flexDirection: "column", width: "50%" }}
            onSubmit={(e) => {
              e.preventDefault();
              try {
                signUp({ userName, email, password }).then((res) => {
                  if (res.status == 200) {
                    toast.success(res.data.message);
                    navigate("/login");
                  }
                });
              } catch (error) {
                toast.error("Error while calling SignUp Function");
              }
              setUsername("");
              setEmail("");
              setPassword("");
            }}
          >
            <InputLabel htmlFor="userName">Username:</InputLabel>
            {!error.userName && userName && (
              <Typography color={"red"}>InValid</Typography>
            )}
            <Input
              autoFocus={true}
              onChange={handleUserNameChange}
              error={!error.userName}
              name="userName"
              type="text"
            />

            <InputLabel htmlFor="Email">Email</InputLabel>
            {!error.email && email && (
              <Typography color={"red"}>Invalid Email</Typography>
            )}
            <Input
              type="email"
              name="email"
              onChange={handleEmailChange}
              error={!error.email}
            />
            <InputLabel htmlFor="password">Password:</InputLabel>
            {!error.password && password && (
              <Typography color={"red"}>
                Password Length must be min of 6 character
              </Typography>
            )}
            <Input
              onChange={handlePasswordChange}
              type="password"
              name="password"
              error={!error.password}
            />
            <Button
              disabled={!error.userName || !error.email || !error.password}
              variant="contained"
              type="submit"
            >
              SignUp
            </Button>
          </form>
        </div>
        {/* {response.status != 200 && <Typography>{response}</Typography>} */}
        <Button variant="contained" onClick={() => navigate("/login")}>
          Login
        </Button>
      </Container>
    </>
  );
};

export default Signup;
