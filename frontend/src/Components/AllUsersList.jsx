import { TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllUsersData, deleteUser } from "../services/adminApi";
import { useAuth } from "../provider/AuthProvider";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";

const AllUsersList = ({ value }) => {
  const [token, _] = useAuth();
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const getAllUser = async () => {
      const res = await getAllUsersData(token);
      setAllUsers(res.data);
    };
    getAllUser();
  }, [token]);
  async function handleDeleteClick(id) {
    setAllUsers((prev) => prev.filter((row) => row._id !== id));
    const data = await deleteUser(id, token);
    if (data.status == 200) {
      toast.success("Deleted Succesfully");
    }
  }
  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    { field: "userName", headerName: "Username", width: 150 },
    { field: "email", headerName: "Email", width: 150 },
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
          rows={allUsers}
          columns={columns}
          getRowId={(row) => row._id}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 2,
              },
            },
          }}
          disableRowSelectionOnClick
        />
      </Box>
    </TabPanel>
  );
};

export default AllUsersList;
