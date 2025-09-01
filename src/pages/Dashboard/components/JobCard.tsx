import Card from "../../../components/Card";

export interface Job {
  id: string;
  position: string;
  company: string;
  appliedDate: string;
  status: "applied" | "interview" | "rejected" | "offer";
  notes?: string;
  link?: string;
}

interface JobCardProps {
  job: Job;
}

const getStatusConfig = (status: Job["status"]) => {
  switch (status) {
    case "applied":
      return {
        label: "Applied",
        bgColor: "bg-blue-100",
        textColor: "text-blue-800",
        icon: "📄",
      };
    case "interview":
      return {
        label: "Interview",
        bgColor: "bg-yellow-100",
        textColor: "text-yellow-800",
        icon: "🎯",
      };
    case "rejected":
      return {
        label: "Rejected",
        bgColor: "bg-red-100",
        textColor: "text-red-800",
        icon: "❌",
      };
    case "offer":
      return {
        label: "Offer",
        bgColor: "bg-green-100",
        textColor: "text-green-800",
        icon: "✅",
      };
    default:
      return {
        label: "Applied",
        bgColor: "bg-gray-100",
        textColor: "text-gray-800",
        icon: "📄",
      };
  }
};

export const JobCard = ({ job }: JobCardProps) => {
  const statusConfig = getStatusConfig(job.status);

  return (
    <Card className="max-w-none hover:shadow-xl transition-shadow duration-200">
      <div className="space-y-4">
        {/* Header with Position and Company */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {job.position}
          </h3>
          <p className="text-gray-600 font-medium">{job.company}</p>
        </div>

        {/* Applied Date */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>Applied on {job.appliedDate}</span>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.bgColor} ${statusConfig.textColor}`}
          >
            <span>{statusConfig.icon}</span>
            {statusConfig.label}
          </span>
        </div>

        {/* Notes */}
        {job.notes && (
          <div className="pt-2 border-t border-gray-100">
            <p className="text-sm text-gray-600 italic">{job.notes}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          {job.link && (
            <a
              href={job.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
            >
              View Job
            </a>
          )}
          <div className="flex items-center gap-1 ml-auto">
            <button
              type="button"
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              title="Edit"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
            <button
              type="button"
              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
              title="Delete"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};
