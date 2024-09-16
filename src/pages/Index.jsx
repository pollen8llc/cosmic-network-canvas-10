import React, { useState } from 'react';
import Header from '../components/Header';
import ProfileBanner from '../components/ProfileBanner';
import ActionButtons from '../components/ActionButtons';
import NetworkFeed from '../components/NetworkFeed';
import IndustryList from '../components/IndustryList';

const Index = () => {
  const [activeView, setActiveView] = useState('updates');
  const [isIndustryListOpen, setIsIndustryListOpen] = useState(false);

  const username = "JOSEPH FRANCO";
  const connectionCount = 125;
  const networkValue = 1502;

  const connections = [
    { name: "Tim Burkley", avatar: "/placeholder.svg", industry: "Technology" },
    { name: "Amber James", avatar: "/placeholder.svg", industry: "Fashion" },
    // Add more connections...
  ];

  const networkUpdates = [
    { name: "Tim Burkley", avatar: "/placeholder.svg", content: "This is a status update I'm on the internet today" },
    { name: "Amber James", avatar: "/placeholder.svg", content: "This is a status update I'm on the internet today" },
    // Add more updates...
  ];

  const networkGrowth = [
    { date: "Jan", value: 500 },
    { date: "Feb", value: 750 },
    { date: "Mar", value: 1000 },
    { date: "Apr", value: 1250 },
    { date: "May", value: 1502 },
  ];

  const industries = [
    { name: "Fashion", count: 157 },
    { name: "Technology", count: 89 },
    { name: "Finance", count: 45 },
    // Add more industries...
  ];

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
          connectionCount={connectionCount}
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
