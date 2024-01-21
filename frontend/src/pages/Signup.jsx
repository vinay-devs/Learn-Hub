import { useState } from "react";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import { signUp } from "../services/Auth.service";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
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
        sx={{
          backgroundColor: "#f5f5dc",
          margin: "auto",
          height: "100vh",
        }}
        maxWidth="false"
      >
        <Box
          sx={{
            display: "flex",
            height: "inherit",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "30%",
              rowGap: "10px",
              margin: "auto",
              padding: "30px",
              border: "2px solid black",
              borderRadius: "10px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h3" textAlign={"center"}>
              SignUp
            </Typography>
            <TextField
              label="UserName:"
              autoFocus={true}
              onChange={handleUserNameChange}
              error={!error.userName}
              name="userName"
              size="small"
              fullWidth
              type="text"
            />

            <TextField
              label="Email:"
              type="email"
              name="email"
              size="small"
              fullWidth
              onChange={handleEmailChange}
              error={!error.email}
            />

            <TextField
              label="Password:"
              onChange={handlePasswordChange}
              type="password"
              name="password"
              fullWidth
              size="small"
              error={!error.password}
            />
            <Button
              sx={{ width: "100%" }}
              disabled={!error.userName || !error.email || !error.password}
              variant="contained"
              onClick={() => {
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
              SignUp
            </Button>
            <Button variant="contained" onClick={() => navigate("/login")}>
              Login
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Signup;
