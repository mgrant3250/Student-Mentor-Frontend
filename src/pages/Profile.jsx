import React, {useEffect, useState} from 'react';
import API from '../api/api';
import{useNavigate} from 'react-router-dom'

  
const Profile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const res = await API.get('/users/me');
          setUser(res.data);
        } catch (err) {
          console.error('Failed to fetch profile:', err);
          navigate('/login');
        }
      };
  
      fetchProfile();
    }, [navigate]);
  
  
    if (!user) return <div>Loading profile...</div>

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <img
            src={user.profileImageUrl || "https://www.gravatar.com/avatar/?d=mp"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover mb-4 md:mb-0 md:mr-6 border"
          />

          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-gray-600">{user.jobTitle} at {user.organization}</p>
            <p className="text-sm text-gray-500">Graduated: {user.graduation}</p>
            <p className="text-sm text-gray-500">Email: {user.email}</p>

            {user.wantsToMentor && (
              <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                Available to Mentor
              </span>
            )}

            <div className="mt-4 space-x-4">
              <a
                href={user.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                GitHub
              </a>
              <a
                href={user.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Profile;

