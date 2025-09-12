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
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  const handleAddJob = (formData: any) => {
    const newJob: Job = {
      id: Math.random().toString(36).substr(2, 9),
      company: formData.company,
      title: formData.title,
      applicationDate: formData.applicationDate,
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
    setEditingJob(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (job: Job) => {
    setEditingJob(job);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingJob(null);
  };

  const handleDeleteJob = (id: string) => {
    jobsService
      .deleteJob(id)
      .then(() => setJobs((prev = []) => prev.filter((job) => job.id !== id)));
  };

  const handleUpdateJob = (formData: any) => {
    if (!editingJob) return;

    const updatedJob: Job = {
      ...editingJob,
      company: formData.company,
      title: formData.title,
      applicationDate: formData.applicationDate,
      status: formData.status,
      notes: formData.notes,
      link: formData.link || undefined,
    };

    setIsModalOpen(false);
    jobsService
      .updateJob(editingJob.id, updatedJob)
      .then((updatedJobFromServer) => {
        setJobs(
          (prev = []) =>
            prev?.map((job) =>
              job.id === editingJob.id ? updatedJobFromServer : job
            ) || []
        );
      })
      .catch((error) => {
        console.error("Failed to update job:", error);
        setIsModalOpen(true);
      });
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
            <JobCard
              key={job.id}
              job={job}
              onDelete={handleDeleteJob}
              onEdit={handleOpenEditModal}
            />
          ))}
        </JobsList>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingJob ? "Edit Application" : "New Application"}
      >
        <JobForm
          job={editingJob}
          onSubmit={editingJob ? handleUpdateJob : handleAddJob}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

export default Dashboard;
