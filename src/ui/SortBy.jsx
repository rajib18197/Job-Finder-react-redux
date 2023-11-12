import { useSearchParams } from "react-router-dom";
import Select from "./Select";

export default function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSortedValue = searchParams.get("sortBy") || "";

  function handleSort(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      id="lws-sort"
      name={"sort"}
      value={currentSortedValue}
      onChange={handleSort}
      autoComplete="sort"
      className="flex-1"
    />
  );
}
