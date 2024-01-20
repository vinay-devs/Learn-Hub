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
  Input,
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
    e.preventDefault();
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
        sx={{ backgroundColor: "#f5f5dc", margin: 0, minHeight: "100vh" }}
        maxWidth="false"
      >
        <Box component={"div"} sx={{ display: "flex", columnGap: "80px" }}>
          <Typography variant="h1" fontSize="34px">
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
                    setUsername((prev) => "");
                    setPassword((prev) => "");
                  }}
                />
              }
            />
          </FormGroup>
        </Box>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            rowGap: "10px",
          }}
          onSubmit={handleSubmit}
        >
          <InputLabel required htmlFor="username">
            UserName
          </InputLabel>

          <Typography color={"red"}>
            {!errUsername && username && "InValid"}
          </Typography>
          <Input
            value={username}
            onChange={handleUserInputChange}
            type="text"
            error={!errUsername}
            autoFocus={true}
            name="userName"
          />
          <InputLabel required htmlFor="password">
            Password
          </InputLabel>
          <Input
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
          />
          <Button disabled={!errUsername} variant="contained" type="submit">
            Login
          </Button>
        </form>
        <Button variant="contained" onClick={() => navigate("/signup")}>
          SignUp
        </Button>
      </Container>
    </>
  );
};

export default Login;
