import React from 'react';
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import InviteDialog from './InviteDialog';

const Header = () => {
  const [isInviteDialogOpen, setIsInviteDialogOpen] = React.useState(false);

  return (
    <header className="bg-black p-4 flex justify-between items-center">
      <div className="w-8 h-8 bg-white rounded-full animate-pulse"></div>
      <Button 
        variant="outline" 
        className="text-white border-white bg-black hover:bg-gray-800 flex items-center"
        onClick={() => setIsInviteDialogOpen(true)}
      >
        <Users className="mr-2 h-4 w-4" />
        Invite Connections
      </Button>
      <InviteDialog isOpen={isInviteDialogOpen} onClose={() => setIsInviteDialogOpen(false)} />
    </header>
  );
};

export default Header;
