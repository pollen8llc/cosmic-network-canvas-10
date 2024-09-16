import React from 'react';

const ProfileBanner = ({ username }) => {
  return (
    <div className="bg-black p-8 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="stars"></div>
      </div>
      <h1 className="text-white text-4xl font-bold relative z-10">{username}</h1>
    </div>
  );
};

export default ProfileBanner;