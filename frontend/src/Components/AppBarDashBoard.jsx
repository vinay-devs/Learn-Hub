import React, { useState } from "react";
import { useAuth } from "../provider/AuthProvider";
import Menu from "@mui/material/Menu";
import { Avatar, Box, Container, MenuItem, Typography } from "@mui/material";
import "../assets/css/appbardashboard.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AppBarDashBoard = ({ userData }) => {
  const [_, setToken] = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleMenuClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <Container
      sx={{
        border: "2px solid black",
        padding: "10px",
        borderRadius: "10px",
        boxShadow: 6,
      }}
    >
      <Box
        component={"div"}
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Typography sx={{ fontWeight: " bold ", fontSize: 24 }}>
          DashBoard
        </Typography>
        <Box component={"div"}>
          <Avatar
            id="basic-button"
            aria-controls={openMenu ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openMenu ? "true" : undefined}
            onClick={handleMenuClick}
          ></Avatar>
          <Typography>{userData.username}</Typography>
          <Menu
            anchorEl={anchorEl}
            id="basic-menu"
            open={openMenu}
            onClose={handleMenuClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={() => {
                setToken("");
                toast.success("Successfully LoggedOut");
                navigate("/login");
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Box>
      <Box></Box>
    </Container>
  );
};

export default AppBarDashBoard;
