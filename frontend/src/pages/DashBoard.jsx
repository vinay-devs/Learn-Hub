import React from "react";
import AppBarDashBoard from "../Components/AppBarDashBoard";
import CourseDetails from "../Components/CourseDetails";
import { Container, Box, Button } from "@mui/material";
import axios from "axios";

const DashBoard = () => {
  function handleCheckHeader() {
    axios.get("http://localhost:5500/user/dashboard");
  }
  return (
    <Container maxWidth="none" className="container-dashboard">
      <AppBarDashBoard />
      <Box
        component={"div"}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <CourseDetails imgUrl={"http"} courseTitle={"Web Developement"} />
        <CourseDetails imgUrl={"http"} courseTitle={"Web Developement"} />
        <CourseDetails imgUrl={"http"} courseTitle={"Web Developement"} />
        <CourseDetails imgUrl={"http"} courseTitle={"Web Developement"} />
        <CourseDetails imgUrl={"http"} courseTitle={"Web Developement"} />
        <CourseDetails imgUrl={"http"} courseTitle={"Web Developement"} />
        <Button onClick={handleCheckHeader}>Check Header</Button>
      </Box>
    </Container>
  );
};

export default DashBoard;
