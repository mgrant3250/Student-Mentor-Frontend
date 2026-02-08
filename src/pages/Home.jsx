import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  

  const [jobs, setJobs] = useState([]);
  const [city, setCity] = useState('Augusta, GA');

    const fetchJobs = async () => {
      try {
        const response = await axios.get(`http://localhost:5003/api/jobs/local?query=developer&location=${encodeURIComponent(city)}`);
        setJobs(response.data.data); 
      } catch (error) {
        console.error('Error fetching job listings:', error);
      }
    };

    useEffect(() => {
    fetchJobs();
    }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-4">
          Welcome to Augusta Tech Alumni Portal
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Connect with alumni, find local job opportunities, and grow your professional network.
        </p>

        <div className="flex justify-center space-x-4 mb-10">
          <Link to="/login">
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-gray-200 text-blue-700 px-6 py-2 rounded hover:bg-gray-300 transition">
              Register
            </button>
          </Link>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Local Job Listings
          </h2>

          <form
            onSubmit={(e) => {
            e.preventDefault();
            fetchJobs(); // call API with new city
            }}
            className="flex space-x-2 mb-6">

          <input
            type="text"
            placeholder="Enter a city (e.g., Atlanta, GA)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full" />

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700">
            Search
          </button>
         </form>
          <ul className="space-y-4">
            {jobs.map((job, index) => (
              <li
                key={index}
                className="p-4 bg-gray-50 border border-gray-200 rounded hover:shadow-sm transition"
              >
                <h3 className="font-medium text-blue-600">{job.job_title}</h3>
                <p className="text-sm text-gray-700">{job.employer_name}</p>
                <p className="text-sm text-gray-500">{job.job_city}, {job.job_state}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
