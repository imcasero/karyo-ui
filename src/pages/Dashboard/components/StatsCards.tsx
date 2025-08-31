import Card from "../../../components/Card";

interface StatCard {
  id: string;
  title: string;
  value: string | number;
  change: number;
  changeType: "increase" | "decrease";
  icon: string;
}

const mockStats: StatCard[] = [
  {
    id: "1",
    title: "Total Applications",
    value: 4,
    change: 25,
    changeType: "increase",
    icon: "📄",
  },
  {
    id: "2",
    title: "Interviews",
    value: 1,
    change: 0,
    changeType: "increase",
    icon: "🎯",
  },
  {
    id: "3",
    title: "Rejected",
    value: 1,
    change: -12.5,
    changeType: "decrease",
    icon: "❌",
  },
  {
    id: "4",
    title: "Offers",
    value: 1,
    change: 100,
    changeType: "increase",
    icon: "✅",
  },
  {
    id: "5",
    title: "Accepted",
    value: 0,
    change: 0,
    changeType: "increase",
    icon: "🎉",
  },
  {
    id: "6",
    title: "Success Rate",
    value: "25%",
    change: 5.2,
    changeType: "increase",
    icon: "📈",
  },
];

export const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 w-full">
      {mockStats.map((stat) => (
        <Card key={stat.id} className="max-w-none">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{stat.icon}</span>
                <h3 className="text-sm font-medium text-gray-600">
                  {stat.title}
                </h3>
              </div>
              <div className="mb-2">
                <span className="text-3xl font-bold text-gray-900">
                  {stat.value}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span
                  className={`text-sm font-medium ${
                    stat.changeType === "increase"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {stat.changeType === "increase" ? "↗" : "↘"}{" "}
                  {Math.abs(stat.change)}%
                </span>
                <span className="text-sm text-gray-500">vs last month</span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
