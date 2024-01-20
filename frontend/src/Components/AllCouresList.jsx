import { TabPanel } from "@mui/lab";
import { Box, Button, TextField } from "@mui/material";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import {
  addNewCourse,
  deleteCourse,
  getAllCoursesData,
} from "../services/adminApi";
import { useAuth } from "../provider/AuthProvider";
import { toast } from "react-toastify";

const AllCouresList = ({ value }) => {
  const [token, _] = useAuth();
  const [allCourses, setAllCourses] = useState();
  const [newCourse, setNewCourse] = useState({ title: "", image: "" });
  const [state, setState] = useState(false);
  useEffect(() => {
    const getCourseData = async () => {
      const res = await getAllCoursesData(token);
      if (res.status == 200) {
        setAllCourses(res.data);
      }
      return res.data;
    };
    getCourseData();
  }, [token, state]);
  const handleTitleOnChange = (e) => {
    setNewCourse((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleImageOnChange = (e) => {
    setNewCourse((prev) => ({ ...prev, image: e.target.value }));
  };

  const handleAddCourse = async () => {
    const res = await addNewCourse(newCourse, token);
    setState((prev) => !prev);
    setNewCourse({ title: "", image: "" });
    return res;
  };
  const handleDeleteClick = async (id) => {
    setAllCourses((prev) => prev.filter((row) => row._id !== id));
    const res = await deleteCourse(id, token);
    if (res.status === 200) {
      toast.success("Course Deleted Succesfully");
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 350 },
    { field: "title", headerName: "Title", width: 150, editable: true },
    { field: "image", headerName: "Image URL", width: 150, editable: true },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      cellClassName: "actions",
      renderCell: (params) => {
        return (
          <DeleteIcon
            onClick={() => handleDeleteClick(params.row._id)}
            style={{ cursor: "pointer" }}
          />
        );
      },
    },
  ];
  return (
    <TabPanel value={value}>
      <Box>
        <DataGrid
          getRowId={(row) => row._id}
          rows={allCourses}
          columns={columns}
          disableRowSelectionOnClick
        />
        <Box>
          <TextField
            onChange={handleTitleOnChange}
            type="text"
            placeholder="Title"
            value={newCourse.title}
          />
          <TextField
            type="text"
            onChange={handleImageOnChange}
            placeholder="Image URL"
            value={newCourse.image}
          />
          <Button
            disabled={newCourse.title && newCourse.image ? false : true}
            onClick={handleAddCourse}
          >
            Add Course
          </Button>
        </Box>
      </Box>
    </TabPanel>
  );
};

export default AllCouresList;
