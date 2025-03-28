
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, 
  MapPin, 
  Building, 
  Calendar, 
  DollarSign,
  Share2, 
  Bookmark,
  Clock,
  ArrowLeft
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const JobDetails = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  // Mock job data based on ID
  const job = {
    id: jobId,
    title: "Senior Software Engineer",
    company: "TechCorp Inc.",
    companyDescription: "TechCorp is a leading technology company specializing in cloud solutions and digital transformation.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120,000 - $150,000",
    posted: "2 days ago",
    deadline: "June 30, 2023",
    description: "We are looking for a senior software engineer with 5+ years of experience in React and Node.js to join our growing team.",
    responsibilities: [
      "Design and implement new features and functionality",
      "Build reusable code and libraries for future use",
      "Optimize applications for maximum speed and scalability",
      "Collaborate with other team members and stakeholders",
      "Ensure the technical feasibility of UI/UX designs"
    ],
    requirements: [
      "5+ years of experience with React, Node.js, and TypeScript",
      "Experience with AWS or other cloud services",
      "Understanding of server-side rendering and its benefits",
      "Strong knowledge of state management patterns",
      "Familiarity with front-end build pipelines and tools"
    ],
    benefits: [
      "Competitive salary and equity package",
      "Health, dental, and vision insurance",
      "Flexible working hours and remote options",
      "Continued learning and development opportunities",
      "Regular team-building events and activities"
    ],
    tags: ["React", "Node.js", "TypeScript", "AWS"]
  };
  
  const handleApply = () => {
    if (!isAuthenticated) {
      toast("Authentication required", {
        description: "Please log in to apply for this job",
      });
      return;
    }
    
    // Handle application logic
    toast.success("Application submitted", {
      description: "Your application has been sent to the employer",
    });
  };
  
  const handleBookmark = () => {
    if (!isAuthenticated) {
      toast("Authentication required", {
        description: "Please log in to save this job",
      });
      return;
    }
    
    toast.success("Job saved", {
      description: "This job has been added to your bookmarks",
    });
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied", {
      description: "Job link has been copied to your clipboard",
    });
  };
  
  return (
    <div className="container mx-auto py-12 px-4">
      <Button 
        variant="ghost" 
        className="mb-6 flex items-center gap-2"
        onClick={() => navigate('/jobs')}
      >
        <ArrowLeft size={16} />
        Back to all jobs
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl font-bold">{job.title}</CardTitle>
                  <CardDescription className="flex items-center mt-2 text-base">
                    <Building className="h-4 w-4 mr-1" />
                    {job.company}
                  </CardDescription>
                </div>
                <Badge variant="outline" className="text-sm">{job.type}</Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-gray-500">{job.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Salary</p>
                    <p className="text-sm text-gray-500">{job.salary}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Posted</p>
                    <p className="text-sm text-gray-500">{job.posted}</p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Job Description</h3>
                <p className="text-sm text-gray-700">{job.description}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Responsibilities</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {job.responsibilities.map((item, index) => (
                    <li key={index} className="text-sm text-gray-700">{item}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Requirements</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {job.requirements.map((item, index) => (
                    <li key={index} className="text-sm text-gray-700">{item}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Benefits</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {job.benefits.map((item, index) => (
                    <li key={index} className="text-sm text-gray-700">{item}</li>
                  ))}
                </ul>
              </div>
              
              <div className="flex flex-wrap gap-2 pt-2">
                {job.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="text-xl">Apply for this position</CardTitle>
              <CardDescription>
                Application deadline: {job.deadline}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-1">About {job.company}</h4>
                <p className="text-sm text-gray-600">{job.companyDescription}</p>
              </div>
              
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Posted {job.posted}</span>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col gap-3">
              <Button className="w-full" onClick={handleApply}>
                Apply Now
              </Button>
              
              <div className="flex gap-2 w-full">
                <Button variant="outline" className="flex-1" onClick={handleBookmark}>
                  <Bookmark className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" className="flex-1" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
