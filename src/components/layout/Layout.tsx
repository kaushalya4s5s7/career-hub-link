
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useConnection } from "@/contexts/ConnectionContext";
import LoginModal from "../modals/LoginModal";
import { useState, useEffect } from "react";

const Layout = () => {
  const { isAuthenticated, user } = useAuth();
  const { getPendingRequests } = useConnection();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    if (isAuthenticated && user?.role === "mentor") {
      const pendingRequests = getPendingRequests();
      setNotificationCount(pendingRequests.length);
    }
  }, [isAuthenticated, user, getPendingRequests]);

  const handleShowLoginModal = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar notificationCount={notificationCount} />
      
      <main className="flex-grow pt-16 pb-12" onClick={handleShowLoginModal}>
        <Outlet />
      </main>
      
      <Footer />
      
      {showLoginModal && !isAuthenticated && (
        <LoginModal 
          isOpen={showLoginModal} 
          onClose={() => setShowLoginModal(false)} 
        />
      )}
    </div>
  );
};

export default Layout;
