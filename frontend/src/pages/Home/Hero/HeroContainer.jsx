import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../../assets/home/kpy_logo.png';
import pose from '../../../assets/home/hero_yoga_pose.jpg';
import pose2 from '../../../assets/home/yoga_pose_2.jpg'; // Ensure this path is correct
import pose3 from '../../../assets/home/yoga_pose_3.jpg'; // Ensure this path is correct
import pose4 from '../../../assets/home/yoga_pose_4.jpg'; // Ensure this path is correct

// Import additional yoga pose images
// You'll need to create or obtain these images
const yogaPoses = [
  pose, 
  // Add paths to your additional images here
  // For example:
  pose2,
  pose3,
  pose4,
];

const HeroSection = () => {
  // State for tracking current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Effect to change image every 30 seconds (or your preferred interval)
  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % yogaPoses.length);
    }, 5000); // 5 seconds
  
    return () => clearInterval(imageInterval);
  }, []);
  

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95, rotate: -2 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { duration: 0.9, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.5, ease: "easeIn" },
    }
  };

  const leafVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const cloudVariants = {
    floating: {
      y: [0, -12, 0],
      x: [0, 5, 0],
      transition: {
        duration: 7,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.section
      className="relative bg-gradient-to-br from-teal-50 via-white to-teal-50 overflow-hidden pt-20 pb-24 md:py-32"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        backgroundSize: '400% 400%',
      }}
    >
      {/* Floating blobs */}
      <motion.div
        className="absolute top-20 right-20 w-40 h-20 bg-teal-600 opacity-10 rounded-full blur-2xl"
        variants={cloudVariants}
        animate="floating"
      />
      <motion.div
        className="absolute top-40 right-56 w-60 h-32 bg-green-500 opacity-10 rounded-full blur-3xl"
        variants={cloudVariants}
        animate="floating"
        transition={{ delay: 1.5 }}
      />
      <motion.div
        className="absolute top-14 left-20 w-36 h-20 bg-orange-300 opacity-10 rounded-full blur-2xl"
        variants={cloudVariants}
        animate="floating"
        transition={{ delay: 0.8 }}
      />

      {/* Gradient background shapes */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-br from-teal-600/20 to-green-400/20 blur-3xl"></div>
      <div className="absolute -bottom-60 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-teal-500/20 to-orange-300/10 blur-3xl"></div>

      <div className="container mx-auto sm:px-6 lg:px-8 flex flex-col md:flex-row items-center relative z-10">
        {/* Left Side */}
        <div className="md:w-1/2 z-10 mb-12 md:mb-0 px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="w-48 h-16 flex items-center">
              <motion.img
                src={logo}
                alt="KrushnamPriya Yoga Logo"
                className="h-full object-contain"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
              <span className="bg-gradient-to-r from-teal-700 to-teal-500 text-transparent bg-clip-text">
                KrushnamPriya
              </span>
              <br />
              <span className="bg-gradient-to-r from-teal-600 to-green-500 text-transparent bg-clip-text">
                Yoga
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={textVariants}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <div className="absolute -left-4 top-1/2 w-1 h-16 bg-gradient-to-b from-teal-600 to-green-400 rounded-full transform -translate-y-1/2"></div>
            <h2 className="text-3xl md:text-4xl font-light text-teal-800 mb-6 pl-2">
              Find Your Inner Peace
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={textVariants}
            transition={{ delay: 0.6 }}
          >
            <p className="text-lg text-teal-700/80 mb-10 max-w-lg leading-relaxed">
              Experience the transformative power of yoga in a nurturing environment.
              Connect with your body, calm your mind, and elevate your spirit through
              our expertly guided classes.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={textVariants}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap gap-6"
          >
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-xl font-medium text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center group"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Your Journey
              <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.button>

            <motion.button
              className="px-8 py-4 bg-white text-teal-600 border border-teal-200 hover:border-teal-400 rounded-xl font-medium text-lg transition-all duration-300 shadow-md hover:shadow-lg"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore Classes
            </motion.button>
          </motion.div>
        </div>

        {/* Right Side */}
        <div className="md:w-1/2 md:pl-12 z-10 px-6">
          <motion.div
            className="relative"
            initial="hidden"
            animate="visible"
            variants={imageVariants}
          >
            <motion.div
              className="absolute -right-6 -bottom-6 w-full h-full bg-teal-600/20 rounded-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            />
            <motion.div
              className="absolute -right-3 -bottom-3 w-full h-full bg-green-500/20 rounded-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            />

            {/* Image carousel */}
            <div className="rounded-2xl overflow-hidden shadow-2xl relative z-10">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={yogaPoses[currentImageIndex]}
                  alt="Yoga pose"
                  className="w-full h-full object-cover rounded-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                />
              </AnimatePresence>
              
              <div className="absolute inset-0 bg-gradient-to-tr from-teal-900/30 via-transparent to-transparent rounded-2xl"></div>
              <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-green-400/30 rounded-full blur-md"></div>
              <div className="absolute top-8 -left-4 w-16 h-16 bg-orange-300/30 rounded-full blur-md"></div>
              
              {/* Image indicators */}
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {yogaPoses.map((_, index) => (
                  <div 
                    key={index} 
                    className={`w-2 h-2 rounded-full ${currentImageIndex === index ? 'bg-white' : 'bg-white/50'}`}
                  ></div>
                ))}
              </div>
            </div>

            <motion.div
              className="absolute right-4 -bottom-14 w-28 h-28"
              variants={leafVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1.2 }}
            >
              <div className="w-full h-full bg-gradient-to-b from-green-400/60 to-green-500/60 rounded-full blur-sm"></div>
            </motion.div>

            <motion.div
              className="absolute -right-8 bottom-20 flex flex-col gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 1.6 }}
            >
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-orange-400 ml-1"></div>
              ))}
            </motion.div>

            <motion.div
              className="absolute top-6 right-6 bg-white/70 backdrop-blur-md px-4 py-2 rounded-full shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
            >
              <span className="text-sm font-medium text-teal-800">Begin Today</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative bottom dots */}
      <div className="absolute bottom-0 left-0 right-0 h-20 opacity-30 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-around">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="w-1 h-1 rounded-full bg-teal-700"></div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default HeroSection;