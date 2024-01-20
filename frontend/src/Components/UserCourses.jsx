import { TabPanel } from "@mui/lab";
import React from "react";
import CourseDetails from "./CourseDetails";

const UserCourses = ({ value, allCourses, setUserData }) => {
  return (
    <TabPanel
      sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      value={value}
    >
      {allCourses.map((course) => {
        return (
          <CourseDetails
            setUserData={setUserData}
            course={course}
            allCourses={true}
          />
        );
      })}
    </TabPanel>
  );
};

export default UserCourses;
