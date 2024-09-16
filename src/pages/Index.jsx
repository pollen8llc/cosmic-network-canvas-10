import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import ProfileBanner from '../components/ProfileBanner';
import ActionButtons from '../components/ActionButtons';
import NetworkFeed from '../components/NetworkFeed';
import IndustryList from '../components/IndustryList';
import ProfileLightbox from '../components/ProfileLightbox';

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

const generateNetworkUpdates = (connections) => {
  const updateTypes = ['status', 'poll', 'event'];
  return connections.map(conn => ({
    id: conn.id,
    name: conn.name,
    avatar: conn.avatar,
    industry: conn.industry,
    type: updateTypes[Math.floor(Math.random() * updateTypes.length)],
    content: `This is a ${updateTypes[Math.floor(Math.random() * updateTypes.length)]} update from ${conn.name} in the ${conn.industry} industry.`,
    timestamp: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
  }));
};

const Index = () => {
  const [activeView, setActiveView] = useState('updates');
  const [isIndustryListOpen, setIsIndustryListOpen] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const username = "JOSEPH FRANCO";
  const connections = useMemo(() => generateRandomConnections(139), []);
  const networkValue = useMemo(() => Math.round(connections.length * 3.14), [connections]);

  const networkUpdates = useMemo(() => generateNetworkUpdates(connections), [connections]);

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
      setSelectedIndustry(null);
    }
  };

  const handleProfileBannerClick = () => {
    setActiveView('updates');
    setSelectedIndustry(null);
  };

  const handleIndustrySelect = (industry) => {
    setSelectedIndustry(industry);
    setActiveView('industryUpdates');
    setIsIndustryListOpen(false);
  };

  const handleProfileClick = (profile) => {
    setSelectedProfile(profile);
  };

  const handleCloseLightbox = () => {
    setSelectedProfile(null);
  };

  const handleNodeClick = (node) => {
    setSelectedProfile(node);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <ProfileBanner username={username} onClick={handleProfileBannerClick} />
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
          selectedIndustry={selectedIndustry}
          onProfileClick={handleProfileClick}
        />
      </main>
      <IndustryList
        isOpen={isIndustryListOpen}
        onClose={() => setIsIndustryListOpen(false)}
        industries={industries}
        onIndustrySelect={handleIndustrySelect}
      />
      {selectedProfile && (
        <ProfileLightbox
          profile={selectedProfile}
          connections={connections.slice(0, 10)}
          onClose={handleCloseLightbox}
          onNodeClick={handleNodeClick}
        />
      )}
    </div>
  );
};

export default Index;
