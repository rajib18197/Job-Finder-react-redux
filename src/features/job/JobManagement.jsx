import AddJob from "./AddJob";
import JobFilters from "./JobFilters";

export default function JobManagement() {
  return ( 
    <ul className="space-y-4">
      <JobFilters />
      <AddJob />
    </ul>
  );
}
