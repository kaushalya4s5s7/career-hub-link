
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/components/ui/sonner";
import { useAuth } from "./AuthContext";

export type EventType = "Webinar" | "Workshop" | "Meetup" | "Conference" | "Networking";

export interface Event {
  id: string;
  title: string;
  description: string;
  type: EventType;
  date: Date;
  location: string;
  isVirtual: boolean;
  link?: string;
  imageUrl?: string;
  organizer: {
    id: string;
    name: string;
    avatar?: string;
  };
  attendees: string[]; // array of user IDs
  createdAt: Date;
}

interface EventContextType {
  events: Event[];
  createEvent: (event: Omit<Event, "id" | "organizer" | "attendees" | "createdAt">) => void;
  getEventById: (id: string) => Event | undefined;
  attendEvent: (eventId: string) => void;
  cancelAttendance: (eventId: string) => void;
  deleteEvent: (eventId: string) => void;
  getUpcomingEvents: () => Event[];
  getUserEvents: () => Event[];
}

const EventContext = createContext<EventContextType | undefined>(undefined);

// Sample events for demo
const SAMPLE_EVENTS: Event[] = [
  {
    id: "event1",
    title: "Web Development Trends 2023",
    description: "Join us for a discussion on the latest trends in web development, including new frameworks, tools, and best practices.",
    type: "Webinar",
    date: new Date(2023, 5, 15, 18, 0), // June 15, 2023, 6:00 PM
    location: "Zoom",
    isVirtual: true,
    link: "https://zoom.us/j/123456789",
    imageUrl: "/lovable-uploads/a1bf22e4-e6bf-4771-8603-a0a83488ca2f.png",
    organizer: {
      id: "1",
      name: "Alex Johnson",
      avatar: "/lovable-uploads/fe71df6c-8c81-40bd-b58e-75a640e77dd1.png"
    },
    attendees: ["2"],
    createdAt: new Date(2023, 4, 20)
  },
  {
    id: "event2",
    title: "Alumni Networking Mixer",
    description: "Connect with fellow alumni over drinks and appetizers. Great opportunity to expand your professional network and catch up with old friends.",
    type: "Networking",
    date: new Date(2023, 5, 25, 19, 0), // June 25, 2023, 7:00 PM
    location: "The Grand Hotel, Downtown",
    isVirtual: false,
    imageUrl: "/lovable-uploads/e5f6d17a-4956-49cf-9023-9e14e457a7e5.png",
    organizer: {
      id: "1",
      name: "Alex Johnson",
      avatar: "/lovable-uploads/fe71df6c-8c81-40bd-b58e-75a640e77dd1.png"
    },
    attendees: ["2"],
    createdAt: new Date(2023, 4, 15)
  }
];

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    // Load sample events
    setEvents(SAMPLE_EVENTS);
  }, []);

  const createEvent = (eventData: Omit<Event, "id" | "organizer" | "attendees" | "createdAt">) => {
    if (!isAuthenticated || !user) {
      toast("Authentication required", {
        description: "Please log in to create an event",
        variant: "destructive",
      });
      return;
    }

    const newEvent: Event = {
      ...eventData,
      id: `event-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      organizer: {
        id: user.id,
        name: user.name,
        avatar: user.avatar
      },
      attendees: [user.id], // Organizer automatically attends
      createdAt: new Date()
    };

    setEvents(prevEvents => [newEvent, ...prevEvents]);
    toast("Event created", {
      description: "Your event has been created successfully!",
    });
  };

  const getEventById = (id: string) => {
    return events.find(event => event.id === id);
  };

  const attendEvent = (eventId: string) => {
    if (!isAuthenticated || !user) {
      toast("Authentication required", {
        description: "Please log in to attend this event",
        variant: "destructive",
      });
      return;
    }

    const event = events.find(e => e.id === eventId);
    
    if (!event) {
      toast("Event not found", {
        description: "The event you're trying to attend doesn't exist",
        variant: "destructive",
      });
      return;
    }

    if (event.attendees.includes(user.id)) {
      toast("Already attending", {
        description: "You are already registered for this event",
      });
      return;
    }

    setEvents(prevEvents => 
      prevEvents.map(e => 
        e.id === eventId
          ? { ...e, attendees: [...e.attendees, user.id] }
          : e
      )
    );

    toast("Registration confirmed", {
      description: "You have successfully registered for this event!",
    });
  };

  const cancelAttendance = (eventId: string) => {
    if (!isAuthenticated || !user) return;

    setEvents(prevEvents => 
      prevEvents.map(event => 
        event.id === eventId
          ? { ...event, attendees: event.attendees.filter(id => id !== user.id) }
          : event
      )
    );

    toast("Attendance canceled", {
      description: "You have canceled your attendance for this event.",
    });
  };

  const deleteEvent = (eventId: string) => {
    if (!isAuthenticated || !user) return;

    const eventToDelete = events.find(event => event.id === eventId);
    
    if (!eventToDelete || eventToDelete.organizer.id !== user.id) {
      toast("Unauthorized", {
        description: "You can only delete events you've organized",
        variant: "destructive",
      });
      return;
    }

    setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
    toast("Event deleted", {
      description: "Your event has been deleted successfully.",
    });
  };

  const getUpcomingEvents = () => {
    const now = new Date();
    return events.filter(event => event.date > now).sort((a, b) => a.date.getTime() - b.date.getTime());
  };

  const getUserEvents = () => {
    if (!user) return [];
    
    return events.filter(event => 
      event.attendees.includes(user.id) || event.organizer.id === user.id
    );
  };

  return (
    <EventContext.Provider 
      value={{ 
        events,
        createEvent,
        getEventById,
        attendEvent,
        cancelAttendance,
        deleteEvent,
        getUpcomingEvents,
        getUserEvents
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = () => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error("useEvent must be used within an EventProvider");
  }
  return context;
};
