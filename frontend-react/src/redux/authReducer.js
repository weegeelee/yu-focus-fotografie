import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: !!localStorage.getItem("token"),
  token: localStorage.getItem("token") || null,
  firstname: localStorage.getItem("firstname") || null,
  userId: localStorage.getItem("userId") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuth = true;
      state.token = action.payload.token;
      state.firstname = action.payload.firstname;
      state.userId = action.payload.userId;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("firstname", action.payload.firstname);
      localStorage.setItem("userId", action.payload.userId);
    },
    logout: (state) => {
      state.isAuth = false;
      state.token = null;
      state.firstname = null;
      state.userId = null;
      localStorage.removeItem("token");
      localStorage.removeItem("firstname");
      localStorage.removeItem("userId");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;

export const login = (credentials) => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error(`Login failed: ${response.statusText}`);
    }

    const userData = await response.json();

    
    if (!userData.userId) {
      throw new Error("User ID is missing in the response");
    }
    if (!userData.token) {
      throw new Error("❌ No token received from API");
    }

    dispatch(loginSuccess({
      token: userData.token,
      firstname: userData.firstname,
      userId: userData.userId
    }));

  } catch (error) {
    console.log("Error login user:", error.message);
    throw error; 
  }
};

