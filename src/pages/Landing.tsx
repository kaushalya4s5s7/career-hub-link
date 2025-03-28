
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowRight } from "lucide-react";

const Landing = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-white pt-20 md:pt-24 lg:pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-neon-green/20 blur-3xl"></div>
          <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-neon-pink/20 blur-3xl"></div>
        </div>
        
        <div className="container px-4 mx-auto relative z-10">
          <div className="flex flex-col items-center text-center">
            <h1 className="heading-xl max-w-5xl mb-6 animate-fade-in">
              CONNECT, GROW &<br />BUILD YOUR NETWORK
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Join a vibrant community of alumni and students sharing opportunities, knowledge, and connections.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              {isAuthenticated ? (
                <Button size="lg" className="px-8 py-6 text-lg" asChild>
                  <Link to="/feed">
                    Go to Feed
                    <ArrowRight className="ml-2" size={18} />
                  </Link>
                </Button>
              ) : (
                <>
                  <Button size="lg" className="px-8 py-6 text-lg" asChild>
                    <Link to="/register">
                      Join Now
                      <ArrowRight className="ml-2" size={18} />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="px-8 py-6 text-lg" asChild>
                    <Link to="/login">Log in</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Grid */}
      <section className="bg-gray-50 py-20">
        <div className="container px-4 mx-auto">
          <h2 className="heading-md text-center mb-16">What You Can Do</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-sm hover-scale p-8">
              <div className="w-14 h-14 bg-neon-green/20 rounded-lg flex items-center justify-center mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Connect with Mentors</h3>
              <p className="text-gray-600">
                Find experienced professionals in your field who can provide guidance, advice, and support for your career journey.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm hover-scale p-8">
              <div className="w-14 h-14 bg-neon-green/20 rounded-lg flex items-center justify-center mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Discover Job Opportunities</h3>
              <p className="text-gray-600">
                Browse job listings posted by alumni and industry partners, tailored to your skills and interests.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm hover-scale p-8">
              <div className="w-14 h-14 bg-neon-green/20 rounded-lg flex items-center justify-center mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Attend Networking Events</h3>
              <p className="text-gray-600">
                Join webinars, workshops, and meetups to expand your network and learn from industry experts.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-lg mb-6">Ready to connect with your community?</h2>
            <p className="text-xl text-gray-300 mb-10">
              Join thousands of alumni and students already building meaningful connections.
            </p>
            
            {isAuthenticated ? (
              <Button size="lg" className="px-8 py-6 text-lg bg-neon-green text-black hover:bg-neon-green/90" asChild>
                <Link to="/feed">
                  Go to Feed
                  <ArrowRight className="ml-2" size={18} />
                </Link>
              </Button>
            ) : (
              <Button size="lg" className="px-8 py-6 text-lg bg-neon-green text-black hover:bg-neon-green/90" asChild>
                <Link to="/register">
                  Join Now
                  <ArrowRight className="ml-2" size={18} />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container px-4 mx-auto">
          <h2 className="heading-md text-center mb-16">Success Stories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover-scale">
              <div className="flex items-center mb-6">
                <img 
                  src="/lovable-uploads/fe71df6c-8c81-40bd-b58e-75a640e77dd1.png" 
                  alt="Testimonial" 
                  className="w-14 h-14 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-bold">Michael Chen</h3>
                  <p className="text-gray-600 text-sm">Software Engineer at Google</p>
                </div>
              </div>
              <p className="text-gray-700">
                "I connected with my mentor through AlumniHub during my final year of college. Their guidance helped me prepare for interviews and land my dream job at Google. I'm now giving back by mentoring students myself."
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm hover-scale">
              <div className="flex items-center mb-6">
                <img 
                  src="/lovable-uploads/4ba45356-faf0-4167-ab5d-b27fece3a370.png" 
                  alt="Testimonial" 
                  className="w-14 h-14 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-bold">Sophia Rodriguez</h3>
                  <p className="text-gray-600 text-sm">Product Manager at Spotify</p>
                </div>
              </div>
              <p className="text-gray-700">
                "The alumni network has been invaluable for my career transition. I attended several virtual events, connected with professionals in my target industry, and received personalized advice that helped me pivot from marketing to product management."
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
