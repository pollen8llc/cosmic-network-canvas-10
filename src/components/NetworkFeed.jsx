import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const NetworkFeed = ({ activeView, connections, networkUpdates, networkGrowth }) => {
  if (activeView === 'connections') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {connections.map((connection, index) => (
          <Card key={index}>
            <CardContent className="flex flex-col items-center p-4">
              <Avatar className="w-24 h-24 mb-2">
                <AvatarImage src={connection.avatar} alt={connection.name} />
                <AvatarFallback>{connection.name[0]}</AvatarFallback>
              </Avatar>
              <h3 className="font-semibold">{connection.name}</h3>
              <p className="text-sm text-gray-500">{connection.industry}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (activeView === 'networkValue') {
    return (
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={networkGrowth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#000" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }

  // Default view: network updates
  return (
    <div>
      {networkUpdates.map((update, index) => (
        <Card key={index} className="mb-4">
          <CardContent className="flex items-start p-4">
            <Avatar className="mr-4">
              <AvatarImage src={update.avatar} alt={update.name} />
              <AvatarFallback>{update.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{update.name}</h3>
              <p className="text-sm text-gray-500">{update.content}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default NetworkFeed;