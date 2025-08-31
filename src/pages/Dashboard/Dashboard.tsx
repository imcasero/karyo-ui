import { FilterDropdown } from "./components/FilterDropdown";
import { AddJobButton } from "./components/AddJobButton";
import { SearchBar } from "./components/SearchBar";
import { StatsCards } from "./components/StatsCards";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-6 h-screen p-6">
      <StatsCards />
      <div className="flex flex-row items-center w-full gap-4">
        <div className="flex-grow">
          <SearchBar />
        </div>
        <div className="flex-shrink-0">
          <FilterDropdown />
        </div>
        <div className="flex-shrink-0">
          <AddJobButton />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
