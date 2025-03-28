
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  MapPin, 
  Briefcase, 
  MessageSquare, 
  GraduationCap,
  Filter,
  Award
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const Mentors = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("");
  
  // Mock data for mentors
  const mentors = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      avatar: "/placeholder.svg",
      title: "Marketing Director",
      company: "Global Brands Inc.",
      location: "San Francisco, CA",
      experience: "15+ years",
      education: "MBA, Stanford University",
      availability: "2 slots available",
      bio: "Marketing executive with extensive experience in digital marketing, brand strategy, and consumer behavior. I enjoy mentoring students interested in marketing careers.",
      skills: ["Digital Marketing", "Brand Strategy", "Market Research", "Team Leadership"],
      industry: "Marketing"
    },
    {
      id: "2",
      name: "Michael Chen",
      avatar: "/placeholder.svg",
      title: "Senior Software Engineer",
      company: "TechCorp",
      location: "Seattle, WA",
      experience: "10+ years",
      education: "MS Computer Science, MIT",
      availability: "1 slot available",
      bio: "Full-stack developer specializing in cloud architecture and scalable systems. I mentor students interested in software engineering and tech startups.",
      skills: ["JavaScript", "React", "Node.js", "AWS", "System Design"],
      industry: "Technology"
    },
    {
      id: "3",
      name: "Priya Patel",
      avatar: "/placeholder.svg",
      title: "Investment Analyst",
      company: "Global Finance Group",
      location: "New York, NY",
      experience: "8+ years",
      education: "MBA, Columbia Business School",
      availability: "3 slots available",
      bio: "Finance professional specializing in investment analysis and portfolio management. I help students navigate careers in finance and prepare for interviews.",
      skills: ["Financial Analysis", "Valuation", "Portfolio Management", "Excel Modeling"],
      industry: "Finance"
    },
    {
      id: "4",
      name: "James Wilson",
      avatar: "/placeholder.svg",
      title: "UX Research Lead",
      company: "DesignWorks",
      location: "Austin, TX",
      experience: "12+ years",
      education: "PhD Human-Computer Interaction, Carnegie Mellon",
      availability: "2 slots available",
      bio: "UX researcher focusing on user-centered design and accessibility. I mentor students interested in UX research and design careers.",
      skills: ["User Research", "Usability Testing", "Interaction Design", "Accessibility"],
      industry: "Design"
    },
    {
      id: "5",
      name: "Olivia Martinez",
      avatar: "/placeholder.svg",
      title: "HR Director",
      company: "People First Inc.",
      location: "Chicago, IL",
      experience: "14+ years",
      education: "MS Human Resources, Cornell University",
      availability: "1 slot available",
      bio: "HR professional with expertise in talent acquisition, employee development, and organizational culture. I mentor students interested in HR and people operations.",
      skills: ["Talent Acquisition", "Employee Development", "HR Strategy", "Org Culture"],
      industry: "Human Resources"
    },
    {
      id: "6",
      name: "Robert Kim",
      avatar: "/placeholder.svg",
      title: "Product Manager",
      company: "InnovateTech",
      location: "Remote",
      experience: "9+ years",
      education: "MBA, University of California Berkeley",
      availability: "3 slots available",
      bio: "Product leader with experience in building consumer and enterprise products. I help students understand product management and how to break into the field.",
      skills: ["Product Strategy", "Agile", "User Stories", "Market Analysis", "Roadmapping"],
      industry: "Product Management"
    }
  ];
  
  const industries = Array.from(new Set(mentors.map(m => m.industry)));
  const experienceLevels = ["5+ years", "10+ years", "15+ years"];
  
  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = 
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesIndustry = industryFilter ? mentor.industry === industryFilter : true;
    
    const matchesExperience = experienceFilter ? 
      parseInt(mentor.experience) >= parseInt(experienceFilter) : true;
    
    return matchesSearch && matchesIndustry && matchesExperience;
  });
  
  const handleConnect = (mentorId: string, mentorName: string) => {
    if (!isAuthenticated) {
      toast("Authentication required", {
        description: "Please log in to connect with mentors",
      });
      return;
    }
    
    // In a real app, this would send a mentorship request
    toast.success("Request sent", {
      description: `Your mentorship request has been sent to ${mentorName}`,
    });
  };
  
  const handleMessage = (mentorId: string) => {
    if (!isAuthenticated) {
      toast("Authentication required", {
        description: "Please log in to message mentors",
      });
      return;
    }
    
    navigate("/messages");
  };
  
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Connect with Alumni Mentors</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Get guidance from experienced professionals who have been in your shoes. Our mentors are eager to share their knowledge and help you succeed.
        </p>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-6 mb-10">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search by name, skills, or keywords..."
              className="pl-10"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={industryFilter} onValueChange={setIndustryFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <div className="flex items-center">
                  <Briefcase className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Industry" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Industries</SelectItem>
                {industries.map(industry => (
                  <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={experienceFilter} onValueChange={setExperienceFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <div className="flex items-center">
                  <Award className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Experience" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any Experience</SelectItem>
                {experienceLevels.map(level => (
                  <SelectItem key={level} value={level.split('+')[0]}>{level}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMentors.length > 0 ? (
          filteredMentors.map((mentor) => (
            <Card key={mentor.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <Avatar className="h-14 w-14 mr-4">
                      <AvatarImage src={mentor.avatar} alt={mentor.name} />
                      <AvatarFallback>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg font-bold">{mentor.name}</CardTitle>
                      <CardDescription className="text-sm font-medium mt-1">
                        {mentor.title} at {mentor.company}
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{mentor.location}</span>
                </div>
                
                <div className="flex items-center text-sm">
                  <Briefcase className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{mentor.experience} experience</span>
                </div>
                
                <div className="flex items-center text-sm">
                  <GraduationCap className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{mentor.education}</span>
                </div>
                
                <Separator />
                
                <div>
                  <p className="text-sm text-gray-700 line-clamp-3">{mentor.bio}</p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {mentor.skills.slice(0, 3).map(skill => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {mentor.skills.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{mentor.skills.length - 3} more
                    </Badge>
                  )}
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between pt-1">
                <div className="text-sm text-green-600 font-medium">
                  {mentor.availability}
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => handleMessage(mentor.id)}
                  >
                    <MessageSquare className="h-4 w-4" />
                    Message
                  </Button>
                  
                  <Button 
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => handleConnect(mentor.id, mentor.name)}
                  >
                    Connect
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <h3 className="text-lg font-medium">No mentors found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search terms or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mentors;
