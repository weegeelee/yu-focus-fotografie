import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import adminReducer from "./adminReducer";

export const store = configureStore({
    reducer: { 
        auth: authReducer,
        admin: adminReducer,
    }
});