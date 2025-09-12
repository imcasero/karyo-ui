import { useState, useMemo, useCallback } from "preact/hooks";
import type { Job } from "../../../dto/job";
import { JobsService } from "../../../services/JobsService";
import type { JobFormData } from "../components/JobForm";

interface UseJobsReturn {
  jobs: Job[];
  isLoading: boolean;
  error: string | null;
  loadJobs: (userId: string) => Promise<void>;
  createJob: (formData: JobFormData) => Promise<void>;
  updateJob: (jobId: string, formData: JobFormData) => Promise<void>;
  deleteJob: (jobId: string) => Promise<void>;
  clearError: () => void;
}

export const useJobs = (): UseJobsReturn => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const jobsService = useMemo(() => new JobsService(), []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const loadJobs = useCallback(
    async (userId: string) => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedJobs = await jobsService.getAllJobs(userId);
        setJobs(fetchedJobs);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load jobs");
      } finally {
        setIsLoading(false);
      }
    },
    [jobsService]
  );

  const createJob = useCallback(
    async (formData: JobFormData) => {
      try {
        setIsLoading(true);
        setError(null);

        const newJob: Job = {
          id: Math.random().toString(36).substr(2, 9),
          company: formData.company,
          title: formData.title,
          applicationDate: formData.applicationDate,
          status: formData.status,
          notes: formData.notes,
          link: formData.link || undefined,
        };

        const createdJob = await jobsService.createJob(newJob);
        setJobs((prev) => [createdJob, ...prev]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to create job");
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [jobsService]
  );

  const updateJob = useCallback(
    async (jobId: string, formData: JobFormData) => {
      try {
        setIsLoading(true);
        setError(null);

        let existingJob: Job | undefined;
        setJobs((currentJobs) => {
          existingJob = currentJobs.find((job) => job.id === jobId);
          return currentJobs;
        });

        if (!existingJob) {
          throw new Error("Job not found");
        }

        const updatedJob: Job = {
          ...existingJob,
          company: formData.company,
          title: formData.title,
          applicationDate: formData.applicationDate,
          status: formData.status,
          notes: formData.notes,
          link: formData.link || undefined,
        };

        const updatedJobFromServer = await jobsService.updateJob(
          jobId,
          updatedJob
        );

        setJobs((prev) => {
          const newJobs = prev.map((job) =>
            job.id === jobId ? { ...updatedJobFromServer } : job
          );
          return newJobs;
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update job");
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [jobsService]
  );

  const deleteJob = useCallback(
    async (jobId: string) => {
      try {
        setIsLoading(true);
        setError(null);

        await jobsService.deleteJob(jobId);
        setJobs((prev) => prev.filter((job) => job.id !== jobId));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to delete job");
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [jobsService]
  );

  return {
    jobs,
    isLoading,
    error,
    loadJobs,
    createJob,
    updateJob,
    deleteJob,
    clearError,
  };
};
