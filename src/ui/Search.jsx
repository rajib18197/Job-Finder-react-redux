import { useState } from "react";
import { addQuery, removeQuery } from "../features/job/jobSlice";
import { useDispatch } from "react-redux";

export default function Search() {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  function handleSubmit(e) {
    console.dir(e.key);
    if (e.key === "Enter") {
      dispatch(addQuery(value));
    }

    if (e.key == "Backspace" && value.length > 0) {
      dispatch(addQuery(value));
    }

    if (e.key == "Backspace" && value.length === 0) {
      dispatch(removeQuery());
    }
  }

  return (
    <div className="search-field group flex-1">
      <i className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500"></i>
      <input
        type="text"
        placeholder="Search Job"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyUp={handleSubmit}
        className="search-input"
        id="lws-searchJob"
      />
    </div>
  );
}
