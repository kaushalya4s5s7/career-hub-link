
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
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Share2, 
  Calendar as CalendarIcon,
  ArrowLeft,
  ExternalLink
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const EventDetails = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  // Mock event data based on ID
  const event = {
    id: eventId,
    title: "Annual Alumni Networking Mixer",
    description: "Join us for our annual networking event to reconnect with fellow alumni and make new connections. This evening will feature keynote speakers, panel discussions, and opportunities to network with professionals from various industries.",
    date: "June 15, 2023",
    time: "6:00 PM - 9:00 PM",
    location: "Grand Ballroom, Alumni Center",
    address: "123 University Ave, Campus Town, CA 94305",
    type: "In-person",
    attendees: 120,
    capacity: 200,
    image: "/placeholder.svg",
    organizer: {
      name: "Alumni Association",
      avatar: "/placeholder.svg"
    },
    schedule: [
      { time: "6:00 PM - 6:30 PM", activity: "Registration & Welcome Drinks" },
      { time: "6:30 PM - 7:15 PM", activity: "Keynote Address: 'Networking in the Digital Age'" },
      { time: "7:15 PM - 8:15 PM", activity: "Panel Discussion: 'Career Transitions & Opportunities'" },
      { time: "8:15 PM - 9:00 PM", activity: "Open Networking & Refreshments" }
    ],
    speakers: [
      { name: "Jane Smith", title: "CEO, TechInnovate", avatar: "/placeholder.svg" },
      { name: "Robert Johnson", title: "Director, Global Finance Group", avatar: "/placeholder.svg" },
      { name: "Priya Patel", title: "VP of Marketing, Consumer Brands Inc.", avatar: "/placeholder.svg" }
    ],
    tags: ["Networking", "Social", "All Alumni", "Professional Development"]
  };
  
  const handleRegister = () => {
    if (!isAuthenticated) {
      toast("Authentication required", {
        description: "Please log in to register for this event",
      });
      return;
    }
    
    // Handle registration logic
    toast.success("Registration successful", {
      description: "You have been registered for this event",
    });
  };
  
  const handleAddToCalendar = () => {
    if (!isAuthenticated) {
      toast("Authentication required", {
        description: "Please log in to add this event to your calendar",
      });
      return;
    }
    
    toast.success("Event added to calendar", {
      description: "This event has been added to your calendar",
    });
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied", {
      description: "Event link has been copied to your clipboard",
    });
  };
  
  return (
    <div className="container mx-auto py-12 px-4">
      <Button 
        variant="ghost" 
        className="mb-6 flex items-center gap-2"
        onClick={() => navigate('/events')}
      >
        <ArrowLeft size={16} />
        Back to all events
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <div className="relative h-64 md:h-80">
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <Badge className="text-sm">{event.type}</Badge>
              </div>
            </div>
            
            <CardHeader>
              <CardTitle className="text-2xl font-bold">{event.title}</CardTitle>
              <CardDescription className="text-base flex items-center">
                Organized by {event.organizer.name}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Date</p>
                    <p className="text-sm text-gray-500">{event.date}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Time</p>
                    <p className="text-sm text-gray-500">{event.time}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-gray-500">{event.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Attendees</p>
                    <p className="text-sm text-gray-500">{event.attendees} of {event.capacity}</p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-semibold mb-2">About this event</h3>
                <p className="text-sm text-gray-700">{event.description}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Event Schedule</h3>
                <div className="space-y-3">
                  {event.schedule.map((item, index) => (
                    <div key={index} className="flex">
                      <div className="w-36 text-sm font-medium">{item.time}</div>
                      <div className="flex-1 text-sm text-gray-700">{item.activity}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Featured Speakers</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {event.speakers.map((speaker, index) => (
                    <div key={index} className="flex flex-col items-center text-center">
                      <Avatar className="h-16 w-16 mb-2">
                        <AvatarImage src={speaker.avatar} />
                        <AvatarFallback>{speaker.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <h4 className="font-medium text-sm">{speaker.name}</h4>
                      <p className="text-xs text-gray-500">{speaker.title}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Location</h3>
                <p className="text-sm text-gray-700 mb-2">{event.address}</p>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <ExternalLink size={14} />
                  Open in Maps
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2 pt-2">
                {event.tags.map(tag => (
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
              <CardTitle className="text-xl">Register for this event</CardTitle>
              <CardDescription>
                {event.capacity - event.attendees} spots remaining
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{event.date}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                <span>{event.time}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{event.location}</span>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col gap-3">
              <Button className="w-full" onClick={handleRegister}>
                Register Now
              </Button>
              
              <div className="flex gap-2 w-full">
                <Button variant="outline" className="flex-1" onClick={handleAddToCalendar}>
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Add to Calendar
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

export default EventDetails;
