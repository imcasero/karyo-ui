import { useState } from "preact/hooks";

type StatusFilter = "applied" | "interview" | "rejected" | "offer" | "all";

interface FilterDropdownProps {
  onFilterChange?: (status: StatusFilter) => void;
}

const statusOptions = [
  { value: "all" as StatusFilter, label: "All Status", icon: "📋" },
  { value: "applied" as StatusFilter, label: "Applied", icon: "📄" },
  { value: "interview" as StatusFilter, label: "Interview", icon: "🎯" },
  { value: "rejected" as StatusFilter, label: "Rejected", icon: "❌" },
  { value: "offer" as StatusFilter, label: "Offer", icon: "✅" },
];

export const FilterDropdown = ({ onFilterChange }: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>("all");

  const handleStatusSelect = (status: StatusFilter) => {
    setSelectedStatus(status);
    setIsOpen(false);
    onFilterChange?.(status);
  };

  const selectedOption = statusOptions.find(
    (option) => option.value === selectedStatus
  );

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <div className="flex items-center gap-2">
          <span>{selectedOption?.icon}</span>
          <span>{selectedOption?.label}</span>
        </div>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleStatusSelect(option.value)}
                className={`flex items-center gap-3 w-full px-4 py-2 text-sm text-left hover:bg-gray-100 ${
                  selectedStatus === option.value
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700"
                }`}
              >
                <span>{option.icon}</span>
                <span>{option.label}</span>
                {selectedStatus === option.value && (
                  <svg
                    className="w-4 h-4 ml-auto text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-0" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
};
