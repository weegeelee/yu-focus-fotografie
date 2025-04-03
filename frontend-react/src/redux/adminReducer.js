import { createSlice } from "@reduxjs/toolkit";
import api from "../../api.js";

const initialState = {
  isAdmin: JSON.parse(localStorage.getItem("isAdmin")) || false, 
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminStatus: (state, action) => {
      state.isAdmin = action.payload;
      localStorage.setItem("isAdmin", JSON.stringify(action.payload));
    },
  },
});

export const { setAdminStatus } = adminSlice.actions;
export default adminSlice.reducer;

export const fetchIsAdmin = () => async (dispatch, getState) => {
  const token = getState().auth.token; 

  if (!token) return; 
  try {
    const response = await api.get("/admin/status");

    if (!response.ok) {
      throw new Error("Failed to fetch admin status");
    }

    const data = await response.json();
   
    dispatch(setAdminStatus(data.isAdmin)); 
    return data.isAdmin;
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
};