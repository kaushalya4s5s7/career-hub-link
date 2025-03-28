
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/components/ui/sonner";
import { useAuth, User } from "./AuthContext";

export type PostCategory = "Career Advice" | "Jobs" | "Networking" | "Announcements" | "General";

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  userRole: string;
  content: string;
  createdAt: Date;
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  userRole: string;
  content: string;
  imageUrl?: string;
  category: PostCategory;
  likes: string[]; // array of user IDs who liked the post
  comments: Comment[];
  createdAt: Date;
}

interface PostContextType {
  posts: Post[];
  createPost: (content: string, category: PostCategory, imageUrl?: string) => void;
  likePost: (postId: string) => void;
  unlikePost: (postId: string) => void;
  addComment: (postId: string, content: string) => void;
  deletePost: (postId: string) => void;
  filterPostsByCategory: (category: PostCategory | "All") => Post[];
}

const PostContext = createContext<PostContextType | undefined>(undefined);

// Sample posts for demo
const SAMPLE_POSTS: Post[] = [
  {
    id: "1",
    userId: "1",
    userName: "Alex Johnson",
    userAvatar: "/lovable-uploads/fe71df6c-8c81-40bd-b58e-75a640e77dd1.png",
    userRole: "mentor",
    content: "Just hosted a fantastic workshop on modern web development practices. So proud of all the students who participated! #WebDev #Teaching",
    category: "Career Advice",
    likes: ["2"],
    comments: [
      {
        id: "c1",
        postId: "1",
        userId: "2",
        userName: "Jamie Smith",
        userAvatar: "/lovable-uploads/4ba45356-faf0-4167-ab5d-b27fece3a370.png",
        userRole: "mentee",
        content: "Thank you for the workshop! I learned so much about React hooks.",
        createdAt: new Date(2023, 3, 15, 15, 30)
      }
    ],
    createdAt: new Date(2023, 3, 15, 14, 0)
  },
  {
    id: "2",
    userId: "2",
    userName: "Jamie Smith",
    userAvatar: "/lovable-uploads/4ba45356-faf0-4167-ab5d-b27fece3a370.png",
    userRole: "mentee",
    content: "Looking for advice on preparing for technical interviews with major tech companies. Any tips from those who've been through the process?",
    category: "Career Advice",
    likes: ["1"],
    comments: [
      {
        id: "c2",
        postId: "2",
        userId: "1",
        userName: "Alex Johnson",
        userAvatar: "/lovable-uploads/fe71df6c-8c81-40bd-b58e-75a640e77dd1.png",
        userRole: "mentor",
        content: "Focus on data structures and algorithms. I'd be happy to do a mock interview with you!",
        createdAt: new Date(2023, 3, 16, 10, 15)
      }
    ],
    createdAt: new Date(2023, 3, 16, 9, 0)
  },
  {
    id: "3",
    userId: "1",
    userName: "Alex Johnson",
    userAvatar: "/lovable-uploads/fe71df6c-8c81-40bd-b58e-75a640e77dd1.png",
    userRole: "mentor",
    content: "We have several junior developer positions open at our company. If you're a recent graduate with React experience, please DM me for details!",
    imageUrl: "/lovable-uploads/a1bf22e4-e6bf-4771-8603-a0a83488ca2f.png",
    category: "Jobs",
    likes: [],
    comments: [],
    createdAt: new Date(2023, 3, 17, 11, 0)
  }
];

export const PostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    // Load sample posts
    setPosts(SAMPLE_POSTS);
  }, []);

  const createPost = (content: string, category: PostCategory, imageUrl?: string) => {
    if (!isAuthenticated || !user) {
      toast("Authentication required", {
        description: "Please log in to create a post",
        variant: "destructive",
      });
      return;
    }

    const newPost: Post = {
      id: `post-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      userRole: user.role,
      content,
      imageUrl,
      category,
      likes: [],
      comments: [],
      createdAt: new Date(),
    };

    setPosts(prevPosts => [newPost, ...prevPosts]);
    toast("Post created", {
      description: "Your post has been published successfully!",
    });
  };

  const likePost = (postId: string) => {
    if (!isAuthenticated || !user) {
      toast("Authentication required", {
        description: "Please log in to like a post",
        variant: "destructive",
      });
      return;
    }

    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId && !post.likes.includes(user.id)
          ? { ...post, likes: [...post.likes, user.id] }
          : post
      )
    );
  };

  const unlikePost = (postId: string) => {
    if (!isAuthenticated || !user) return;

    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId
          ? { ...post, likes: post.likes.filter(id => id !== user.id) }
          : post
      )
    );
  };

  const addComment = (postId: string, content: string) => {
    if (!isAuthenticated || !user) {
      toast("Authentication required", {
        description: "Please log in to comment",
        variant: "destructive",
      });
      return;
    }

    const newComment: Comment = {
      id: `comment-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      postId,
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      userRole: user.role,
      content,
      createdAt: new Date(),
    };

    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    );

    toast("Comment added", {
      description: "Your comment has been added to the post.",
    });
  };

  const deletePost = (postId: string) => {
    if (!isAuthenticated || !user) return;

    const postToDelete = posts.find(post => post.id === postId);
    
    if (!postToDelete || postToDelete.userId !== user.id) {
      toast("Unauthorized", {
        description: "You can only delete your own posts",
        variant: "destructive",
      });
      return;
    }

    setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    toast("Post deleted", {
      description: "Your post has been deleted successfully.",
    });
  };

  const filterPostsByCategory = (category: PostCategory | "All"): Post[] => {
    if (category === "All") return posts;
    return posts.filter(post => post.category === category);
  };

  return (
    <PostContext.Provider 
      value={{ 
        posts,
        createPost,
        likePost,
        unlikePost,
        addComment,
        deletePost,
        filterPostsByCategory
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error("usePost must be used within a PostProvider");
  }
  return context;
};
