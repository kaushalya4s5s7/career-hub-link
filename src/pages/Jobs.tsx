
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Briefcase, MapPin, Building } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const jobs = [
    {
      id: "1",
      title: "Senior Software Engineer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120,000 - $150,000",
      posted: "2 days ago",
      description: "We are looking for a senior software engineer with 5+ years of experience in React and Node.js.",
      tags: ["React", "Node.js", "TypeScript", "AWS"]
    },
    {
      id: "2",
      title: "Product Manager",
      company: "InnovateTech",
      location: "Remote",
      type: "Full-time",
      salary: "$110,000 - $130,000",
      posted: "1 week ago",
      description: "Join our team as a product manager to lead product development initiatives.",
      tags: ["Product Management", "Agile", "UX", "Strategy"]
    },
    {
      id: "3",
      title: "UI/UX Designer",
      company: "DesignWorks",
      location: "New York, NY",
      type: "Contract",
      salary: "$90/hour",
      posted: "3 days ago",
      description: "Looking for a talented UI/UX designer to create beautiful and intuitive interfaces.",
      tags: ["Figma", "Adobe XD", "Prototyping", "User Research"]
    }
  ];
  
  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Find Your Next Career Opportunity</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Browse exclusive job opportunities posted by alumni and partners in our network.
        </p>
      </div>
      
      <div className="relative max-w-2xl mx-auto mb-10">
        <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search by job title, company, or skills..."
          className="pl-11 py-6"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      
      <Tabs defaultValue="all" className="max-w-5xl mx-auto">
        <TabsList className="mb-8">
          <TabsTrigger value="all">All Jobs</TabsTrigger>
          <TabsTrigger value="fulltime">Full-time</TabsTrigger>
          <TabsTrigger value="contract">Contract</TabsTrigger>
          <TabsTrigger value="remote">Remote</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map(job => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{job.title}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <Building className="h-4 w-4 mr-1" />
                        {job.company}
                      </CardDescription>
                    </div>
                    <Badge variant="outline">{job.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{job.location}</span>
                    <span className="mx-2">•</span>
                    <Briefcase className="h-4 w-4 mr-1" />
                    <span>{job.salary}</span>
                  </div>
                  <p className="text-sm mb-4">{job.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {job.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <span className="text-sm text-gray-500">Posted {job.posted}</span>
                  <Button variant="default" size="sm" onClick={() => window.location.href = `/jobs/${job.id}`}>
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="text-center py-10">
              <h3 className="text-lg font-medium">No jobs found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search terms</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="fulltime" className="space-y-6">
          {filteredJobs.filter(job => job.type === "Full-time").length > 0 ? (
            filteredJobs
              .filter(job => job.type === "Full-time")
              .map(job => (
                <Card key={job.id} className="hover:shadow-md transition-shadow">
                  {/* Same card content as above */}
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{job.title}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <Building className="h-4 w-4 mr-1" />
                          {job.company}
                        </CardDescription>
                      </div>
                      <Badge variant="outline">{job.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{job.location}</span>
                      <span className="mx-2">•</span>
                      <Briefcase className="h-4 w-4 mr-1" />
                      <span>{job.salary}</span>
                    </div>
                    <p className="text-sm mb-4">{job.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {job.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <span className="text-sm text-gray-500">Posted {job.posted}</span>
                    <Button variant="default" size="sm" onClick={() => window.location.href = `/jobs/${job.id}`}>
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))
          ) : (
            <div className="text-center py-10">
              <h3 className="text-lg font-medium">No full-time jobs found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search terms</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="contract" className="space-y-6">
          {/* Similar to fulltime tab but for contract jobs */}
          {filteredJobs.filter(job => job.type === "Contract").length > 0 ? (
            filteredJobs
              .filter(job => job.type === "Contract")
              .map(job => (
                <Card key={job.id} className="hover:shadow-md transition-shadow">
                  {/* Job card content */}
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{job.title}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <Building className="h-4 w-4 mr-1" />
                          {job.company}
                        </CardDescription>
                      </div>
                      <Badge variant="outline">{job.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{job.location}</span>
                      <span className="mx-2">•</span>
                      <Briefcase className="h-4 w-4 mr-1" />
                      <span>{job.salary}</span>
                    </div>
                    <p className="text-sm mb-4">{job.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {job.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <span className="text-sm text-gray-500">Posted {job.posted}</span>
                    <Button variant="default" size="sm" onClick={() => window.location.href = `/jobs/${job.id}`}>
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))
          ) : (
            <div className="text-center py-10">
              <h3 className="text-lg font-medium">No contract jobs found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search terms</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="remote" className="space-y-6">
          {/* Similar to fulltime tab but for remote jobs */}
          {filteredJobs.filter(job => job.location === "Remote").length > 0 ? (
            filteredJobs
              .filter(job => job.location === "Remote")
              .map(job => (
                <Card key={job.id} className="hover:shadow-md transition-shadow">
                  {/* Job card content */}
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{job.title}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <Building className="h-4 w-4 mr-1" />
                          {job.company}
                        </CardDescription>
                      </div>
                      <Badge variant="outline">{job.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{job.location}</span>
                      <span className="mx-2">•</span>
                      <Briefcase className="h-4 w-4 mr-1" />
                      <span>{job.salary}</span>
                    </div>
                    <p className="text-sm mb-4">{job.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {job.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <span className="text-sm text-gray-500">Posted {job.posted}</span>
                    <Button variant="default" size="sm" onClick={() => window.location.href = `/jobs/${job.id}`}>
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))
          ) : (
            <div className="text-center py-10">
              <h3 className="text-lg font-medium">No remote jobs found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search terms</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Jobs;
