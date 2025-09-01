export interface Job {
  title: string;
  company: string;
  applicationDate: string;
  status: "applied" | "interview" | "rejected" | "offer";
  notes?: string;
  link?: string;
}
