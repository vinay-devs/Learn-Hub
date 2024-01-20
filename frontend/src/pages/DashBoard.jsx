import React, { useEffect, useState } from "react";
import AppBarDashBoard from "../Components/AppBarDashBoard";
import CourseDetails from "../Components/CourseDetails";
import { Container, Box, Button, Tab } from "@mui/material";
import axios from "axios";
import { useAuth } from "../provider/AuthProvider";
import { getAllCourses, getUserData } from "../services/userApi";
import { useNavigate } from "react-router-dom";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import UserCourses from "../Components/UserCourses";
import PurchasedCourses from "../Components/PurchasedCourses";

const DashBoard = () => {
  const [token, _] = useAuth();
  const [userData, setUserData] = useState({});
  const [allCourses, setAllCourses] = useState([]);
  const [value, setValue] = useState("1");
  const navigate = useNavigate();

  useEffect(() => {
    async function getUser() {
      if (token != null) {
        const res = await getUserData(token);
        const coursesRes = await getAllCourses(token);
        if (coursesRes.status == 200) {
          setAllCourses(coursesRes.data);
        } else {
          navigate("/login");
        }
        if (res.status == 200) {
          if (res.data) {
            setUserData(res.data);
          } else {
            setUserData({ username: "User", email: "user@123" });
          }
        } else {
          navigate("/login");
        }
      }
    }
    getUser();
  }, [token, value]);

  const handleChange = (e, value) => {
    setValue(value);
  };
  return (
    <Container maxWidth="none" className="container-dashboard">
      <AppBarDashBoard userData={userData} />
      <Box
        component={"div"}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChange}>
                <Tab label={"Courses"} value={"1"}></Tab>
                <Tab label={"Purchased"} value={"2"}></Tab>
              </TabList>
            </Box>
            <UserCourses
              setUserData={setUserData}
              allCourses={allCourses}
              value={"1"}
            />
            <PurchasedCourses
              purchasedCourses={userData.purchasedCourse}
              value={"2"}
              valueChanged={value}
            />
          </TabContext>
        </Box>
      </Box>
    </Container>
  );
};

export default DashBoard;
