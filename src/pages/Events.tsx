
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar, MapPin, Clock, Users, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  
  const events = [
    {
      id: "1",
      title: "Annual Alumni Networking Mixer",
      description: "Join us for our annual networking event to reconnect with fellow alumni and make new connections.",
      date: "June 15, 2023",
      time: "6:00 PM - 9:00 PM",
      location: "Grand Ballroom, Alumni Center",
      type: "In-person",
      attendees: 120,
      image: "/placeholder.svg",
      tags: ["Networking", "Social", "All Alumni"]
    },
    {
      id: "2",
      title: "Career Development Workshop",
      description: "Learn effective strategies for career advancement from industry experts and successful alumni.",
      date: "July 10, 2023",
      time: "2:00 PM - 4:00 PM",
      location: "Virtual (Zoom)",
      type: "Virtual",
      attendees: 75,
      image: "/placeholder.svg",
      tags: ["Career", "Workshop", "Professional Development"]
    },
    {
      id: "3",
      title: "Tech Industry Panel Discussion",
      description: "Hear from alumni working at leading tech companies about current trends and career opportunities.",
      date: "August 5, 2023",
      time: "5:30 PM - 7:30 PM",
      location: "Innovation Center, Main Campus",
      type: "Hybrid",
      attendees: 90,
      image: "/placeholder.svg",
      tags: ["Tech", "Panel", "Industry Insights"]
    }
  ];
  
  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Upcoming Alumni Events</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Connect with fellow alumni, expand your network, and stay engaged with our community through these exclusive events.
        </p>
      </div>
      
      <div className="relative max-w-2xl mx-auto mb-10">
        <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search events..."
          className="pl-11 py-6"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      
      <Tabs defaultValue="all" className="max-w-5xl mx-auto">
        <TabsList className="mb-8">
          <TabsTrigger value="all">All Events</TabsTrigger>
          <TabsTrigger value="inperson">In-person</TabsTrigger>
          <TabsTrigger value="virtual">Virtual</TabsTrigger>
          <TabsTrigger value="hybrid">Hybrid</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.length > 0 ? (
            filteredEvents.map(event => (
              <Card key={event.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-48 relative">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover"
                  />
                  <Badge 
                    className="absolute top-4 right-4"
                    variant={event.type === "Virtual" ? "outline" : "default"}
                  >
                    {event.type}
                  </Badge>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {event.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{event.date}</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{event.time}</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{event.location}</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{event.attendees} attendees</span>
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-between">
                  <div className="flex flex-wrap gap-2">
                    {event.tags.slice(0, 2).map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button onClick={() => navigate(`/events/${event.id}`)}>
                    Details
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <h3 className="text-lg font-medium">No events found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search terms</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="inperson" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.filter(event => event.type === "In-person").length > 0 ? (
            filteredEvents
              .filter(event => event.type === "In-person")
              .map(event => (
                <Card key={event.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  {/* Same card content as above */}
                  <div className="h-48 relative">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-full object-cover"
                    />
                    <Badge 
                      className="absolute top-4 right-4"
                      variant="default"
                    >
                      {event.type}
                    </Badge>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {event.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{event.date}</span>
                    </div>
                    
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{event.time}</span>
                    </div>
                    
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{event.location}</span>
                    </div>
                    
                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 mr-2" />
                      <span>{event.attendees} attendees</span>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between">
                    <div className="flex flex-wrap gap-2">
                      {event.tags.slice(0, 2).map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button onClick={() => navigate(`/events/${event.id}`)}>
                      Details
                    </Button>
                  </CardFooter>
                </Card>
              ))
          ) : (
            <div className="col-span-full text-center py-10">
              <h3 className="text-lg font-medium">No in-person events found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search terms</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="virtual" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Similar to inperson tab but for virtual events */}
          {filteredEvents.filter(event => event.type === "Virtual").length > 0 ? (
            filteredEvents
              .filter(event => event.type === "Virtual")
              .map(event => (
                <Card key={event.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  {/* Virtual event card content */}
                  <div className="h-48 relative">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-full object-cover"
                    />
                    <Badge 
                      className="absolute top-4 right-4"
                      variant="outline"
                    >
                      {event.type}
                    </Badge>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {event.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{event.date}</span>
                    </div>
                    
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{event.time}</span>
                    </div>
                    
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{event.location}</span>
                    </div>
                    
                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 mr-2" />
                      <span>{event.attendees} attendees</span>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between">
                    <div className="flex flex-wrap gap-2">
                      {event.tags.slice(0, 2).map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button onClick={() => navigate(`/events/${event.id}`)}>
                      Details
                    </Button>
                  </CardFooter>
                </Card>
              ))
          ) : (
            <div className="col-span-full text-center py-10">
              <h3 className="text-lg font-medium">No virtual events found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search terms</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="hybrid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Similar to inperson tab but for hybrid events */}
          {filteredEvents.filter(event => event.type === "Hybrid").length > 0 ? (
            filteredEvents
              .filter(event => event.type === "Hybrid")
              .map(event => (
                <Card key={event.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  {/* Hybrid event card content */}
                  <div className="h-48 relative">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-full object-cover"
                    />
                    <Badge 
                      className="absolute top-4 right-4"
                    >
                      {event.type}
                    </Badge>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {event.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{event.date}</span>
                    </div>
                    
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{event.time}</span>
                    </div>
                    
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{event.location}</span>
                    </div>
                    
                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 mr-2" />
                      <span>{event.attendees} attendees</span>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between">
                    <div className="flex flex-wrap gap-2">
                      {event.tags.slice(0, 2).map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button onClick={() => navigate(`/events/${event.id}`)}>
                      Details
                    </Button>
                  </CardFooter>
                </Card>
              ))
          ) : (
            <div className="col-span-full text-center py-10">
              <h3 className="text-lg font-medium">No hybrid events found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search terms</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Events;
