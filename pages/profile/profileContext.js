import React, { createContext, useContext, useState } from 'react';

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    id: '123456789',
    phone: '123/123-1234',
    address: '1750 Finch Ave E, North York, ON M2J 2X5',
    emergencyContacts: '234/567-6789',
    sin: '123-456-789',
  });

  const updateProfile = (newProfile) => {
    setProfile(newProfile);
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
