import { Link } from "react-router-dom";

export default function AddJob() {
  return (
    <li>
      <Link to="/jobs/new" className="main-menu" id="lws-addJob-menu">
        <i className="fa-solid fa-file-circle-plus"></i>
        <span>Add NewJob</span>
      </Link>
    </li>
  );
}
