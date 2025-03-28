
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/components/ui/sonner";
import { useAuth, User } from "./AuthContext";

export type ConnectionStatus = "pending" | "accepted" | "rejected";

export interface Connection {
  id: string;
  menteeId: string;
  mentorId: string;
  menteeName: string;
  mentorName: string;
  menteeAvatar?: string;
  mentorAvatar?: string;
  status: ConnectionStatus;
  message?: string;
  createdAt: Date;
}

export interface Message {
  id: string;
  connectionId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  createdAt: Date;
}

interface ConnectionContextType {
  connections: Connection[];
  messages: Record<string, Message[]>; // connectionId -> messages
  sendConnectionRequest: (mentorId: string, message?: string) => void;
  acceptConnectionRequest: (connectionId: string) => void;
  rejectConnectionRequest: (connectionId: string) => void;
  getConnectionByMentorAndMentee: (mentorId: string, menteeId: string) => Connection | undefined;
  getConnectionById: (connectionId: string) => Connection | undefined;
  getConnectionsByUserId: () => Connection[];
  getPendingRequests: () => Connection[];
  sendMessage: (connectionId: string, content: string) => void;
  getMessagesForConnection: (connectionId: string) => Message[];
}

const ConnectionContext = createContext<ConnectionContextType | undefined>(undefined);

// Sample connections for demo
const SAMPLE_CONNECTIONS: Connection[] = [
  {
    id: "conn1",
    menteeId: "2",
    mentorId: "1",
    menteeName: "Jamie Smith",
    mentorName: "Alex Johnson",
    menteeAvatar: "/lovable-uploads/4ba45356-faf0-4167-ab5d-b27fece3a370.png",
    mentorAvatar: "/lovable-uploads/fe71df6c-8c81-40bd-b58e-75a640e77dd1.png",
    status: "accepted",
    message: "I'd love to learn more about web development from you!",
    createdAt: new Date(2023, 3, 10)
  }
];

// Sample messages for demo
const SAMPLE_MESSAGES: Record<string, Message[]> = {
  "conn1": [
    {
      id: "msg1",
      connectionId: "conn1",
      senderId: "2",
      senderName: "Jamie Smith",
      senderAvatar: "/lovable-uploads/4ba45356-faf0-4167-ab5d-b27fece3a370.png",
      content: "Hi Alex! Thanks for accepting my connection request. I'm really interested in learning more about front-end development.",
      createdAt: new Date(2023, 3, 11, 9, 30)
    },
    {
      id: "msg2",
      connectionId: "conn1",
      senderId: "1",
      senderName: "Alex Johnson",
      senderAvatar: "/lovable-uploads/fe71df6c-8c81-40bd-b58e-75a640e77dd1.png",
      content: "Happy to help, Jamie! Let's set up a call next week to discuss your goals and how I can best support you.",
      createdAt: new Date(2023, 3, 11, 10, 15)
    }
  ]
};

export const ConnectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    // Load sample connections and messages
    setConnections(SAMPLE_CONNECTIONS);
    setMessages(SAMPLE_MESSAGES);
  }, []);

  const sendConnectionRequest = (mentorId: string, message?: string) => {
    if (!isAuthenticated || !user) {
      toast("Authentication required", {
        description: "Please log in to send connection requests",
        variant: "destructive",
      });
      return;
    }

    if (user.role !== "mentee") {
      toast("Unauthorized", {
        description: "Only mentees can send connection requests",
        variant: "destructive",
      });
      return;
    }

    // Check if a connection already exists
    const existingConnection = connections.find(
      conn => conn.menteeId === user.id && conn.mentorId === mentorId
    );

    if (existingConnection) {
      toast("Connection exists", {
        description: "You already have a connection with this mentor",
        variant: "destructive",
      });
      return;
    }

    // Create a new connection
    const newConnection: Connection = {
      id: `conn-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      menteeId: user.id,
      mentorId,
      menteeName: user.name,
      mentorName: "Alex Johnson", // Replace with actual mentor name in real implementation
      menteeAvatar: user.avatar,
      mentorAvatar: "/lovable-uploads/fe71df6c-8c81-40bd-b58e-75a640e77dd1.png", // Replace with actual mentor avatar in real implementation
      status: "pending",
      message,
      createdAt: new Date(),
    };

    setConnections(prevConnections => [...prevConnections, newConnection]);
    toast("Request sent", {
      description: "Your connection request has been sent to the mentor.",
    });
  };

  const acceptConnectionRequest = (connectionId: string) => {
    if (!isAuthenticated || !user) return;

    const connection = connections.find(conn => conn.id === connectionId);
    
    if (!connection || connection.mentorId !== user.id) {
      toast("Unauthorized", {
        description: "You can only accept requests sent to you",
        variant: "destructive",
      });
      return;
    }

    setConnections(prevConnections => 
      prevConnections.map(conn => 
        conn.id === connectionId
          ? { ...conn, status: "accepted" }
          : conn
      )
    );

    toast("Request accepted", {
      description: "You have accepted the connection request.",
    });
  };

  const rejectConnectionRequest = (connectionId: string) => {
    if (!isAuthenticated || !user) return;

    const connection = connections.find(conn => conn.id === connectionId);
    
    if (!connection || connection.mentorId !== user.id) {
      toast("Unauthorized", {
        description: "You can only reject requests sent to you",
        variant: "destructive",
      });
      return;
    }

    setConnections(prevConnections => 
      prevConnections.map(conn => 
        conn.id === connectionId
          ? { ...conn, status: "rejected" }
          : conn
      )
    );

    toast("Request rejected", {
      description: "You have rejected the connection request.",
    });
  };

  const getConnectionByMentorAndMentee = (mentorId: string, menteeId: string) => {
    return connections.find(
      conn => conn.mentorId === mentorId && conn.menteeId === menteeId
    );
  };

  const getConnectionById = (connectionId: string) => {
    return connections.find(conn => conn.id === connectionId);
  };

  const getConnectionsByUserId = () => {
    if (!user) return [];
    
    return connections.filter(
      conn => (conn.mentorId === user.id || conn.menteeId === user.id) && conn.status === "accepted"
    );
  };

  const getPendingRequests = () => {
    if (!user) return [];
    
    return connections.filter(
      conn => conn.mentorId === user.id && conn.status === "pending"
    );
  };

  const sendMessage = (connectionId: string, content: string) => {
    if (!isAuthenticated || !user) {
      toast("Authentication required", {
        description: "Please log in to send messages",
        variant: "destructive",
      });
      return;
    }

    const connection = connections.find(conn => conn.id === connectionId);
    
    if (!connection || (connection.mentorId !== user.id && connection.menteeId !== user.id)) {
      toast("Unauthorized", {
        description: "You can only send messages to your connections",
        variant: "destructive",
      });
      return;
    }

    if (connection.status !== "accepted") {
      toast("Connection not established", {
        description: "You can only message accepted connections",
        variant: "destructive",
      });
      return;
    }

    const newMessage: Message = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      connectionId,
      senderId: user.id,
      senderName: user.name,
      senderAvatar: user.avatar,
      content,
      createdAt: new Date(),
    };

    setMessages(prevMessages => ({
      ...prevMessages,
      [connectionId]: [
        ...(prevMessages[connectionId] || []),
        newMessage
      ]
    }));
  };

  const getMessagesForConnection = (connectionId: string) => {
    return messages[connectionId] || [];
  };

  return (
    <ConnectionContext.Provider 
      value={{ 
        connections,
        messages,
        sendConnectionRequest,
        acceptConnectionRequest,
        rejectConnectionRequest,
        getConnectionByMentorAndMentee,
        getConnectionById,
        getConnectionsByUserId,
        getPendingRequests,
        sendMessage,
        getMessagesForConnection
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
};

export const useConnection = () => {
  const context = useContext(ConnectionContext);
  if (context === undefined) {
    throw new Error("useConnection must be used within a ConnectionProvider");
  }
  return context;
};
