import { useEffect, useMemo, useState } from "preact/hooks";
import { FilterDropdown } from "./components/FilterDropdown";
import { AddJobButton } from "./components/AddJobButton";
import { SearchBar } from "./components/SearchBar";
import { StatsCards } from "./components/StatsCards";
import { JobsList } from "./components/JobsList";
import { JobCard } from "./components/JobCard";
import { Modal } from "./components/Modal";
import { JobForm } from "./components/JobForm";
import type { Job } from "../../dto/job";
import { JobsService } from "../../services/JobsService";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const jobsService = useMemo(() => new JobsService(), []);
  const { user } = useAuth();

  useEffect(() => {
    user?.id ? jobsService.getAllJobs(user.id).then(setJobs) : setJobs([]);
  }, []);

  const [jobs, setJobs] = useState<Job[]>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddJob = (formData: any) => {
    const newJob: Job = {
      company: formData.company,
      title: formData.title,
      applicationDate: new Date(formData.applicationDate).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        }
      ),
      status: formData.status,
      notes: formData.notes,
      link: formData.link || undefined,
    };

    setIsModalOpen(false);
    jobsService
      .createJob(newJob)
      .then((job) => setJobs((prev = []) => [job, ...(prev || [])]));
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
          {jobs?.map((job) => (
            <JobCard key={job.title} job={job} />
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
