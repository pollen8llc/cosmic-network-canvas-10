import React from 'react';
import { Button } from "@/components/ui/button";
import { Users, DollarSign, List } from "lucide-react";

const ActionButtons = ({ connectionCount, networkValue, onButtonClick }) => {
  return (
    <div className="flex justify-between mb-4">
      <Button variant="outline" className="flex-1 mr-2" onClick={() => onButtonClick('connections')}>
        <Users className="mr-2 h-4 w-4" />
        {connectionCount} Connections
      </Button>
      <Button variant="outline" className="flex-1 mx-2" onClick={() => onButtonClick('networkValue')}>
        <DollarSign className="mr-2 h-4 w-4" />
        Network Value: {networkValue}
      </Button>
      <Button variant="outline" className="flex-1 ml-2" onClick={() => onButtonClick('industryList')}>
        <List className="mr-2 h-4 w-4" />
        Network Selection
      </Button>
    </div>
  );
};

export default ActionButtons;