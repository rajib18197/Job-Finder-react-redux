import Search from "../../ui/Search";
import SortBy from "../../ui/SortBy";

export default function JobTableOperations() {
  return (
    <div className="md:flex space-y-2 md:space-y-0 justify-between mb-10 ">
      <div className="flex gap-4">
        <Search />
        <SortBy
          options={[
            { value: "default", label: "Default" },
            { value: "salary-asc", label: "Salary (Low to High)" },
            { value: "salary-desc", label: "Salary (High to Low)" },
          ]}
        />
      </div>
    </div>
  );
}
