import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { getJobState } from "./jobSlice";

export default function JobFilters() {
  const jobs  = ['Remote', 'Full Time', 'Internship'];
  // const jobTypes = jobs?.reduce((acc, job) => {
  //   if (acc.includes(job.type)) {
  //     return acc;
  //   } else {
  //     acc.push(job.type);
  //     return acc;
  //   }
  // }, []);

  console.log(jobs);
  return (
    <li>
      <Link to="/jobs" className="main-menu menu-active" id="lws-alljobs-menu">
        <i className="fa-solid fa-briefcase"></i>
        <span> All Available Jobs</span>
      </Link>
      <ul className="space-y-6 lg:space-y-2 ">
        {jobs?.map((type) => (
          <li>
            <Link
              className="sub-menu"
              to={`jobs/${type.split(' ').join('-').toLowerCase()}`}
              id={`lws-${type.split('-').join('')}-menu`}
            >
              <i className="fa-solid fa-stop !text-[#FF5757]"></i>
              {type[0].toUpperCase() + type.slice(1)}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
}
