
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { usePost, PostCategory } from "@/contexts/PostContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader 
} from "@/components/ui/card";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Image, 
  Send 
} from "lucide-react";
import { Link } from "react-router-dom";
import LoginModal from "@/components/modals/LoginModal";

const Feed = () => {
  const { user, isAuthenticated } = useAuth();
  const { posts, createPost, likePost, unlikePost, addComment, filterPostsByCategory } = usePost();
  
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostCategory, setNewPostCategory] = useState<PostCategory>("General");
  const [activeTab, setActiveTab] = useState<PostCategory | "All">("All");
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [commentVisibility, setCommentVisibility] = useState<Record<string, boolean>>({});
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleCreatePost = () => {
    if (!newPostContent.trim()) return;
    
    createPost(newPostContent, newPostCategory);
    setNewPostContent("");
  };

  const handleLikeToggle = (postId: string, isLiked: boolean) => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    
    if (isLiked) {
      unlikePost(postId);
    } else {
      likePost(postId);
    }
  };

  const handleCommentVisibility = (postId: string) => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    
    setCommentVisibility(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleAddComment = (postId: string) => {
    const content = commentInputs[postId];
    if (!content?.trim()) return;
    
    addComment(postId, content);
    setCommentInputs(prev => ({
      ...prev,
      [postId]: ""
    }));
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const filteredPosts = filterPostsByCategory(activeTab);

  return (
    <div className="container max-w-5xl px-4 pt-6 pb-12">
      {/* Create Post */}
      <Card className="mb-8">
        <CardHeader className="pb-3">
          <h2 className="text-xl font-semibold">Create Post</h2>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-4">
            <Avatar className="w-10 h-10">
              <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name || "User"} />
              <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder={isAuthenticated ? "What's on your mind?" : "Log in to create a post"}
                className="mb-3 resize-none"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                disabled={!isAuthenticated}
              />
              <div className="flex flex-wrap justify-between items-center gap-2">
                <div className="flex flex-wrap gap-2">
                  <Badge 
                    variant={newPostCategory === "General" ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => isAuthenticated && setNewPostCategory("General")}
                  >
                    General
                  </Badge>
                  <Badge 
                    variant={newPostCategory === "Career Advice" ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => isAuthenticated && setNewPostCategory("Career Advice")}
                  >
                    Career Advice
                  </Badge>
                  <Badge 
                    variant={newPostCategory === "Jobs" ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => isAuthenticated && setNewPostCategory("Jobs")}
                  >
                    Jobs
                  </Badge>
                  <Badge 
                    variant={newPostCategory === "Networking" ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => isAuthenticated && setNewPostCategory("Networking")}
                  >
                    Networking
                  </Badge>
                  <Badge 
                    variant={newPostCategory === "Announcements" ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => isAuthenticated && setNewPostCategory("Announcements")}
                  >
                    Announcements
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    disabled={!isAuthenticated}
                    onClick={() => isAuthenticated || setShowLoginModal(true)}
                  >
                    <Image size={20} />
                  </Button>
                  <Button 
                    disabled={!isAuthenticated || !newPostContent.trim()} 
                    onClick={handleCreatePost}
                  >
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Feed Tabs */}
      <Tabs defaultValue="All" className="mb-8" onValueChange={(value) => setActiveTab(value as PostCategory | "All")}>
        <TabsList className="grid grid-cols-6 w-full">
          <TabsTrigger value="All">All</TabsTrigger>
          <TabsTrigger value="General">General</TabsTrigger>
          <TabsTrigger value="Career Advice">Career</TabsTrigger>
          <TabsTrigger value="Jobs">Jobs</TabsTrigger>
          <TabsTrigger value="Networking">Networking</TabsTrigger>
          <TabsTrigger value="Announcements">Announcements</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-6 space-y-6">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-500">No posts in this category yet.</p>
            </div>
          ) : (
            filteredPosts.map(post => (
              <Card key={post.id} className="overflow-hidden hover-scale">
                <CardHeader className="p-4 pb-0">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <Link to={`/profile/${post.userId}`}>
                        <Avatar>
                          <AvatarImage src={post.userAvatar || "/placeholder.svg"} alt={post.userName} />
                          <AvatarFallback>{post.userName.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </Link>
                      <div>
                        <Link to={`/profile/${post.userId}`} className="font-semibold hover:underline">
                          {post.userName}
                        </Link>
                        <div className="flex items-center text-sm text-gray-500">
                          <Badge variant="outline" className="text-xs mr-2">{post.userRole}</Badge>
                          {formatDate(post.createdAt)}
                        </div>
                      </div>
                    </div>
                    <Badge>{post.category}</Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="p-4">
                  <p className="whitespace-pre-line mb-3">{post.content}</p>
                  {post.imageUrl && (
                    <img 
                      src={post.imageUrl} 
                      alt="Post attachment" 
                      className="rounded-md w-full max-h-80 object-cover"
                    />
                  )}
                </CardContent>
                
                <CardFooter className="p-4 pt-0 border-t flex-col items-start">
                  <div className="w-full flex items-center justify-between mb-3 text-sm">
                    <span>{post.likes.length} likes</span>
                    <span>{post.comments.length} comments</span>
                  </div>
                  
                  <div className="w-full flex items-center justify-between border-t pt-3">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleLikeToggle(post.id, user && post.likes.includes(user.id))}
                    >
                      <Heart 
                        size={18} 
                        className={`mr-1 ${user && post.likes.includes(user.id) ? "fill-red-500 text-red-500" : ""}`} 
                      />
                      Like
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleCommentVisibility(post.id)}
                    >
                      <MessageCircle size={18} className="mr-1" />
                      Comment
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => isAuthenticated || setShowLoginModal(true)}
                    >
                      <Share2 size={18} className="mr-1" />
                      Share
                    </Button>
                  </div>
                  
                  {/* Comments Section */}
                  {(commentVisibility[post.id] || post.comments.length > 0) && (
                    <div className="w-full mt-4 space-y-4">
                      {post.comments.length > 0 && (
                        <div className="space-y-3">
                          {post.comments.map(comment => (
                            <div key={comment.id} className="flex items-start gap-3">
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={comment.userAvatar || "/placeholder.svg"} alt={comment.userName} />
                                <AvatarFallback>{comment.userName.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="bg-gray-100 rounded-2xl p-3">
                                  <Link to={`/profile/${comment.userId}`} className="font-semibold text-sm hover:underline">
                                    {comment.userName}
                                  </Link>
                                  <p className="text-sm">{comment.content}</p>
                                </div>
                                <div className="text-xs text-gray-500 mt-1 ml-2">
                                  {formatDate(comment.createdAt)}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {isAuthenticated && (
                        <div className="flex items-start gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name || "User"} />
                            <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 flex items-end gap-2">
                            <Textarea
                              placeholder="Write a comment..."
                              className="min-h-[60px] resize-none"
                              value={commentInputs[post.id] || ""}
                              onChange={(e) => setCommentInputs(prev => ({
                                ...prev,
                                [post.id]: e.target.value
                              }))}
                            />
                            <Button 
                              size="icon" 
                              disabled={!commentInputs[post.id]?.trim()}
                              onClick={() => handleAddComment(post.id)}
                            >
                              <Send size={16} />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardFooter>
              </Card>
            ))
          )}
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

export default Feed;
