import type { Job } from "../dto/job";
import { BaseService } from "./BaseService";

export class JobsService extends BaseService {
  constructor() {
    super(import.meta.env.VITE_API_URL || "http://localhost:3000");
  }

  async getAllJobs(userId: string): Promise<Job[]> {
    const jobs = await this.request(`/jobs/${userId}`, {
      method: "GET",
    });

    return jobs as Job[];
  }

  async createJob(job: Job): Promise<Job> {
    const newJob = await this.request(`/jobs`, {
      method: "POST",
      body: JSON.stringify(job),
    });

    return newJob as Job;
  }

  async deleteJob(id: string): Promise<void> {
    await this.request(`/jobs/${id}`, {
      method: "DELETE",
    });
  }

  async updateJob(id: string, job: Job): Promise<Job> {
    const updatedJob = await this.request(`/jobs/${id}`, {
      method: "PATCH",
      body: JSON.stringify(job),
    });

    return updatedJob as Job;
  }
}
