import { useReducer, useState } from "react";
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

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [response, setResponse] = useState("");
  const [checkedAdmin, setCheckedAdmin] = useState(false);

  // const login = async (credential) => {
  //   return axios.post("/login", { credential }).then((res) => {
  //     return setResponse(res);
  //   });
  // };
  const errUsername = validator.isLength(username, { min: 4, max: 10 });
  function handleUserInputChange(e) {
    setUsername((prev) => e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const credential = { username: username, password: password };
    const resStatus = await login(credential, checkedAdmin);
    if (resStatus == 200) {
      navigate("/dashboard");
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
