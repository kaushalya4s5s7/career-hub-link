import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

export type UserRole = "mentor" | "mentee" | "guest";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  bio?: string;
  skills?: string[];
  experience?: string[];
  education?: string[];
  interests?: string[];
  careerGoals?: string[];
  mentorshipSlots?: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    name: string,
    role: UserRole
  ) => Promise<void>;
  logout: () => void;
  googleLogin: () => Promise<void>;
  linkedinLogin: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Sample users for demo
const DEMO_USERS = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar: "/lovable-uploads/fe71df6c-8c81-40bd-b58e-75a640e77dd1.png",
    role: "mentor" as UserRole,
    bio: "Tech leader with 10+ years experience in web development",
    skills: ["React", "Node.js", "System Design"],
    experience: ["Senior Developer at Google", "Tech Lead at Amazon"],
    mentorshipSlots: 3,
  },
  {
    id: "2",
    name: "Jamie Smith",
    email: "jamie@example.com",
    avatar: "/lovable-uploads/4ba45356-faf0-4167-ab5d-b27fece3a370.png",
    role: "mentee" as UserRole,
    bio: "Computer Science student looking to break into tech",
    education: ["BSc Computer Science"],
    interests: ["Web Development", "AI", "Mobile Apps"],
    careerGoals: ["Become a full-stack developer", "Work at a tech startup"],
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("alumniUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const foundUser = DEMO_USERS.find((u) => u.email === email);
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem("alumniUser", JSON.stringify(foundUser));
        toast("Login successful", {
          description: `Welcome back, ${foundUser.name}!`,
        });
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      toast("Login failed", {
        description:
          error instanceof Error
            ? error.message
            : "Please check your credentials",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    email: string,
    password: string,
    name: string,
    role: UserRole
  ) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newUser = {
        id: Math.random().toString(36).substring(7),
        name,
        email,
        role,
        avatar: "/placeholder.svg",
      };

      setUser(newUser);
      localStorage.setItem("alumniUser", JSON.stringify(newUser));
      toast("Registration successful", {
        description: `Welcome to the network, ${name}!`,
      });
    } catch (error) {
      toast("Registration failed", {
        description:
          error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("alumniUser");
    toast("Logged out successfully");
  };

  const googleLogin = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const randomUser =
        DEMO_USERS[Math.floor(Math.random() * DEMO_USERS.length)];
      setUser(randomUser);
      localStorage.setItem("alumniUser", JSON.stringify(randomUser));
      toast("Google login successful", {
        description: `Welcome back, ${randomUser.name}!`,
      });
    } catch (error) {
      toast("Google login failed", {
        description: "Please try again later",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const linkedinLogin = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const randomUser =
        DEMO_USERS[Math.floor(Math.random() * DEMO_USERS.length)];
      setUser(randomUser);
      localStorage.setItem("alumniUser", JSON.stringify(randomUser));
      toast("LinkedIn login successful", {
        description: `Welcome back, ${randomUser.name}!`,
      });
    } catch (error) {
      toast("LinkedIn login failed", {
        description: "Please try again later",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        googleLogin,
        linkedinLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
