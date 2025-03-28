
import { useState } from "react";
import { 
  Card,
  CardContent
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Search, Send, PaperclipIcon, Smile, ChevronRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Messages = () => {
  const { user } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock data for conversations
  const conversations = [
    {
      id: "1",
      user: {
        id: "101",
        name: "Sarah Johnson",
        avatar: "/placeholder.svg",
        status: "online",
        role: "Alumni - Marketing Director"
      },
      lastMessage: {
        text: "I'd be happy to provide some feedback on your resume. When would you like to discuss it?",
        time: "10:30 AM",
        unread: true
      },
      messages: [
        {
          id: "m1",
          sender: "them",
          text: "Hello! I noticed you're looking for mentorship in marketing. I've been in the field for 10 years and would be happy to help.",
          time: "Yesterday, 2:30 PM"
        },
        {
          id: "m2",
          sender: "you",
          text: "Hi Sarah! Thank you so much for reaching out. I'm definitely interested in getting some guidance on breaking into the marketing field.",
          time: "Yesterday, 3:15 PM"
        },
        {
          id: "m3",
          sender: "you",
          text: "Would you be willing to review my resume? I'd love to get your feedback.",
          time: "Yesterday, 3:16 PM"
        },
        {
          id: "m4",
          sender: "them",
          text: "I'd be happy to provide some feedback on your resume. When would you like to discuss it?",
          time: "Today, 10:30 AM"
        }
      ]
    },
    {
      id: "2",
      user: {
        id: "102",
        name: "David Chen",
        avatar: "/placeholder.svg",
        status: "offline",
        role: "Alumni - Software Engineer"
      },
      lastMessage: {
        text: "The internship opportunity at my company would be perfect for you. Let me know if you want me to refer you.",
        time: "Yesterday",
        unread: false
      },
      messages: [
        {
          id: "m1",
          sender: "you",
          text: "Hi David, I saw your post about mentoring students interested in software engineering. I'm currently studying CS and would love some guidance.",
          time: "2 days ago, 1:45 PM"
        },
        {
          id: "m2",
          sender: "them",
          text: "Hey there! Always happy to help fellow students. What specific areas are you interested in?",
          time: "2 days ago, 4:20 PM"
        },
        {
          id: "m3",
          sender: "you",
          text: "I'm particularly interested in web development and would love to get some advice on building a portfolio. Also, I'm looking for internship opportunities for next summer.",
          time: "2 days ago, 5:30 PM"
        },
        {
          id: "m4",
          sender: "them",
          text: "The internship opportunity at my company would be perfect for you. Let me know if you want me to refer you.",
          time: "Yesterday, 9:15 AM"
        }
      ]
    },
    {
      id: "3",
      user: {
        id: "103",
        name: "Michelle Rodriguez",
        avatar: "/placeholder.svg",
        status: "online",
        role: "Career Counselor"
      },
      lastMessage: {
        text: "I've scheduled our mock interview for Thursday at 4PM. Please prepare as if it's a real interview.",
        time: "Monday",
        unread: false
      },
      messages: [
        {
          id: "m1",
          sender: "them",
          text: "Hello! I'm Michelle from the career center. I saw your request for interview preparation assistance.",
          time: "Monday, 11:30 AM"
        },
        {
          id: "m2",
          sender: "you",
          text: "Hi Michelle! Yes, I have a big interview coming up next week and I'm feeling nervous about it.",
          time: "Monday, 12:15 PM"
        },
        {
          id: "m3",
          sender: "them",
          text: "No need to worry, that's what we're here for! Would you like to schedule a mock interview session?",
          time: "Monday, 12:20 PM"
        },
        {
          id: "m4",
          sender: "you",
          text: "That would be great! I'm available any afternoon this week.",
          time: "Monday, 12:45 PM"
        },
        {
          id: "m5",
          sender: "them",
          text: "I've scheduled our mock interview for Thursday at 4PM. Please prepare as if it's a real interview.",
          time: "Monday, 1:30 PM"
        }
      ]
    }
  ];
  
  const filteredConversations = conversations.filter(convo => 
    convo.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    convo.lastMessage.text.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const selectedConvo = conversations.find(convo => convo.id === selectedConversation);
  
  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    
    // In a real app, you would send the message to the backend
    // and then update the UI with the new message
    
    // For now, just clear the input
    setMessageText("");
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 h-[calc(100vh-300px)] min-h-[500px]">
          {/* Conversation List */}
          <div className="col-span-1 border-r border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search messages..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <Tabs defaultValue="all" className="w-full">
              <div className="px-4 pt-2">
                <TabsList className="w-full">
                  <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                  <TabsTrigger value="unread" className="flex-1">Unread</TabsTrigger>
                  <TabsTrigger value="mentors" className="flex-1">Mentors</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="all" className="mt-0">
                <div className="overflow-y-auto h-[calc(100vh-380px)]">
                  {filteredConversations.length > 0 ? (
                    filteredConversations.map((convo) => (
                      <div 
                        key={convo.id}
                        className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                          selectedConversation === convo.id ? 'bg-gray-50' : ''
                        }`}
                        onClick={() => setSelectedConversation(convo.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="relative">
                            <Avatar>
                              <AvatarImage src={convo.user.avatar} alt={convo.user.name} />
                              <AvatarFallback>{convo.user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {convo.user.status === "online" && (
                              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium truncate">{convo.user.name}</h4>
                              <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{convo.lastMessage.time}</span>
                            </div>
                            <p className="text-sm text-gray-600 truncate">{convo.lastMessage.text}</p>
                            <p className="text-xs text-gray-400 mt-1 truncate">{convo.user.role}</p>
                          </div>
                          {convo.lastMessage.unread && (
                            <Badge className="ml-2 h-2 w-2 rounded-full p-0" />
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      No conversations found
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="unread" className="mt-0">
                <div className="overflow-y-auto h-[calc(100vh-380px)]">
                  {filteredConversations.filter(c => c.lastMessage.unread).length > 0 ? (
                    filteredConversations
                      .filter(c => c.lastMessage.unread)
                      .map((convo) => (
                        <div 
                          key={convo.id}
                          className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                            selectedConversation === convo.id ? 'bg-gray-50' : ''
                          }`}
                          onClick={() => setSelectedConversation(convo.id)}
                        >
                          <div className="flex items-start gap-3">
                            <Avatar>
                              <AvatarImage src={convo.user.avatar} alt={convo.user.name} />
                              <AvatarFallback>{convo.user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start">
                                <h4 className="font-medium truncate">{convo.user.name}</h4>
                                <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{convo.lastMessage.time}</span>
                              </div>
                              <p className="text-sm text-gray-600 truncate">{convo.lastMessage.text}</p>
                              <p className="text-xs text-gray-400 mt-1 truncate">{convo.user.role}</p>
                            </div>
                            <Badge className="ml-2 h-2 w-2 rounded-full p-0" />
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      No unread messages
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="mentors" className="mt-0">
                <div className="overflow-y-auto h-[calc(100vh-380px)]">
                  {/* Similar to all but filtered for mentors */}
                  {filteredConversations.filter(c => c.user.role.includes("Alumni")).length > 0 ? (
                    filteredConversations
                      .filter(c => c.user.role.includes("Alumni"))
                      .map((convo) => (
                        <div 
                          key={convo.id}
                          className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                            selectedConversation === convo.id ? 'bg-gray-50' : ''
                          }`}
                          onClick={() => setSelectedConversation(convo.id)}
                        >
                          <div className="flex items-start gap-3">
                            <Avatar>
                              <AvatarImage src={convo.user.avatar} alt={convo.user.name} />
                              <AvatarFallback>{convo.user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start">
                                <h4 className="font-medium truncate">{convo.user.name}</h4>
                                <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{convo.lastMessage.time}</span>
                              </div>
                              <p className="text-sm text-gray-600 truncate">{convo.lastMessage.text}</p>
                              <p className="text-xs text-gray-400 mt-1 truncate">{convo.user.role}</p>
                            </div>
                            {convo.lastMessage.unread && (
                              <Badge className="ml-2 h-2 w-2 rounded-full p-0" />
                            )}
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      No mentor conversations found
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Message Content */}
          <div className="col-span-2 flex flex-col">
            {selectedConvo ? (
              <>
                {/* Header */}
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar className="h-9 w-9 mr-3">
                      <AvatarImage src={selectedConvo.user.avatar} alt={selectedConvo.user.name} />
                      <AvatarFallback>{selectedConvo.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{selectedConvo.user.name}</h3>
                      <p className="text-xs text-gray-500">{selectedConvo.user.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Button variant="ghost" size="sm">
                      View Profile
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
                
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {selectedConvo.messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`flex ${message.sender === 'you' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.sender === 'them' && (
                        <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                          <AvatarImage src={selectedConvo.user.avatar} alt={selectedConvo.user.name} />
                          <AvatarFallback>{selectedConvo.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      )}
                      <div>
                        <div 
                          className={`max-w-md rounded-lg px-4 py-2 ${
                            message.sender === 'you' 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted'
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{message.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Message Input */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-end gap-2">
                    <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
                      <PaperclipIcon className="h-5 w-5" />
                    </Button>
                    <div className="flex-1 relative">
                      <Input
                        placeholder="Type a message..."
                        className="pr-10"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                      />
                      <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7">
                        <Smile className="h-5 w-5" />
                      </Button>
                    </div>
                    <Button size="icon" className="rounded-full" onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-700">Select a conversation</h3>
                  <p className="text-gray-500 mt-2">Choose a conversation from the list to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
