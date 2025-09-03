export interface Job {
  id: string;
  title: string;
  company: string;
  applicationDate: string;
  status: "applied" | "interview" | "rejected" | "offer";
  notes?: string;
  link?: string;
}
