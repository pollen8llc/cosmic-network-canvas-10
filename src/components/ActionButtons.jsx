import React from 'react';
import { Button } from "@/components/ui/button";
import { Users, DollarSign, List } from "lucide-react";

const ActionButtons = ({ connectionCount, networkValue, onButtonClick }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between mb-4 gap-2">
      <Button variant="outline" className="flex-1 bg-black text-white hover:bg-gray-800" onClick={() => onButtonClick('connections')}>
        <Users className="mr-2 h-4 w-4" />
        {connectionCount} Connections
      </Button>
      <Button variant="outline" className="flex-1 bg-black text-white hover:bg-gray-800" onClick={() => onButtonClick('networkValue')}>
        <DollarSign className="mr-2 h-4 w-4" />
        Network Value: {networkValue}
      </Button>
      <Button variant="outline" className="flex-1 bg-black text-white hover:bg-gray-800" onClick={() => onButtonClick('industryList')}>
        <List className="mr-2 h-4 w-4" />
        Network Selection
      </Button>
    </div>
  );
};

export default ActionButtons;
