import axios from "axios";

const BASEURL = "https://learn-hub-weld.vercel.app/admin";
const getAdminData = async (token) => {
  const data = await axios.get(BASEURL + "/adminData", {
    headers: {
      Authorization: token,
    },
  });
  return data;
};
const getAllUsersData = async (token) => {
  const data = await axios.get(BASEURL + "/getAllUsers", {
    headers: {
      Authorization: token,
    },
  });
  return data;
};

const deleteUser = async (id, token) => {
  const data = await axios.delete(BASEURL + `/deleteUser/:${id}`, {
    headers: {
      Authorization: token,
    },
  });
  return data;
};

const getAllCoursesData = async (token) => {
  const data = await axios.get(BASEURL + "/getAllCourses", {
    headers: {
      Authorization: token,
    },
  });
  return data;
};

const deleteCourse = async (id, token) => {
  const data = await axios.delete(BASEURL + `/deleteCourse/:${id}`, {
    headers: {
      Authorization: token,
    },
  });
  return data;
};

const addNewCourse = async (newCourseData, token) => {
  const data = await axios.post(BASEURL + "/addCourse", newCourseData, {
    headers: {
      Authorization: token,
    },
  });
  return data;
};
export {
  getAdminData,
  getAllUsersData,
  deleteUser,
  getAllCoursesData,
  deleteCourse,
  addNewCourse,
};
