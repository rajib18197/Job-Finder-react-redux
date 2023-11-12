import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getJobsApi,
  createJobApi,
  updateJobApi,
  getJobApi,
  deleteJobApi,
} from "../../services/jobApi";

const initialState = {
  jobs: [],

  isJobsLoading: false,
  isJobsError: false,
  jobsError: "",
  isJobsFetching: false,

  job: {},
  isJobLoading: false,
  isJobError: false,
  jobError: "",

  isJobCreating: false,
  isJobCreateError: false,
  jobCreateError: "",
  isJobCreateSuccessful: false,

  isJobUpdating: false,
  isJobUpdateError: false,
  jobUpdateError: "",
  isJobUpdateSuccessful: false,

  jobToDelete: {
    id: "",
    isJobDeleting: false,
    isJobDeleteError: false,
    jobDeleteError: "",
    isJobDeleteSuccessful: false,
  },

  searchQuery: "",
};

export const fetchJobs = createAsyncThunk(
  "job/fetchJobs",
  async function (type) {
    const jobsData = await getJobsApi(type);
    return jobsData;
  }
);

export const fetchJob = createAsyncThunk("job/fetchJob", async function (id) {
  const data = await getJobApi(id);
  return data;
});

export const addNewJob = createAsyncThunk(
  "job/addNewJob",
  async function (newJob) {
    const data = await createJobApi(newJob);
    console.log(data);
    return data;
  }
);

export const updateJob = createAsyncThunk(
  "job/updateJob",
  async function ({ id, data }) {
    const updatedData = await updateJobApi({ id, data });
    return updatedData;
  }
);

export const deleteJob = createAsyncThunk("job/deleteJob", async function (id) {
  const data = await deleteJobApi(id);
  return data;
});

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    addQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    removeQuery: (state) => {
      state.searchQuery = "";
    },

    updateJobCreateSuccess: (state) => {
      state.isJobCreateSuccessful = false;
    },

    updateJobUpdateSuccess: (state) => {
      state.isJobUpdateSuccessful = false;
    },

    updateJobDeleteSuccess: (state) => {
      state.jobToDelete.isJobDeleteSuccessful = false;
      state.jobToDelete.id = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.isJobsLoading = true;
        state.isJobsError = false;
        state.jobsError = "";
        state.isJobsFetching = true;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.isJobsLoading = false;
        state.isJobsError = false;
        state.isJobsFetching = false;
        state.jobsError = "";
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.isJobsLoading = false;
        state.isJobsFetching = false;
        state.jobs = [];
        state.isJobsError = true;
        state.jobsError = action.error?.message;
      });

    builder
      .addCase(fetchJob.pending, (state) => {
        state.isJobLoading = true;
        state.isJobError = false;
        state.jobError = "";
      })
      .addCase(fetchJob.fulfilled, (state, action) => {
        state.isJobLoading = false;
        state.job = action.payload;
      })
      .addCase(fetchJob.rejected, (state, action) => {
        state.isJobLoading = false;
        state.job = {};
        state.isJobError = true;
        state.jobError = action.error?.message;
      });

    builder
      .addCase(addNewJob.pending, (state) => {
        state.isJobCreating = true;
        state.isJobCreateError = false;
        state.jobCreateError = "";
      })
      .addCase(addNewJob.fulfilled, (state, action) => {
        state.isJobCreating = false;
        state.jobs.push(action.payload);
        state.isJobCreateSuccessful = true;
      })
      .addCase(addNewJob.rejected, (state, action) => {
        state.isJobCreating = false;
        state.isJobCreateError = true;
        state.jobCreateError = action.error?.message;
        state.isJobCreateSuccessful = false;
      });

    builder
      .addCase(updateJob.pending, (state) => {
        state.isJobUpdating = true;
        state.isJobUpdateError = false;
        state.jobUpdateError = "";
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        state.isJobUpdating = false;
        const jobToUpdateIndex = state.jobs.findIndex(
          (job) => job.id === action.payload.id
        );
        state.jobs[jobToUpdateIndex] = action.payload;
        state.isJobUpdateSuccessful = true;
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.isJobUpdating = false;
        state.isJobUpdateError = true;
        state.jobUpdateError = action.error?.message;
        state.isJobUpdateSuccessful = false;
      });

    builder
      .addCase(deleteJob.pending, (state, action) => {
        state.jobToDelete.isJobDeleting = true;
        state.jobToDelete.id = action.meta.arg;
        state.jobToDelete.isJobDeleteError = false;
        state.jobToDelete.jobDeleteError = "";
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.jobToDelete.isJobDeleting = false;
        state.jobToDelete.isJobDeleteSuccessful = true;
        console.log(action);
        const jobToDeleteIndex = state.jobs.findIndex(
          (job) => job.id === action.meta.arg
        );
        state.jobs.splice(jobToDeleteIndex, 1);
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.jobToDelete.isJobDeleting = false;
        state.jobToDelete.isJobDeleteSuccessful = false;
        state.jobToDelete.isJobDeleteError = true;
        state.jobToDelete.jobDeleteError = action.error?.message;
      });
  },
});

export const {
  addQuery,
  removeQuery,
  updateJobCreateSuccess,
  updateJobUpdateSuccess,
  updateJobDeleteSuccess,
} = jobSlice.actions;

export default jobSlice.reducer;

export const getJobState = (state) => state.job;
