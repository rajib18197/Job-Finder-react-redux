import JobTable from "../features/job/JobTable";
import JobTableOperations from "../features/job/JobTableOperations";

export default function Jobs() {
  return (
    <>
      <JobTableOperations />
      <JobTable />
    </>
  );
}
