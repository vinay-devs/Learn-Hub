import { Container, Box, Typography, Button } from "@mui/material";
import CourseImage from "../assets/images/course.jpg";
import React from "react";
//480 × 270 px
const CourseDetails = ({ courseTitle }) => {
  return (
    <Box
      sx={{
        padding: "10px",
        border: "2px solid black",
        borderRadius: "10px",
        width: "min-content",
        boxShadow: 6,
        marginTop: "15px",
        backgroundColor: "#800020",
      }}
    >
      <img
        src={CourseImage}
        style={{
          height: "140px",
          width: "240px",
          margin: "5px",
        }}
        alt="courseImage"
      />
      <Box
        component={"div"}
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          backgroundColor: "#800020",
        }}
      >
        <Typography
          sx={{ backgroundColor: "#800020", color: "white" }}
          textAlign={"center"}
        >
          {courseTitle}
        </Typography>
        <Button
          sx={{ backgroundColor: "red" }}
          size="small"
          variant="contained"
        >
          Buy Now
        </Button>
      </Box>
    </Box>
  );
};

export default CourseDetails;
