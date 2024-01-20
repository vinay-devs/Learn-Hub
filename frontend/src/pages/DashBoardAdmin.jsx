import React, { useEffect, useState } from "react";
import AppBarDashBoard from "../Components/AppBarDashBoard";
import { useAuth } from "../provider/AuthProvider";
import { getAdminData } from "../services/adminApi";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import AllUsersList from "../Components/AllUsersList";
import AllCouresList from "../Components/AllCouresList";

const DashBoardAdmin = () => {
  const [token, _] = useAuth();
  const [adminData, setAdminData] = useState({});
  const [valueTab, setValueTab] = useState("1");
  useEffect(() => {
    const adminData = async () => {
      const res = await getAdminData(token);
      setAdminData({ username: res.data });
    };
    adminData();
  }, [token]);
  function handleChange(e, newValue) {
    setValueTab(newValue);
  }
  return (
    <div>
      <AppBarDashBoard userData={adminData} />
      <Box>
        <TabContext value={valueTab}>
          <Box>
            <TabList onChange={handleChange}>
              <Tab label="Users" value="1" />
              <Tab label="Courses" value="2" />
            </TabList>
          </Box>
          <AllUsersList value={"1"} />
          <AllCouresList value={"2"} />
        </TabContext>
      </Box>
    </div>
  );
};

export default DashBoardAdmin;
