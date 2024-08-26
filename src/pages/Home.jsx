import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-900 flex flex-col items-center justify-center">
      {/* Psychedelic background shapes */}
      <div className="absolute inset-0 z-0">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>

      {/* Content */}
      <div className="z-10 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white animate-pulse">
          Jenn Space
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-green-300">
          Exploring the Intersection of Nature and Jennifer
        </p>
        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Link
            to="/blogs"
            className="inline-block bg-purple-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-purple-500 transition duration-300 transform hover:scale-105"
          >
            Explore my mind
          </Link>
          <Link
            to="/signup"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-500 transition duration-300 transform hover:scale-105"
          >
            Join the cult!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;