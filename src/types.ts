export type ProjectLinks = {
  github?: string;
  live?: string | null;
  playStore?: string;
  documentation?: string;
};

export type ProjectType = {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  technologies: string[];
  links: ProjectLinks;
  repositoryUrl?: string;
  dockerHubUrl?: string;
  screenshots?: string[];
  features?: string[];
  technicalDetails?: string[];
  detailedDescription?: string[];
  category?: "Full Stack" | "Backend" | "DevOps" | "Embedded Systems";
};

export type CertificationType = {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  logo: string;
  color: string;
  link?: string;
};

export type TechnicalNoteQuery = {
  label: string;
  expression: string;
  note?: string;
};

export type TechnicalNoteType = {
  title: string;
  summary: string;
  category: string;
  technologies: string[];
  anchor: string;
  implementation: string[];
  queries?: TechnicalNoteQuery[];
};
