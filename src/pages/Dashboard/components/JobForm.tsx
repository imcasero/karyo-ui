import { useState } from "preact/hooks";
import type { Job } from "./JobCard";

interface JobFormData {
  company: string;
  position: string;
  link: string;
  appliedDate: string;
  status: Job["status"];
  notes: string;
}

interface JobFormProps {
  onSubmit: (data: JobFormData) => void;
  onCancel: () => void;
}

export const JobForm = ({ onSubmit, onCancel }: JobFormProps) => {
  const [formData, setFormData] = useState<JobFormData>({
    company: "",
    position: "",
    link: "",
    appliedDate: new Date().toISOString().split("T")[0],
    status: "applied",
    notes: "",
  });

  const handleInputChange = (e: Event, field: keyof JobFormData) => {
    const target = e.target as
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement;
    setFormData((prev) => ({
      ...prev,
      [field]: target.value,
    }));
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (formData.company && formData.position) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Company and Position Row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Company
          </label>
          <input
            id="company"
            type="text"
            value={formData.company}
            onInput={(e) => handleInputChange(e, "company")}
            placeholder="Company name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="position"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Position
          </label>
          <input
            id="position"
            type="text"
            value={formData.position}
            onInput={(e) => handleInputChange(e, "position")}
            placeholder="Job title"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </div>

      {/* Job Link */}
      <div>
        <label
          htmlFor="link"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Link to job posting
        </label>
        <input
          id="link"
          type="url"
          value={formData.link}
          onInput={(e) => handleInputChange(e, "link")}
          placeholder="https://"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Application Date and Status Row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="appliedDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Application Date
          </label>
          <input
            id="appliedDate"
            type="date"
            value={formData.appliedDate}
            onInput={(e) => handleInputChange(e, "appliedDate")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Status
          </label>
          <select
            id="status"
            value={formData.status}
            onChange={(e) => handleInputChange(e, "status")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Notes */}
      <div>
        <label
          htmlFor="notes"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Notes (optional)
        </label>
        <textarea
          id="notes"
          value={formData.notes}
          onInput={(e) => handleInputChange(e, "notes")}
          placeholder="Additional notes about the application..."
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!formData.company || !formData.position}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Create
        </button>
      </div>
    </form>
  );
};
