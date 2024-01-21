import { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/Auth.service";
import axios from "axios";
import validator from "validator";
import {
  Box,
  Button,
  Container,
  FormControlLabel,
  FormGroup,
  TextField,
  InputLabel,
  Switch,
  Typography,
} from "@mui/material";
import { useAuth } from "../provider/AuthProvider";
import { toast } from "react-toastify";

const Login = () => {
  const [token, setToken] = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [response, setResponse] = useState({});
  const [checkedAdmin, setCheckedAdmin] = useState(false);

  const errUsername = validator.isLength(username, { min: 4, max: 10 });
  function handleUserInputChange(e) {
    setUsername((prev) => e.target.value);
  }

  useEffect(() => {
    if (token && !response.admin) {
      navigate("/dashboard");
    }
    if (token && response.admin) {
      navigate("/admin/dashboard");
    }
  }, [token]);
  const handleSubmit = async (e) => {
    const credential = { username: username, password: password };
    const { token, isAdmin } = await login(credential, checkedAdmin);
    if (token) {
      setToken(token);
      setResponse({ admin: isAdmin });
      if (isAdmin) {
        toast.success("Succesfully Logged In As Admin");
      } else {
        toast.success("Successfully Logged In");
      }
    }
  };

  return (
    <>
      <Container
        sx={{
          backgroundColor: "#f5f5dc",
          height: "100vh",
          display: "flex",
          alignItems: "center",
        }}
        maxWidth="false"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            margin: "auto",
            width: "40%",
            border: "2px solid black",
            borderRadius: "10px",
          }}
        >
          <Box
            component={"div"}
            sx={{
              display: "flex",
              flexDirection: "column",
              rowGap: "20px",
              padding: "15px",
            }}
          >
            <Typography
              textAlign={"center"}
              variant="h1"
              fontWeight={"bold"}
              fontSize="34px"
            >
              Login
            </Typography>
            <FormGroup>
              <FormControlLabel
                label="Admin"
                control={
                  <Switch
                    checked={checkedAdmin}
                    onChange={() => {
                      setCheckedAdmin((prev) => (prev ? false : true));
                      setUsername("");
                      setPassword("");
                    }}
                  />
                }
              />
            </FormGroup>

            <TextField
              value={username}
              label={"UserName"}
              onChange={handleUserInputChange}
              type="text"
              size="small"
              error={!errUsername}
              autoFocus={true}
              name="userName"
            />
            <TextField
              value={password}
              label={"Password"}
              type="password"
              size="small"
              onChange={(e) => setPassword(e.target.value)}
              name="password"
            />
            <Button
              disabled={!errUsername}
              variant="contained"
              onClick={handleSubmit}
            >
              Login
            </Button>
            <Button
              sx={{ margin: "auto", width: "min-content" }}
              variant="contained"
              onClick={() => navigate("/signup")}
            >
              SignUp
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;
