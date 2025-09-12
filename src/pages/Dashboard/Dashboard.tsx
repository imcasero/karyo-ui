import { useEffect } from "preact/hooks";
import { FilterDropdown } from "./components/FilterDropdown";
import { AddJobButton } from "./components/AddJobButton";
import { SearchBar } from "./components/SearchBar";
import { StatsCards } from "./components/StatsCards";
import { JobsList } from "./components/JobsList";
import { JobCard } from "./components/JobCard";
import { Modal } from "./components/Modal";
import { JobForm, type JobFormData } from "./components/JobForm";
import { useAuth } from "../../context/AuthContext";
import { useJobs } from "./hooks/useJobs";
import { useJobModal } from "./hooks/useJobModal";
import { ErrorNotification } from "../../components/ErrorNotification";

const Dashboard = () => {
  const { user } = useAuth();
  const {
    jobs,
    isLoading: jobsLoading,
    error: jobsError,
    loadJobs,
    createJob,
    updateJob,
    deleteJob,
    clearError,
  } = useJobs();

  const {
    isModalOpen,
    editingJob,
    modalTitle,
    submitButtonText,
    initialFormData,
    openCreateModal,
    openEditModal,
    closeModal,
  } = useJobModal();

  useEffect(() => {
    if (user?.id) {
      loadJobs(user.id);
    }
  }, [user?.id, loadJobs]);

  const handleFormSubmit = async (formData: JobFormData) => {
    try {
      if (editingJob) {
        await updateJob(editingJob.id, formData);
      } else {
        await createJob(formData);
      }
      closeModal();
    } catch (error) {
      // Error is handled by the hook, modal stays open
      console.error("Form submission failed:", error);
    }
  };

  const handleDeleteJob = async (id: string) => {
    try {
      await deleteJob(id);
    } catch (error) {
      // Error is handled by the hook
      console.error("Delete failed:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-6 h-screen p-4 sm:p-6 overflow-y-auto">
      <StatsCards jobs={jobs} />
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center w-full gap-3 sm:gap-4">
        <div className="flex-grow">
          <SearchBar />
        </div>
        <div className="flex flex-row gap-3 sm:gap-4 sm:flex-shrink-0">
          <div className="flex-1 sm:flex-initial">
            <FilterDropdown />
          </div>
          <div className="flex-1 sm:flex-initial">
            <AddJobButton onClick={openCreateModal} />
          </div>
        </div>
      </div>
      <div className="flex-1">
        <JobsList>
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onDelete={handleDeleteJob}
              onEdit={openEditModal}
            />
          ))}
        </JobsList>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalTitle}
        size="lg"
      >
        <JobForm
          initialData={initialFormData}
          onSubmit={handleFormSubmit}
          onCancel={closeModal}
          isLoading={jobsLoading}
          submitButtonText={submitButtonText}
        />
      </Modal>

      {jobsError && (
        <ErrorNotification message={jobsError} onClose={clearError} />
      )}
    </div>
  );
};

export default Dashboard;
