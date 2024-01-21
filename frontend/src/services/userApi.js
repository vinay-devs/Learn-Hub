import axios from "axios";

const BASEURL = "https://learn-hub-weld.vercel.app/user";
const getUserData = async (token) => {
  try {
    const data = await axios.get(BASEURL + "/userdata", {
      headers: {
        Authorization: token,
      },
    });

    return data;
  } catch (error) {
    return error.response;
  }
};

const getAllCourses = async (token) => {
  try {
    const data = await axios.get(BASEURL + "/allCourses", {
      headers: {
        Authorization: token,
      },
    });

    return data;
  } catch (error) {
    return error.response;
  }
};

const addToPurchased = async (id, token) => {
  try {
    const data = await axios.post(
      BASEURL + "/addToPurchased",
      { id: id },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return data;
  } catch (error) {
    return error.response;
  }
};

const getCourseData = async (purchasedData, token) => {
  try {
    const data = await axios.get(
      BASEURL + "/getCourseData",
      { params: { purchasedData: purchasedData } },
      {
        headers: { Authorization: token },
      }
    );
    return data;
  } catch (error) {
    return error.response;
  }
};

const deleteFromPurchased = async (id, token) => {
  try {
    const data = await axios.delete(BASEURL + `/deleteCourse/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    return data;
  } catch (err) {
    return err.response;
  }
};
export {
  getUserData,
  getAllCourses,
  addToPurchased,
  getCourseData,
  deleteFromPurchased,
};
