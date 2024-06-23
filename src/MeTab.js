import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Book, User } from 'lucide-react';

const MeTab = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/user-data')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        return response.json();
      })
      .then(data => {
        setUserData(data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!userData) return <div>No user data available</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-400 via-green-300 to-blue-500 flex flex-col">
      <div className="flex-grow p-4">
        <div className="bg-white bg-opacity-90 rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full mx-auto">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">My Info</h1>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                <span className="text-lg font-medium text-gray-600">Weight</span>
                <span className="text-lg text-gray-800">{userData.weight}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                <span className="text-lg font-medium text-gray-600">Height</span>
                <span className="text-lg text-gray-800">{userData.height}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                <span className="text-lg font-medium text-gray-600">Age</span>
                <span className="text-lg text-gray-800">{userData.age}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                <span className="text-lg font-medium text-gray-600">Dietary Preference</span>
                <span className="text-lg text-gray-800">{userData.dietaryPreference}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                <span className="text-lg font-medium text-gray-600">Activity Level</span>
                <span className="text-lg text-gray-800">{userData.activityLevel}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeTab;