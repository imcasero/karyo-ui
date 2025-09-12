import { useState, useCallback } from "preact/hooks";
import type { Job } from "../../../dto/job";
import type { JobFormData } from "../components/JobForm";
import { formatDateForInput } from "../../../utils/dateUtils";

interface UseJobModalReturn {
  isModalOpen: boolean;
  editingJob: Job | null;
  modalTitle: string;
  submitButtonText: string;
  initialFormData: JobFormData | undefined;
  openCreateModal: () => void;
  openEditModal: (job: Job) => void;
  closeModal: () => void;
}

const formatJobToFormData = (job: Job): JobFormData => {
  return {
    company: job.company,
    title: job.title,
    link: job.link || "",
    applicationDate: formatDateForInput(job.applicationDate),
    status: job.status,
    notes: job.notes || "",
  };
};

export const useJobModal = (): UseJobModalReturn => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  const openCreateModal = useCallback(() => {
    setEditingJob(null);
    setIsModalOpen(true);
  }, []);

  const openEditModal = useCallback((job: Job) => {
    setEditingJob(job);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingJob(null);
  }, []);

  const modalTitle = editingJob ? "Edit Application" : "New Application";
  const submitButtonText = editingJob ? "Update" : "Create";
  const initialFormData = editingJob
    ? formatJobToFormData(editingJob)
    : undefined;

  return {
    isModalOpen,
    editingJob,
    modalTitle,
    submitButtonText,
    initialFormData,
    openCreateModal,
    openEditModal,
    closeModal,
  };
};
