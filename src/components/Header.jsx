import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-black p-4 flex justify-between items-center">
      <div className="w-8 h-8 bg-white rounded-full animate-pulse"></div>
      <Button variant="outline" className="text-white border-white flex items-center">
        <Link className="mr-2 h-4 w-4" />
        Generate Invite Link
      </Button>
    </header>
  );
};

export default Header;