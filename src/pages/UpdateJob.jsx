import { useParams } from "react-router-dom";
import JobForm from "../features/job/JobForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchJob, getJobState } from "../features/job/jobSlice";
import { useEffect } from "react";

export default function UpdateJob() {
  const {id} = useParams();
  const {job, isJobLoading, isJobError} = useSelector(getJobState)
  const dispatch = useDispatch();

  useEffect(function(){
    dispatch(fetchJob(id))
  }, [dispatch, id])

  return (
    <>
      {isJobLoading && <h2>Loading job #{id}</h2> }
      {!isJobLoading && isJobError && <h2>Error</h2> }
      {!isJobLoading && !isJobError && !job?.id && <h2>No Job Found!</h2> }
      {!isJobLoading && !isJobError && job?.id && <JobForm jobToUpdate={job} />}
    </>
  );
}
