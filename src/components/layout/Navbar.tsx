
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  MessageCircle, 
  Bell, 
  Briefcase,
  Calendar,
  Search,
  Users
} from "lucide-react";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface NavbarProps {
  notificationCount?: number;
}

const Navbar = ({ notificationCount = 0 }: NavbarProps) => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">
              AlumniHub<span className="text-neon-green">.</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/feed" className="text-sm font-medium hover:text-neon-green transition-colors">
              Feed
            </Link>
            <Link to="/mentors" className="text-sm font-medium hover:text-neon-green transition-colors">
              Mentors
            </Link>
            <Link to="/jobs" className="text-sm font-medium hover:text-neon-green transition-colors">
              Jobs
            </Link>
            <Link to="/events" className="text-sm font-medium hover:text-neon-green transition-colors">
              Events
            </Link>
          </nav>

          {/* Auth/User Actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated && user ? (
              <>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="hidden md:flex"
                  onClick={() => navigate("/search")}
                >
                  <Search size={20} />
                </Button>
                
                {notificationCount > 0 && (
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="hidden md:flex relative"
                    onClick={() => navigate("/messages")}
                  >
                    <Bell size={20} />
                    <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 min-w-0 h-5 bg-neon-green text-black">
                      {notificationCount}
                    </Badge>
                  </Button>
                )}
                
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="hidden md:flex"
                  onClick={() => navigate("/messages")}
                >
                  <MessageCircle size={20} />
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate(`/profile/${user.id}`)}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/messages")}>
                      <MessageCircle className="mr-2 h-4 w-4" />
                      <span>Messages</span>
                    </DropdownMenuItem>
                    {user.role === "mentor" && (
                      <DropdownMenuItem onClick={() => navigate("/mentorship")}>
                        <Users className="mr-2 h-4 w-4" />
                        <span>Mentorship</span>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={() => navigate("/jobs/bookmarks")}>
                      <Briefcase className="mr-2 h-4 w-4" />
                      <span>Saved Jobs</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/events/calendar")}>
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>My Events</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="hidden md:flex space-x-3">
                <Button variant="outline" onClick={() => navigate("/login")}>
                  Log in
                </Button>
                <Button onClick={() => navigate("/register")}>
                  Sign up
                </Button>
              </div>
            )}
            
            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden py-4 px-4 bg-white/95 backdrop-blur-md border-b border-gray-200">
          <nav className="flex flex-col space-y-4">
            <Link to="/feed" className="px-2 py-1 rounded font-medium hover:bg-gray-100 transition-colors" onClick={toggleMobileMenu}>
              Feed
            </Link>
            <Link to="/mentors" className="px-2 py-1 rounded font-medium hover:bg-gray-100 transition-colors" onClick={toggleMobileMenu}>
              Mentors
            </Link>
            <Link to="/jobs" className="px-2 py-1 rounded font-medium hover:bg-gray-100 transition-colors" onClick={toggleMobileMenu}>
              Jobs
            </Link>
            <Link to="/events" className="px-2 py-1 rounded font-medium hover:bg-gray-100 transition-colors" onClick={toggleMobileMenu}>
              Events
            </Link>
            
            {isAuthenticated ? (
              <>
                <div className="border-t border-gray-200 pt-2 mt-2"></div>
                <Link to={`/profile/${user?.id}`} className="px-2 py-1 rounded font-medium hover:bg-gray-100 transition-colors" onClick={toggleMobileMenu}>
                  Profile
                </Link>
                <Link to="/messages" className="px-2 py-1 rounded font-medium hover:bg-gray-100 transition-colors" onClick={toggleMobileMenu}>
                  Messages
                </Link>
                <Button variant="outline" className="w-full" onClick={handleLogout}>
                  Log out
                </Button>
              </>
            ) : (
              <>
                <div className="border-t border-gray-200 pt-2 mt-2"></div>
                <Button className="w-full" onClick={() => {
                  navigate("/login");
                  toggleMobileMenu();
                }}>
                  Log in
                </Button>
                <Button variant="outline" className="w-full" onClick={() => {
                  navigate("/register");
                  toggleMobileMenu();
                }}>
                  Sign up
                </Button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
