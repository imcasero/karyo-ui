import { useState } from "preact/hooks";
import { FilterDropdown } from "./components/FilterDropdown";
import { AddJobButton } from "./components/AddJobButton";
import { SearchBar } from "./components/SearchBar";
import { StatsCards } from "./components/StatsCards";
import { JobsList } from "./components/JobsList";
import { JobCard, type Job } from "./components/JobCard";
import { Modal } from "./components/Modal";
import { JobForm } from "./components/JobForm";

const mockJobs: Job[] = [
  {
    id: "1",
    position: "Frontend Developer",
    company: "Google",
    appliedDate: "Jan 15, 2024",
    status: "interview",
    notes: "Technical interview scheduled for next week",
    link: "https://careers.google.com/jobs/frontend-developer",
  },
  {
    id: "2",
    position: "React Developer",
    company: "Microsoft",
    appliedDate: "Jan 10, 2024",
    status: "applied",
    notes: "Application submitted, waiting for response",
  },
  {
    id: "3",
    position: "Full Stack Developer",
    company: "Meta",
    appliedDate: "Jan 8, 2024",
    status: "rejected",
    notes: "Not selected to continue in the process",
  },
  {
    id: "4",
    position: "Senior Frontend Engineer",
    company: "Netflix",
    appliedDate: "Jan 12, 2024",
    status: "offer",
    notes: "Received an offer, reviewing terms",
    link: "https://jobs.netflix.com/jobs/senior-frontend",
  },
  {
    id: "5",
    position: "UI/UX Developer",
    company: "Apple",
    appliedDate: "Jan 5, 2024",
    status: "applied",
    notes: "Initial application completed",
  },
  {
    id: "6",
    position: "JavaScript Engineer",
    company: "Amazon",
    appliedDate: "Jan 3, 2024",
    status: "interview",
    notes: "First round of interviews completed",
  },
];

const Dashboard = () => {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddJob = (formData: any) => {
    const newJob: Job = {
      id: Date.now().toString(),
      company: formData.company,
      position: formData.position,
      appliedDate: new Date(formData.appliedDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      status: formData.status,
      notes: formData.notes,
      link: formData.link || undefined,
    };

    setJobs((prev) => [newJob, ...prev]);
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-6 h-screen p-6 overflow-y-auto">
      <StatsCards />
      <div className="flex flex-row items-center w-full gap-4">
        <div className="flex-grow">
          <SearchBar />
        </div>
        <div className="flex-shrink-0">
          <FilterDropdown />
        </div>
        <div className="flex-shrink-0">
          <AddJobButton onClick={handleOpenModal} />
        </div>
      </div>
      <div className="flex-1">
        <JobsList>
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </JobsList>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="New Application"
      >
        <JobForm onSubmit={handleAddJob} onCancel={handleCloseModal} />
      </Modal>
    </div>
  );
};

export default Dashboard;
