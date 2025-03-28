
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const navigate = useNavigate();
  
  const handleLogin = () => {
    navigate("/login");
    onClose();
  };
  
  const handleSignUp = () => {
    navigate("/register");
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Join the Alumni Network</DialogTitle>
          <DialogDescription>
            Log in or create an account to like, comment, and connect with mentors and fellow students.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-center font-medium mb-4">Create valuable connections, find mentorship opportunities, and advance your career!</p>
        </div>
        
        <DialogFooter className="flex sm:justify-between sm:space-x-2">
          <Button variant="outline" className="flex-1" onClick={handleLogin}>
            Log in
          </Button>
          <Button className="flex-1" onClick={handleSignUp}>
            Sign up
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
