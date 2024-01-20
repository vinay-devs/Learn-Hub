import { TabPanel } from "@mui/lab";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useAuth } from "../provider/AuthProvider";
import { getCourseData } from "../services/userApi";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import CourseDetails from "./CourseDetails";

const PurchasedCourses = ({ value, purchasedCourses, valueChanged }) => {
  const [token, _] = useAuth();
  const [purchased, setPurchased] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const res = await getCourseData(purchasedCourses, token);
      if (res.status == 200) {
        setPurchased(res.data);
      }
      // return res.data;
    };
    getData();
  }, [token, valueChanged]);

  return (
    <TabPanel
      value={value}
      sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
    >
      {purchased.map((course) => {
        return (
          <CourseDetails
            setPurchased={setPurchased}
            course={course}
            allCourses={false}
          />
        );
      })}
    </TabPanel>
  );
};

export default PurchasedCourses;
