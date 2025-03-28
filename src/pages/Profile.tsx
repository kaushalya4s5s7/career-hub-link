
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth, User } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useConnection } from "@/contexts/ConnectionContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/sonner";
import LoginModal from "@/components/modals/LoginModal";

const Profile = () => {
  const { userId } = useParams();
  const { user: currentUser, isAuthenticated } = useAuth();
  const { sendConnectionRequest, getConnectionByMentorAndMentee } = useConnection();
  
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  // Check if connection exists between current user and profile user
  const connection = currentUser && profileUser && currentUser.id !== profileUser.id
    ? getConnectionByMentorAndMentee(
        profileUser.role === "mentor" ? profileUser.id : currentUser.id,
        profileUser.role === "mentee" ? profileUser.id : currentUser.id
      )
    : undefined;

  useEffect(() => {
    // Simulating API call to fetch user profile
    const fetchProfile = async () => {
      setLoading(true);
      // In a real app, this would be an API call with the userId
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock data for demo
      if (userId === "1") {
        setProfileUser({
          id: "1",
          name: "Alex Johnson",
          email: "alex@example.com",
          avatar: "/lovable-uploads/fe71df6c-8c81-40bd-b58e-75a640e77dd1.png",
          role: "mentor",
          bio: "Tech leader with 10+ years experience in web development. Currently working as a Senior Developer at Google. Passionate about mentoring and helping others grow in their tech careers.",
          skills: ["React", "Node.js", "System Design", "Leadership", "Technical Interviews"],
          experience: [
            "Senior Developer at Google (2020-Present)",
            "Tech Lead at Amazon (2016-2020)",
            "Software Engineer at Microsoft (2012-2016)"
          ],
          mentorshipSlots: 3
        });
      } else if (userId === "2") {
        setProfileUser({
          id: "2",
          name: "Jamie Smith",
          email: "jamie@example.com",
          avatar: "/lovable-uploads/4ba45356-faf0-4167-ab5d-b27fece3a370.png",
          role: "mentee",
          bio: "Computer Science student looking to break into tech. Passionate about web development and AI. Currently working on personal projects to build my portfolio.",
          education: [
            "BSc Computer Science, Stanford University (2020-2024)"
          ],
          interests: ["Web Development", "AI", "Mobile Apps", "Open Source"],
          careerGoals: [
            "Become a full-stack developer",
            "Work at a tech startup",
            "Eventually lead a development team"
          ]
        });
      } else if (currentUser?.id === userId) {
        setProfileUser(currentUser);
      } else {
        // Default fallback profile
        setProfileUser({
          id: userId || "unknown",
          name: "User Not Found",
          email: "unknown@example.com",
          role: "mentee",
          bio: "This user doesn't exist or has a private profile."
        });
      }
      
      setLoading(false);
    };
    
    fetchProfile();
  }, [userId, currentUser]);

  const handleConnect = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    
    if (currentUser?.role !== "mentee") {
      toast("Unauthorized", {
        description: "Only mentees can send connection requests to mentors",
        variant: "destructive",
      });
      return;
    }
    
    if (profileUser?.role !== "mentor") {
      toast("Invalid request", {
        description: "You can only connect with mentors",
        variant: "destructive",
      });
      return;
    }
    
    sendConnectionRequest(profileUser.id, "I'd like to connect with you for mentorship.");
  };

  if (loading) {
    return (
      <div className="container max-w-4xl px-4 py-12">
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-full bg-gray-200 h-32 w-32 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-32 mb-8"></div>
          <div className="h-24 bg-gray-200 rounded w-full max-w-2xl mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!profileUser) {
    return (
      <div className="container max-w-4xl px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">User Not Found</h1>
          <p className="text-gray-600">The profile you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl px-4 py-12">
      {/* Profile Header */}
      <div className="mb-8 text-center">
        <Avatar className="h-32 w-32 mx-auto mb-4">
          <AvatarImage src={profileUser.avatar || "/placeholder.svg"} alt={profileUser.name} />
          <AvatarFallback className="text-4xl">{profileUser.name.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <h1 className="text-3xl font-bold mb-2">{profileUser.name}</h1>
        
        <div className="flex justify-center gap-2 mb-4">
          <Badge className="capitalize">{profileUser.role}</Badge>
        </div>
        
        {profileUser.bio && (
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">{profileUser.bio}</p>
        )}
        
        {/* Connection/Edit buttons */}
        {currentUser?.id !== profileUser.id ? (
          <div className="mb-6">
            {profileUser.role === "mentor" && currentUser?.role === "mentee" && (
              <>
                {!connection ? (
                  <Button onClick={handleConnect}>Connect for Mentorship</Button>
                ) : connection.status === "pending" ? (
                  <Button variant="outline" disabled>Connection Request Sent</Button>
                ) : connection.status === "accepted" ? (
                  <Button variant="outline" asChild>
                    <a href="/messages">Message</a>
                  </Button>
                ) : (
                  <Button onClick={handleConnect}>Send New Request</Button>
                )}
              </>
            )}
          </div>
        ) : (
          <Button className="mb-6" asChild>
            <a href={`/profile/${profileUser.id}/edit`}>Edit Profile</a>
          </Button>
        )}
      </div>
      
      {/* Profile Tabs */}
      <Tabs defaultValue="about" className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          {profileUser.role === "mentor" && (
            <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
          )}
          {profileUser.role === "mentee" && (
            <TabsTrigger value="education">Education</TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="about">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Skills/Interests */}
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold">
                  {profileUser.role === "mentor" ? "Skills" : "Interests"}
                </h3>
              </CardHeader>
              <CardContent>
                {profileUser.role === "mentor" && profileUser.skills ? (
                  <div className="flex flex-wrap gap-2">
                    {profileUser.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                ) : profileUser.role === "mentee" && profileUser.interests ? (
                  <div className="flex flex-wrap gap-2">
                    {profileUser.interests.map((interest, index) => (
                      <Badge key={index} variant="secondary">{interest}</Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No information provided</p>
                )}
              </CardContent>
            </Card>
            
            {/* Experience/Education */}
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold">
                  {profileUser.role === "mentor" ? "Experience" : "Education"}
                </h3>
              </CardHeader>
              <CardContent>
                {profileUser.role === "mentor" && profileUser.experience ? (
                  <ul className="space-y-2 list-disc pl-5">
                    {profileUser.experience.map((exp, index) => (
                      <li key={index}>{exp}</li>
                    ))}
                  </ul>
                ) : profileUser.role === "mentee" && profileUser.education ? (
                  <ul className="space-y-2 list-disc pl-5">
                    {profileUser.education.map((edu, index) => (
                      <li key={index}>{edu}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No information provided</p>
                )}
              </CardContent>
            </Card>
            
            {/* Career Goals (for mentees) */}
            {profileUser.role === "mentee" && profileUser.careerGoals && (
              <Card className="md:col-span-2">
                <CardHeader>
                  <h3 className="text-xl font-semibold">Career Goals</h3>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 list-disc pl-5">
                    {profileUser.careerGoals.map((goal, index) => (
                      <li key={index}>{goal}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
            
            {/* Mentorship Info (for mentors) */}
            {profileUser.role === "mentor" && (
              <Card className="md:col-span-2">
                <CardHeader>
                  <h3 className="text-xl font-semibold">Mentorship Availability</h3>
                </CardHeader>
                <CardContent>
                  <p>
                    Currently mentoring: {profileUser.mentorshipSlots ? 
                      `${3 - (profileUser.mentorshipSlots || 0)}/3 mentees` : 
                      "Not available for new mentees"
                    }
                  </p>
                  {profileUser.mentorshipSlots && profileUser.mentorshipSlots > 0 ? (
                    <p className="text-green-600 mt-2">
                      Available for {profileUser.mentorshipSlots} new mentee{profileUser.mentorshipSlots !== 1 ? 's' : ''}
                    </p>
                  ) : (
                    <p className="text-gray-500 mt-2">
                      At capacity. Not accepting new mentees at this time.
                    </p>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="posts">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-gray-500 py-12">
                Posts tab content will appear here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="mentorship">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-gray-500 py-12">
                Mentorship information will appear here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="education">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-gray-500 py-12">
                Detailed education information will appear here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {showLoginModal && !isAuthenticated && (
        <LoginModal 
          isOpen={showLoginModal} 
          onClose={() => setShowLoginModal(false)} 
        />
      )}
    </div>
  );
};

export default Profile;
