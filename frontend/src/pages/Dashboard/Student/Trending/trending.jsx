import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTitle } from "../../../../hooks/useTitle";
import { HashLoader } from 'react-spinners';
import { FaFire, FaUserGraduate, FaLeaf, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MOCK_DATA = {
    classes: [
      {
        _id: '1',
        className: 'Advanced Yoga Flow',
        classImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2120&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        instructorName: 'Priya; Adesara',
        totalEnrolled: 142,
        price: 59.99
      },
      {
        _id: '2',
        className: 'Meditation Basics',
        classImage: 'https://plus.unsplash.com/premium_photo-1674675646725-5b4aca5adb21?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8eW9nYXxlbnwwfHwwfHx8MA%3D%3D',
        instructorName: 'Baba Ramdev',
        totalEnrolled: 98,
        price: 49.99
      },
      {
        _id: '3',
        className: 'Power Yoga',
        classImage: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2100&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        instructorName: 'John Doe',
        totalEnrolled: 120,
        price: 69.99
      },
      {
        _id: '4',
        className: 'Yoga for Beginners',
        classImage: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=2100&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        instructorName: 'Jane Smith',
        totalEnrolled: 85,
        price: 39.99
      }
    ],
    instructors: [
      {
        _id: '1',
        name: 'Mat Mardock',
        photoURL: 'https://imgs.search.brave.com/bnpFRRKyZGe6FfFWDyvg7C60rwCizDRMV8YsylLFfsY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jb21w/b3RlLnNsYXRlLmNv/bS9pbWFnZXMvMDNi/NDMxM2UtMGM3My00/M2YyLWI2MTMtZDk1/MjQzYmU3NjE4Lmpw/ZWc_Y3JvcD0xNTYw/LDEwNDAseDAseTA',
        email: 'rajesh@example.com',
        totalClasses: 12,
        totalStudents: 230
      },
      {
        _id: '2',
        name: 'Batman',
        photoURL: 'https://images.unsplash.com/photo-1596284274000-7d3eca888e3e?q=80&w=2101&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        email: 'meera@example.com',
        totalClasses: 8,
        totalStudents: 175
      },
      {
        _id: '3',
        name: 'Bruce Wayne',
        photoURL: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=2100&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        email: 'bruce@example.com',
        totalClasses: 15,
        totalStudents: 300
      },
      {
        _id: '4',
        name: 'Diana Prince',
        photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2100&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        email: 'diana@example.com',
        totalClasses: 10,
        totalStudents: 250
      }
    ],
    herbals: [
      {
        _id: '1',
        name: 'Ashwagandha Powder',
        image: 'https://images.unsplash.com/photo-1729324738509-7935838d5ef9?q=80&w=1997&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Organic stress-relief adaptogen',
        price: 24.99,
        discount: 10,
        soldCount: 89
      },
      {
        _id: '2',
        name: 'Triphala Capsules',
        image: 'https://images.unsplash.com/photo-1645869794108-400133a0c1c6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Digestive wellness supplement',
        price: 19.99,
        soldCount: 65
      }
      // Add more...
    ],
    therapies: [
      {
        _id: '1',
        name: 'Ayurvedic Massage',
        image: 'https://plus.unsplash.com/premium_photo-1665990294269-f1d6c35ab9d1?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Traditional full body massage',
        duration: 60,
        price: 79.99,
        bookingCount: 56
      },
      {
        _id: '2',
        name: 'Shirodhara Treatment',
        image: 'https://images.unsplash.com/photo-1550504630-cc20eca3b23e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Continuous oil flow treatment for the forehead',
        duration: 45,
        price: 89.99,
        bookingCount: 42
      }
      // Add more...
    ]
  };

const TrendingPage = () => {
  useTitle("Trending | KrushnamPriya Yog");
  
  const [trendingClasses, setTrendingClasses] = useState([]);
  const [trendingInstructors, setTrendingInstructors] = useState([]);
  const [trendingHerbals, setTrendingHerbals] = useState([]);
  const [trendingTherapies, setTrendingTherapies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const useMockData = true;     // Set to true to use mock data

  useEffect(() => {
    const fetchTrendingData = async () => {
      try {
        setLoading(true);
        
        if (useMockData) {
          // Use mock data
          setTrendingClasses(MOCK_DATA.classes);
          setTrendingInstructors(MOCK_DATA.instructors);
          setTrendingHerbals(MOCK_DATA.herbals);
          setTrendingTherapies(MOCK_DATA.therapies);
          setLoading(false);
        } else {
          // Use real API
          const [classesRes, instructorsRes, herbalsRes, therapiesRes] = await Promise.all([
            axios.get('/trending/classes'),
            axios.get('/trending/instructors'),
            axios.get('/trending/herbals'),
            axios.get('/trending/therapies')
          ]);
  
          setTrendingClasses(classesRes.data);
          setTrendingInstructors(instructorsRes.data);
          setTrendingHerbals(herbalsRes.data);
          setTrendingTherapies(therapiesRes.data);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error fetching trending data:', err);
        setError('Failed to load trending data. Please try again later.');
        setLoading(false);
      }
    };

    fetchTrendingData();
  }, []);

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <HashLoader color="#FF1949" size={50} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center p-8 bg-red-50 rounded-lg">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-700">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Trending at KrushnamPriya Yog</h1>
          <p className="text-xl text-gray-600">Discover what's popular in our community right now</p>
        </motion.div>

        {/* Trending Classes Section */}
        <motion.section 
          className="mb-16"
          {...fadeIn}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center mb-6">
            <FaFire className="text-orange-500 text-2xl mr-2" />
            <h2 className="text-2xl font-bold text-gray-800">Trending Classes</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingClasses.length > 0 ? (
              trendingClasses.map((classItem) => (
                <motion.div 
                  key={classItem._id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  whileHover={{ y: -5 }}
                >
                  <div className="relative">
                    <img 
                      src={classItem.classImage} 
                      alt={classItem.className} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-orange-500 text-white py-1 px-2 rounded-full text-xs font-bold flex items-center">
                      <FaFire className="mr-1" />
                      <span>Popular</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{classItem.className}</h3>
                    <p className="text-sm text-gray-600 mb-2">By {classItem.instructorName}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <FaUserGraduate className="text-gray-500 mr-1" />
                        <span className="text-sm text-gray-600">{classItem.totalEnrolled} enrolled</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-bold text-orange-600">${classItem.price}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-3 text-center py-10 bg-white rounded-lg">
                <p className="text-gray-500">No trending classes available at the moment.</p>
              </div>
            )}
          </div>
        </motion.section>

        {/* Trending Instructors Section */}
        <motion.section 
          className="mb-16"
          {...fadeIn}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center mb-6">
            <FaUserGraduate className="text-indigo-500 text-2xl mr-2" />
            <h2 className="text-2xl font-bold text-gray-800">Popular Instructors</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingInstructors.length > 0 ? (
              trendingInstructors.map((instructor) => (
                <motion.div 
                  key={instructor._id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden text-center hover:shadow-lg transition-shadow duration-300"
                  whileHover={{ y: -5 }}
                >
                  <div className="relative">
                    <img 
                      src={instructor.photoURL} 
                      alt={instructor.name} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-2">
                      <div className="flex justify-center">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className="text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">{instructor.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{instructor.email}</p>
                    <div className="mt-2 text-sm">
                      <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                        {instructor.totalClasses || 0} Classes
                      </span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full ml-2">
                        {instructor.totalStudents || 0} Students
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-4 text-center py-10 bg-white rounded-lg">
                <p className="text-gray-500">No trending instructors available at the moment.</p>
              </div>
            )}
          </div>
        </motion.section>

        {/* Trending Herbal Products Section */}
        <motion.section 
          className="mb-16"
          {...fadeIn}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center mb-6">
            <FaLeaf className="text-green-500 text-2xl mr-2" />
            <h2 className="text-2xl font-bold text-gray-800">Trending Herbal Products</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingHerbals.length > 0 ? (
              trendingHerbals.map((herbal) => (
                <motion.div 
                  key={herbal._id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  whileHover={{ y: -5 }}
                >
                  <div className="relative">
                    <img 
                      src={herbal.image} 
                      alt={herbal.name} 
                      className="w-full h-48 object-cover"
                    />
                    {herbal.discount && (
                      <div className="absolute top-2 left-2 bg-green-500 text-white py-1 px-2 rounded-full text-xs font-bold">
                        {herbal.discount}% OFF
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{herbal.name}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{herbal.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="font-bold text-green-600">${herbal.price}</span>
                        {herbal.originalPrice && (
                          <span className="text-sm text-gray-400 line-through ml-2">${herbal.originalPrice}</span>
                        )}
                      </div>
                      <div className="text-sm text-orange-500 font-medium">
                        {herbal.soldCount || 0} sold
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-4 text-center py-10 bg-white rounded-lg">
                <p className="text-gray-500">No trending herbal products available at the moment.</p>
              </div>
            )}
          </div>
        </motion.section>

        {/* Trending Therapies Section */}
        <motion.section 
          className="mb-16"
          {...fadeIn}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5z" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-800">Popular Therapy Services</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingTherapies.length > 0 ? (
              trendingTherapies.map((therapy) => (
                <motion.div 
                  key={therapy._id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  whileHover={{ y: -5 }}
                >
                  <div className="relative">
                    <img 
                      src={therapy.image} 
                      alt={therapy.name} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-2">
                      <p className="text-white font-medium">{therapy.duration} minutes</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{therapy.name}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{therapy.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-purple-600">${therapy.price}</span>
                      <div className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                        {therapy.bookingCount || 0} bookings
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-3 text-center py-10 bg-white rounded-lg">
                <p className="text-gray-500">No trending therapy services available at the moment.</p>
              </div>
            )}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default TrendingPage;