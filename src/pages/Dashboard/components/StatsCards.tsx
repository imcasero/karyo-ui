import Card from "../../../components/Card";
import type { Job } from "../../../dto/job";
import { useJobStats } from "../hooks/useJobStats";

interface StatsCardsProps {
  jobs: Job[];
}

export const StatsCards = ({ jobs }: StatsCardsProps) => {
  const stats = useJobStats(jobs);

  // Show loading state or empty state if no jobs
  if (jobs.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6 w-full">
        {Array.from({ length: 6 }, (_, index) => (
          <Card key={index} className="max-w-none">
            <div className="flex flex-col space-y-3 p-1">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-xl sm:text-2xl">📊</span>
                <h3 className="text-xs sm:text-sm lg:text-xs xl:text-sm font-medium text-gray-400 leading-tight">
                  No data yet
                </h3>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-bold text-gray-300">
                  0
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                <span className="text-xs sm:text-sm font-medium text-gray-400">
                  → 0%
                </span>
                <span className="text-xs sm:text-sm text-gray-400">
                  Start applying!
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6 w-full">
      {stats.map((stat) => (
        <Card key={stat.id} className="max-w-none">
          <div className="flex flex-col space-y-3 p-1">
            {/* Header with icon and title */}
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-xl sm:text-2xl flex-shrink-0">
                {stat.icon}
              </span>
              <h3 className="text-xs sm:text-sm lg:text-xs xl:text-sm font-medium text-gray-600 leading-tight line-clamp-2">
                {stat.title}
              </h3>
            </div>

            {/* Main value */}
            <div className="flex-shrink-0">
              <span className="text-2xl sm:text-3xl lg:text-2xl xl:text-3xl font-bold text-gray-900 leading-none">
                {stat.value}
              </span>
            </div>

            {/* Change indicator */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 min-h-[2rem] sm:min-h-0">
              <span
                className={`text-xs sm:text-sm font-medium flex-shrink-0 ${
                  stat.changeType === "increase"
                    ? "text-green-600"
                    : stat.changeType === "decrease"
                    ? "text-red-600"
                    : "text-gray-600"
                }`}
              >
                {stat.changeType === "increase"
                  ? "↗"
                  : stat.changeType === "decrease"
                  ? "↘"
                  : "→"}{" "}
                {Math.abs(stat.change)}%
              </span>
              <span className="text-xs sm:text-sm text-gray-500 truncate">
                {stat.id === "total" ? "vs last month" : "of total"}
              </span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
