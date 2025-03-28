import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Context Providers
import { AuthProvider } from "./contexts/AuthContext";
import { PostProvider } from "./contexts/PostContext";
import { ConnectionProvider } from "./contexts/ConnectionContext";
import { JobProvider } from "./contexts/JobContext";
import { EventProvider } from "./contexts/EventContext";

// Pages
import Landing from "./pages/Landing";
import Feed from "./pages/Feed";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Messages from "./pages/Messages";
import Mentors from "./pages/Mentors";
import NotFound from "./pages/NotFound";

// Components
import RequireAuth from "./components/shared/RequireAuth";
import Layout from "./components/layout/Layout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <PostProvider>
        <ConnectionProvider>
          <JobProvider>
            <EventProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    <Route element={<Layout />}>
                      <Route
                        path="/feed"
                        element={
                          <RequireAuth>
                            <Feed />
                          </RequireAuth>
                        }
                      />
                      <Route path="/profile/:userId" element={<Profile />} />
                      <Route path="/jobs" element={<Jobs />} />
                      <Route path="/jobs/:jobId" element={<JobDetails />} />
                      <Route path="/events" element={<Events />} />
                      <Route
                        path="/events/:eventId"
                        element={<EventDetails />}
                      />
                      <Route
                        path="/messages"
                        element={
                          <RequireAuth>
                            <Messages />
                          </RequireAuth>
                        }
                      />
                      <Route path="/mentors" element={<Mentors />} />
                    </Route>

                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </TooltipProvider>
            </EventProvider>
          </JobProvider>
        </ConnectionProvider>
      </PostProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
