import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children, email }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!email) {
      console.error('Email is required to fetch profile');
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get('api/students/profile', {
          params: { email }
        });
        if (response.data.success) {
          setProfile(response.data.data);
        } else {
          console.error('Failed to fetch profile:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [email]);

  const updateProfile = async (newProfile) => {
    try {
      const response = await axios.put('/api/students/profile', newProfile, {
        params: { email: newProfile.email }
      });
      if (response.data.success) {
        setProfile(response.data.data);
      } else {
        console.error('Failed to update profile:', response.data.message);
      }    
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
