import { Container, Box, Typography, Button, Modal } from "@mui/material";
import CourseImage from "../assets/images/course.jpg";
import React, { useState } from "react";
import { useAuth } from "../provider/AuthProvider";
import { addToPurchased, deleteFromPurchased } from "../services/userApi";
import { toast } from "react-toastify";

const CourseDetails = ({ setUserData, course, setPurchased, allCourses }) => {
  const [token, _] = useAuth();
  const { _id, title, image } = course;
  const [openModal, setOpenModal] = useState(false);
  const handleModalClose = () => {
    setOpenModal(false);
  };
  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleBuyCourse = async (id) => {
    const purchaseCourse = await addToPurchased(id, token);
    if (purchaseCourse.status === 200) {
      toast.success("Succesfully Brought the Course");
      setUserData((prev) => ({
        ...prev,
        purchasedCourse: [...prev.purchasedCourse, id],
      }));
    } else {
      toast.error(purchaseCourse.data.message);
    }
    setOpenModal(false);
  };

  const handleDeleteCourse = async (id) => {
    const deleteCourse = await deleteFromPurchased(id, token);
    if (deleteCourse.status === 200) {
      toast.success("Succesfully Deleted");
      setPurchased((prev) => prev.filter((course) => course._id != id));
    } else {
      toast.error(deleteCourse.data.message);
    }
    setOpenModal(false);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <Box
      sx={{
        padding: "10px",
        border: "2px solid black",
        borderRadius: "10px",
        width: "min-content",
        boxShadow: 6,
        marginTop: "15px",
        backgroundColor: allCourses ? "#800020" : "green",
      }}
    >
      <img
        src={image}
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
          backgroundColor: allCourses ? "#800020" : "green",
        }}
      >
        <Typography
          sx={{ backgroundColor: "inherit", color: "white" }}
          textAlign={"center"}
        >
          {title}
        </Typography>
        <Button
          sx={{ backgroundColor: "red" }}
          size="small"
          variant="contained"
          onClick={handleModalOpen}
        >
          {allCourses ? "Buy Now" : "Delete"}
        </Button>
        <Modal open={openModal} onClose={handleModalClose}>
          <Box sx={style}>
            {allCourses ? (
              <h2>Can you Confirm Buying </h2>
            ) : (
              <h2>Can you Confirm Deleting</h2>
            )}

            <Button
              onClick={
                allCourses
                  ? () => handleBuyCourse(_id)
                  : () => handleDeleteCourse(_id)
              }
            >
              {allCourses ? "Yes" : "Delete"}
            </Button>
            <Button onClick={handleModalClose}>No</Button>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default CourseDetails;
