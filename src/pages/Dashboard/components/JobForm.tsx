import { useState, useEffect } from "preact/hooks";
import type { Job } from "../../../dto/job";

interface JobFormData {
  company: string;
  title: string;
  link: string;
  applicationDate: string;
  status: Job["status"];
  notes: string;
}

interface JobFormProps {
  job?: Job | null;
  onSubmit: (data: JobFormData) => void;
  onCancel: () => void;
}

export const JobForm = ({ job, onSubmit, onCancel }: JobFormProps) => {
  const [formData, setFormData] = useState<JobFormData>({
    company: "",
    title: "",
    link: "",
    applicationDate: new Date().toISOString().split("T")[0],
    status: "applied",
    notes: "",
  });

  useEffect(() => {
    if (job) {
      // Handle both ISO date strings and display format dates
      let dateStr: string;
      try {
        // If it's already in YYYY-MM-DD format, use it directly
        if (job.applicationDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
          dateStr = job.applicationDate;
        } else {
          // Convert from display format or ISO to YYYY-MM-DD
          dateStr = new Date(job.applicationDate).toISOString().split("T")[0];
        }
      } catch {
        // Fallback to current date if parsing fails
        dateStr = new Date().toISOString().split("T")[0];
      }

      setFormData({
        company: job.company,
        title: job.title,
        link: job.link || "",
        applicationDate: dateStr,
        status: job.status,
        notes: job.notes || "",
      });
    } else {
      // Reset form for new job
      setFormData({
        company: "",
        title: "",
        link: "",
        applicationDate: new Date().toISOString().split("T")[0],
        status: "applied",
        notes: "",
      });
    }
  }, [job]);

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
    if (formData.company && formData.title) {
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
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Position
          </label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onInput={(e) => handleInputChange(e, "title")}
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
            htmlFor="applicationDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Application Date
          </label>
          <input
            id="applicationDate"
            type="date"
            value={formData.applicationDate}
            onInput={(e) => handleInputChange(e, "applicationDate")}
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
          disabled={!formData.company || !formData.title}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {job ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
};
