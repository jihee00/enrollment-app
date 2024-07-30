import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './authContext';

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const { authenticated, userName } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!authenticated || !userName) {
      console.error('authenticated and userName are required to fetch profile');
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get('api/students/profile', {
          params: { userName }
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
  }, [authenticated, userName]);

  const updateProfile = async (newProfile) => {
    if (!newProfile.userName) {
      console.error('userName is required to update profile');
      return;
    }
    try {
      const response = await axios.put('/api/students/profile', newProfile, {
        params: { userName: newProfile.userName }
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
