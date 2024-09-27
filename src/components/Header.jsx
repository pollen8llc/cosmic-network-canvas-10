import React from 'react';
import { Button } from "@/components/ui/button";
import { Users, LogOut } from "lucide-react";
import InviteDialog from './InviteDialog';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Header = () => {
  const [isInviteDialogOpen, setIsInviteDialogOpen] = React.useState(false);

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <header className="bg-black p-4 flex justify-between items-center">
      <div className="w-8 h-8 bg-white rounded-full animate-pulse"></div>
      <div className="flex">
        <Button 
          variant="outline" 
          className="text-white border-white bg-black hover:bg-gray-800 flex items-center mr-4"
          onClick={() => setIsInviteDialogOpen(true)}
        >
          <Users className="mr-2 h-4 w-4" />
          Invite Connections
        </Button>
        <Button
          variant="outline"
          className="text-white border-white bg-black hover:bg-gray-800 flex items-center"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
      <InviteDialog isOpen={isInviteDialogOpen} onClose={() => setIsInviteDialogOpen(false)} />
    </header>
  );
};

export default Header;