import React, { useEffect, useState } from 'react';
import useAxiosFetch from '../../../hooks/useAxiosFetch';
import Card from './TherapyCard';

const PopularTherapies = () => {
  const axiosFetch = useAxiosFetch();
  const [therapies, setTherapies] = useState([]);

  useEffect(() => {
    const fetchTherapies = async () => {
      const response = await axiosFetch.get('/popular_therapies');
      setTherapies(response.data);
    };
    fetchTherapies();
  }, []);

  return (
    <div className='md:w-[80%] mx-auto my-36'>
      <div className="text-center">
        <h1 className='text-5xl font-bold dark:text-white'>
          Our <span className='text-blue-500'>Popular</span> Therapies
        </h1>
        <div className="w-[75%] mx-auto my-4">
          <p className='text-gray-500 dark:text-gray-300'>
            Discover therapies that are improving lives through ancient techniques and modern care.
            Selected based on popularity and effectiveness.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {therapies.slice(0, 3).map((item, index) => (
          <div
            key={index}
            className="rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-[#1e2738] transition-all duration-300 hover:-translate-y-2"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={item.image || "/api/placeholder/400/200"}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <h3 className="text-white text-2xl font-bold p-4">{item.name}</h3>
              </div>
            </div>

            <div className="p-6">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {item.description || "Therapy designed to enhance wellness, naturally."}
              </p>

              <div className="flex items-center mb-6">
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-600 dark:text-gray-400">{item.duration || "45 minutes"}</span>
              </div>

              <button
                className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md transition-colors duration-300"
                onClick={() => window.location.href = '/therapies'} // change to dynamic route if needed
              >
                BOOK NOW
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <button
          className="px-8 py-3 border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-medium rounded-md transition-all duration-300 dark:text-blue-400 dark:hover:text-white"
          onClick={() => window.location.href = '/therapies'}
        >
          View More Therapies
        </button>
      </div>
    </div>
  );
};

export default PopularTherapies;
