import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import ProfileBanner from '../components/ProfileBanner';
import ActionButtons from '../components/ActionButtons';
import NetworkFeed from '../components/NetworkFeed';
import IndustryList from '../components/IndustryList';

const generateRandomConnections = (count) => {
  const industries = ['Technology', 'Finance', 'Healthcare', 'Education', 'Marketing', 'Design', 'Engineering', 'Sales'];
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `User ${index + 1}`,
    avatar: `/placeholder.svg`,
    industry: industries[Math.floor(Math.random() * industries.length)],
  }));
};

const generateNetworkGrowth = (connections) => {
  const baseValue = connections.length * 3.14;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map((month, index) => ({
    date: month,
    value: Math.round(baseValue * (1 + (Math.random() - 0.5) * 0.2)), // Fluctuation of ±10%
  }));
};

const Index = () => {
  const [activeView, setActiveView] = useState('updates');
  const [isIndustryListOpen, setIsIndustryListOpen] = useState(false);

  const username = "JOSEPH FRANCO";
  const connections = useMemo(() => generateRandomConnections(139), []);
  const networkValue = useMemo(() => Math.round(connections.length * 3.14), [connections]);

  const networkUpdates = useMemo(() => 
    connections.slice(0, 10).map(conn => ({
      name: conn.name,
      avatar: conn.avatar,
      content: `This is a status update from ${conn.name} in the ${conn.industry} industry.`
    })),
  [connections]);

  const networkGrowth = useMemo(() => generateNetworkGrowth(connections), [connections]);

  const industries = useMemo(() => {
    const industryCount = connections.reduce((acc, conn) => {
      acc[conn.industry] = (acc[conn.industry] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(industryCount).map(([name, count]) => ({ name, count }));
  }, [connections]);

  const handleButtonClick = (view) => {
    if (view === 'industryList') {
      setIsIndustryListOpen(true);
    } else {
      setActiveView(view);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <ProfileBanner username={username} />
      <main className="container mx-auto px-4 py-8">
        <ActionButtons
          connectionCount={connections.length}
          networkValue={networkValue}
          onButtonClick={handleButtonClick}
        />
        <NetworkFeed
          activeView={activeView}
          connections={connections}
          networkUpdates={networkUpdates}
          networkGrowth={networkGrowth}
        />
      </main>
      <IndustryList
        isOpen={isIndustryListOpen}
        onClose={() => setIsIndustryListOpen(false)}
        industries={industries}
      />
    </div>
  );
};

export default Index;
