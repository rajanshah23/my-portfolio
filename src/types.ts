export type ProjectLinks = {
  github?: string;
  live?: string | null;
  playStore?: string;
  documentation?: string;
};

export type ProjectType = {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  links: ProjectLinks;
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
