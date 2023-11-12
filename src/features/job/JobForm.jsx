import { useEffect, useState } from "react";
import Select from "../../ui/Select";
import { useDispatch, useSelector } from "react-redux";
import { addNewJob, getJobState, updateJob, updateJobCreateSuccess, updateJobUpdateSuccess } from "./jobSlice";
import { useNavigate } from "react-router-dom";

const jobOptions = [
  {value: '', label: 'Select Job Title'},
  { value: "software-engineer", label: "Software Engineer" },
  { value: "software-developer", label: "Software Developer" },
  { value: "full-stack-developer", label: "Full Stack Developer" },
  { value: "mern-stack-developer", label: "MERN Stack Developer" },
  { value: "devops-engineer", label: "DevOps Engineer" },
  { value: "qa-engineer", label: "QA Engineer" },
  { value: "product-manager", label: "Product Manager" },
  { value: "social-media-manager", label: "Social Media Manager" },
  { value: "senior-Executive", label: "Senior Executive" },
  { value: "junior-executive", label: "Junior Executive" },
  { value: "android-app-developer", label: "Android App Developer" },
  { value: "ios-app-developer", label: "IOS App Developer" },
  { value: "frontend-developer", label: "Frontend Developer" },
  { value: "frontend-engineer", label: "Frontend Engineer" },
];

export default function JobForm({jobToUpdate = {}}) {
  const isUpdateSession = Boolean(jobToUpdate.id);
  const {id: updateId, title: initialTitle, type: initialType, salary: initialSalary, deadline: initialDeadline} = jobToUpdate
  console.log(jobToUpdate);

  const [title, setTitle] = useState(initialTitle?.split(' ').join('-').toLowerCase() || "");
  const [type, setType] = useState(initialType?.split(' ').join(' ').toLowerCase() || "");
  const [salary, setSalary] = useState(initialSalary || "");
  const [deadline, setDeadline] = useState(initialDeadline || "");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {isJobCreateSuccessful, isJobUpdateSuccessful} = useSelector(getJobState);

  useEffect(function(){
    if(isJobCreateSuccessful) {
      dispatch(updateJobCreateSuccess())
      navigate('/')
    }

    if(isJobUpdateSuccessful){
      dispatch(updateJobUpdateSuccess());
      navigate('/')
    }

  }, [isJobCreateSuccessful, isJobUpdateSuccessful])

  function handleSubmit(e) {
    e.preventDefault();
    console.log(title, type, salary, deadline);

    if(isUpdateSession){
      dispatch(updateJob({id: updateId, data: {title, type, salary, deadline}}))
      return;
    }

    dispatch(addNewJob({ title, type, salary, deadline }));
  }

  return (
    <>
      <h1 className="mb-10 text-center lws-section-title">Add New Job</h1>

      <div className="max-w-3xl mx-auto">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="fieldContainer">
            <label
              for="lws-JobTitle"
              className="text-sm font-medium text-slate-300"
            >
              Job Title
            </label>
            <Select
              options={jobOptions}
              id="lws-JobTitle"
              name="lwsJobTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="fieldContainer">
            <label for="lws-JobType">Job Type</label>
            <Select
              options={[
                {value: '', label: 'Select job Type'},
                { value: "full time", label: "Full Time" },
                { value: "internship", label: "Internship" },
                { value: "remote", label: "Remote" },
              ]}
              value={type}
              onChange={(e) => setType(e.target.value)}
              id="lws-JobType"
              name="lwsJobType"
              required
            />
          </div>

          <div className="fieldContainer">
            <label for="lws-JobSalary">Salary</label>
            <div className="flex border rounded-md shadow-sm border-slate-600">
              <span className="input-tag">BDT</span>
              <input
                type="number"
                name="lwsJobSalary"
                id="lws-JobSalary"
                required
                className="!rounded-l-none !border-0"
                placeholder="20,00,000"
                value={salary}
                onChange={(e) => setSalary(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="fieldContainer">
            <label for="lws-JobDeadline">Deadline</label>
            <input
              type="date"
              name="lwsJobDeadline"
              id="lws-JobDeadline"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
          </div>

          <div className="text-right">
            <button
              type="submit"
              id="lws-submit"
              className="cursor-pointer btn btn-primary w-fit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
