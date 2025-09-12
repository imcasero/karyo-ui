import { useMemo } from "preact/hooks";
import type { Job } from "../../../dto/job";

interface JobStats {
  totalApplications: number;
  interviews: number;
  offers: number;
  rejected: number;
  pending: number;
  successRate: number;
  thisMonthApplications: number;
  lastMonthApplications: number;
  applicationGrowth: number;
  averageResponseTime: number;
}

interface StatCard {
  id: string;
  title: string;
  value: string | number;
  change: number;
  changeType: "increase" | "decrease" | "neutral";
  icon: string;
  description?: string;
}

const isCurrentMonth = (dateString: string): boolean => {
  const date = new Date(dateString);
  const now = new Date();
  return (
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  );
};

const isLastMonth = (dateString: string): boolean => {
  const date = new Date(dateString);
  const now = new Date();
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1);
  return (
    date.getMonth() === lastMonth.getMonth() &&
    date.getFullYear() === lastMonth.getFullYear()
  );
};

const calculateStats = (jobs: Job[]): JobStats => {
  const totalApplications = jobs.length;
  const interviews = jobs.filter((job) => job.status === "interview").length;
  const offers = jobs.filter((job) => job.status === "offer").length;
  const rejected = jobs.filter((job) => job.status === "rejected").length;
  const pending = jobs.filter((job) => job.status === "applied").length;

  const thisMonthApplications = jobs.filter((job) =>
    isCurrentMonth(job.applicationDate)
  ).length;

  const lastMonthApplications = jobs.filter((job) =>
    isLastMonth(job.applicationDate)
  ).length;

  const applicationGrowth =
    lastMonthApplications > 0
      ? ((thisMonthApplications - lastMonthApplications) /
          lastMonthApplications) *
        100
      : thisMonthApplications > 0
      ? 100
      : 0;

  const successRate =
    totalApplications > 0 ? (offers / totalApplications) * 100 : 0;

  // Calculate average response time (days from application to status change)
  const responseTimes = jobs
    .filter((job) => job.status !== "applied")
    .map((job) => {
      const appDate = new Date(job.applicationDate);
      const now = new Date();
      return Math.floor(
        (now.getTime() - appDate.getTime()) / (1000 * 60 * 60 * 24)
      );
    });

  const averageResponseTime =
    responseTimes.length > 0
      ? Math.round(
          responseTimes.reduce((sum, days) => sum + days, 0) /
            responseTimes.length
        )
      : 0;

  return {
    totalApplications,
    interviews,
    offers,
    rejected,
    pending,
    successRate,
    thisMonthApplications,
    lastMonthApplications,
    applicationGrowth,
    averageResponseTime,
  };
};

export const useJobStats = (jobs: Job[]): StatCard[] => {
  return useMemo(() => {
    const stats = calculateStats(jobs);

    const statCards: StatCard[] = [
      {
        id: "total",
        title: "Total Apps",
        value: stats.totalApplications,
        change: Math.round(stats.applicationGrowth),
        changeType:
          stats.applicationGrowth > 5
            ? "increase"
            : stats.applicationGrowth < -5
            ? "decrease"
            : "neutral",
        icon: "📄",
      },
      {
        id: "pending",
        title: "Pending",
        value: stats.pending,
        change:
          stats.totalApplications > 0
            ? Math.round((stats.pending / stats.totalApplications) * 100)
            : 0,
        changeType: "neutral",
        icon: "⏳",
      },
      {
        id: "interviews",
        title: "Interviews",
        value: stats.interviews,
        change:
          stats.totalApplications > 0
            ? Math.round((stats.interviews / stats.totalApplications) * 100)
            : 0,
        changeType: stats.interviews > 0 ? "increase" : "neutral",
        icon: "🎯",
      },
      {
        id: "offers",
        title: "Offers",
        value: stats.offers,
        change:
          stats.totalApplications > 0
            ? Math.round((stats.offers / stats.totalApplications) * 100)
            : 0,
        changeType: stats.offers > 0 ? "increase" : "neutral",
        icon: "✅",
      },
      {
        id: "rejected",
        title: "Rejected",
        value: stats.rejected,
        change:
          stats.totalApplications > 0
            ? Math.round((stats.rejected / stats.totalApplications) * 100)
            : 0,
        changeType: stats.rejected > 0 ? "decrease" : "neutral",
        icon: "❌",
      },
      {
        id: "success-rate",
        title: "Success",
        value: `${Math.round(stats.successRate)}%`,
        change: Math.round(stats.successRate),
        changeType:
          stats.successRate >= 20
            ? "increase"
            : stats.successRate >= 10
            ? "neutral"
            : "decrease",
        icon: "📈",
        description:
          stats.successRate >= 20
            ? "Great!"
            : stats.successRate >= 10
            ? "Good"
            : "Keep going!",
      },
    ];

    // Only show the most relevant stats (top 6)
    return statCards;
  }, [jobs]);
};
