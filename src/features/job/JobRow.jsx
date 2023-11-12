import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteJob, getJobState, updateJobDeleteSuccess } from "./jobSlice";
import { useEffect } from "react";

export default function JobRow({ job }) {
  const { id, title, type, salary, deadline } = job;
  const {jobToDelete: {isJobDeleting, isJobDeleteSuccessful, id: deleteId}} = useSelector(getJobState);
  const dispatch = useDispatch();

  const colorCode = {
    internship: "orange",
    remote: "blue",
    fulltime: "rose",
  };
  console.log(job);

  useEffect(function(){
    if(isJobDeleteSuccessful){
      updateJobDeleteSuccess()
    }
  }, [dispatch, isJobDeleteSuccessful])

  function handleDelete(){
    dispatch(deleteJob(id))
  }

  return (
    <div className="lws-single-job">
      <div className="flex-1 min-w-0">
        <h2 className="lws-title">{title}</h2>
        <div className="job-footers">
          <div className="lws-type">
            <i
              className={`fa-solid fa-stop !text-[#FF8A00] text-lg mr-1.5 h-4 w-4 bg-${
                colorCode[type.split(" ").join("").toLowerCase()]
              }-500`}
            ></i>
            {type}
          </div>
          <div className="lws-salary">
            <i className="fa-solid fa-bangladeshi-taka-sign text-slate-400 text-lg mr-1.5"></i>
            BDT {salary}
          </div>
          <div className="lws-deadline">
            <i className="fa-regular fa-calendar text-slate-400 text-lg mr-1.5"></i>
            Closing on ${deadline}
          </div>
        </div>
      </div>
      <div className="mt-5 flex lg:mt-0 lg:ml-4">
        <Link to={`update/${id}`}>
          <span className="hidden sm:block">
            <button type="button" className="lws-edit btn btn-primary">
              <i className="fa-solid fa-pen text-gray-300 -ml-1 mr-2"></i>
              Edit
            </button>
          </span>
        </Link>

        <span className="sm:ml-3">
          <button type="button" className="lws-delete btn btn-danger" onClick={handleDelete}>
            <i className="fa-solid fa-trash text-gray-300 -ml-1 mr-2"></i>
            {isJobDeleting && deleteId === id ?'Deleting' : 'Delete'}
          </button>
        </span>
      </div>
    </div>
  );
}
