
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/components/ui/sonner";
import { useAuth } from "./AuthContext";

export type JobType = "Full-time" | "Part-time" | "Contract" | "Internship";
export type ExperienceLevel = "Entry" | "Junior" | "Mid" | "Senior" | "Executive";

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  jobType: JobType;
  experienceLevel: ExperienceLevel;
  salary?: string;
  postedBy: {
    id: string;
    name: string;
    avatar?: string;
  };
  postedAt: Date;
  applicationLink?: string;
  applications?: number;
}

interface JobContextType {
  jobs: Job[];
  createJob: (job: Omit<Job, "id" | "postedBy" | "postedAt" | "applications">) => void;
  getJobById: (id: string) => Job | undefined;
  applyToJob: (jobId: string) => void;
  deleteJob: (jobId: string) => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

// Sample jobs for demo
const SAMPLE_JOBS: Job[] = [
  {
    id: "job1",
    title: "Senior React Developer",
    company: "TechCorp",
    location: "San Francisco, CA (Remote)",
    description: "We're looking for a senior React developer to join our growing team. You'll be responsible for building and maintaining our front-end applications, collaborating with back-end developers, and mentoring junior team members.",
    requirements: [
      "5+ years of experience with React",
      "Strong TypeScript skills",
      "Experience with state management (Redux, Context API)",
      "Knowledge of modern front-end build tools",
      "Excellent communication skills"
    ],
    jobType: "Full-time",
    experienceLevel: "Senior",
    salary: "$120,000 - $150,000",
    postedBy: {
      id: "1",
      name: "Alex Johnson",
      avatar: "/lovable-uploads/fe71df6c-8c81-40bd-b58e-75a640e77dd1.png"
    },
    postedAt: new Date(2023, 3, 15),
    applicationLink: "https://techcorp.com/careers",
    applications: 12
  },
  {
    id: "job2",
    title: "Junior Front-End Developer",
    company: "WebStudio",
    location: "New York, NY (Hybrid)",
    description: "WebStudio is seeking a talented junior front-end developer to join our creative team. You'll work on exciting projects for various clients while learning from experienced developers.",
    requirements: [
      "1+ years of experience with HTML, CSS, and JavaScript",
      "Familiarity with React or similar framework",
      "Basic understanding of responsive design",
      "Portfolio showcasing your work",
      "Degree in Computer Science or related field (or equivalent experience)"
    ],
    jobType: "Full-time",
    experienceLevel: "Junior",
    salary: "$70,000 - $90,000",
    postedBy: {
      id: "1",
      name: "Alex Johnson",
      avatar: "/lovable-uploads/fe71df6c-8c81-40bd-b58e-75a640e77dd1.png"
    },
    postedAt: new Date(2023, 3, 18),
    applicationLink: "https://webstudio.com/jobs",
    applications: 24
  },
  {
    id: "job3",
    title: "UX/UI Design Internship",
    company: "CreativeMinds",
    location: "Remote",
    description: "Join our design team for a 3-month internship where you'll get hands-on experience designing user interfaces for web and mobile applications. This is a great opportunity for students or recent graduates looking to build their portfolio.",
    requirements: [
      "Knowledge of design principles",
      "Familiarity with Figma or similar design tools",
      "Understanding of user-centered design",
      "Currently enrolled in or recently graduated from a design program",
      "Strong attention to detail"
    ],
    jobType: "Internship",
    experienceLevel: "Entry",
    postedBy: {
      id: "1",
      name: "Alex Johnson",
      avatar: "/lovable-uploads/fe71df6c-8c81-40bd-b58e-75a640e77dd1.png"
    },
    postedAt: new Date(2023, 3, 20),
    applicationLink: "https://creativeminds.io/internships",
    applications: 35
  }
];

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    // Load sample jobs
    setJobs(SAMPLE_JOBS);
  }, []);

  const createJob = (jobData: Omit<Job, "id" | "postedBy" | "postedAt" | "applications">) => {
    if (!isAuthenticated || !user) {
      toast("Authentication required", {
        description: "Please log in to post a job",
        variant: "destructive",
      });
      return;
    }

    if (user.role !== "mentor") {
      toast("Unauthorized", {
        description: "Only mentors can post jobs",
        variant: "destructive",
      });
      return;
    }

    const newJob: Job = {
      ...jobData,
      id: `job-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      postedBy: {
        id: user.id,
        name: user.name,
        avatar: user.avatar
      },
      postedAt: new Date(),
      applications: 0
    };

    setJobs(prevJobs => [newJob, ...prevJobs]);
    toast("Job posted", {
      description: "Your job listing has been published successfully!",
    });
  };

  const getJobById = (id: string) => {
    return jobs.find(job => job.id === id);
  };

  const applyToJob = (jobId: string) => {
    if (!isAuthenticated) {
      toast("Authentication required", {
        description: "Please log in to apply for this job",
        variant: "destructive",
      });
      return;
    }

    setJobs(prevJobs => 
      prevJobs.map(job => 
        job.id === jobId
          ? { ...job, applications: (job.applications || 0) + 1 }
          : job
      )
    );

    toast("Application submitted", {
      description: "Your application has been submitted successfully!",
    });
  };

  const deleteJob = (jobId: string) => {
    if (!isAuthenticated || !user) return;

    const jobToDelete = jobs.find(job => job.id === jobId);
    
    if (!jobToDelete || jobToDelete.postedBy.id !== user.id) {
      toast("Unauthorized", {
        description: "You can only delete jobs you've posted",
        variant: "destructive",
      });
      return;
    }

    setJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
    toast("Job deleted", {
      description: "Your job listing has been deleted successfully.",
    });
  };

  return (
    <JobContext.Provider 
      value={{ 
        jobs,
        createJob,
        getJobById,
        applyToJob,
        deleteJob
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJob = () => {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error("useJob must be used within a JobProvider");
  }
  return context;
};
