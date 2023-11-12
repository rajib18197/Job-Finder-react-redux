import JobRow from "./JobRow";
import { useSelector, useDispatch } from "react-redux";
import { fetchJobs, getJobState } from "./jobSlice";
import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";

export default function JobTable() {
  const [searchParams] = useSearchParams();
  const { type } = useParams();
  console.log(type);
  const { jobs, isJobsLoading, isJobsError, jobError, searchQuery } =
    useSelector(getJobState);
  const dispatch = useDispatch();

  // 1) Filter by search query
  let searchedJobs;
  if (!searchQuery) searchedJobs = jobs;
  if (searchQuery)
    searchedJobs = jobs.filter((job) =>
      job.title.toLowerCase().trim().includes(searchQuery.toLowerCase().trim())
    );

  // 2) sorted Jobs
  const sortedValue = searchParams.get("sortBy") || "default";
  const [field, direction] = sortedValue.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  let sortedJobs;
  if (sortedValue === "default") sortedJobs = searchedJobs;
  else
    sortedJobs = searchedJobs
      .slice()
      .sort((a, b) => (a[field] - b[field]) * modifier);

  useEffect(
    function () {
      dispatch(fetchJobs(type));
    },
    [dispatch, type]
  );

  return (
    <div className="jobs-list">
      {isJobsLoading && <h2>Loading</h2>}
      {!isJobsLoading && isJobsError && <h2>{jobError}</h2>}
      {!isJobsLoading && !isJobsError && sortedJobs.length === 0 && (
        <h2>No Job Found at this moment.</h2>
      )}

      {!isJobsLoading &&
        !isJobsError &&
        sortedJobs.length > 0 &&
        sortedJobs.map((job) => <JobRow key={job.id} job={job} />)}
    </div>
  );
}
