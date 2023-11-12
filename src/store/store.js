import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "../features/job/jobSlice";

const store = configureStore({
  reducer: {
    job: jobReducer,
  }, 
});

export default store;
 