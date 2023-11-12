import JobManagement from "../features/job/JobManagement";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <nav>
        <JobManagement />
      </nav>
    </div>
  );
}
