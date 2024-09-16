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

const generateNetworkGrowth = (connections, timeRange) => {
  const baseValue = connections.length * 3.14;
  let dataPoints;
  switch (timeRange) {
    case '1M':
      dataPoints = 30;
      break;
    case '3M':
      dataPoints = 90;
      break;
    case '6M':
      dataPoints = 180;
      break;
    case '1Y':
      dataPoints = 365;
      break;
    default:
      dataPoints = 365;
  }
  return Array.from({ length: dataPoints }, (_, index) => ({
    date: new Date(Date.now() - (dataPoints - index) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    value: Math.round(baseValue * (1 + (Math.random() - 0.5) * 0.2 + index * 0.01)),
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
    likes: Math.floor(Math.random() * 100),
    comments: Array.from({ length: Math.floor(Math.random() * 5) }, (_, i) => ({
      author: `Commenter ${i + 1}`,
      content: `This is comment ${i + 1} on the update.`
    }))
  }));
};

const Index = () => {
  const [activeView, setActiveView] = useState('updates');
  const [isIndustryListOpen, setIsIndustryListOpen] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [timeRange, setTimeRange] = useState('1M');

  const username = "JOSEPH FRANCO";
  const connections = useMemo(() => generateRandomConnections(139), []);
  const networkValue = useMemo(() => Math.round(connections.length * 3.14), [connections]);

  const networkUpdates = useMemo(() => generateNetworkUpdates(connections), [connections]);

  const networkGrowth = useMemo(() => generateNetworkGrowth(connections, timeRange), [connections, timeRange]);

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

  const handleTimeRangeChange = (newTimeRange) => {
    setTimeRange(newTimeRange);
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
          timeRange={timeRange}
          onTimeRangeChange={handleTimeRangeChange}
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
