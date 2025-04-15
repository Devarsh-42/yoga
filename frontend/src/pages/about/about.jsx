import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="md:w-4/5 mx-auto my-20">
      {/* Header Section */}
      <div className="mb-16">
        <h1 className="text-5xl font-bold text-center dark:text-white">
          About <span className="text-[#ff6b45]">Krushnapriya</span> Yog
        </h1>
        <div className="w-3/4 text-center mx-auto my-4">
          <p className="text-gray-500 dark:text-gray-300">
            Unite the Harmony of Body and Mind.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <img 
            src="https://i.pinimg.com/736x/c4/24/4e/c4244ea5002575bc37fa709a6dc79f9a.jpg" 
            alt="Our Studio" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4 dark:text-white">Our Story</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
          Founded in 2016 by Chandni Adesara, Krushnapriya Yog was established with the aim of making traditional yogic and Ayurvedic practices accessible to all. A certified yoga instructor with YCB Level 1, 2, and 3 qualifications , Chandni brings a deep-rooted understanding of both yoga and Ayurvedic medicinal knowledge. Her expertise extends beyond general practice to include therapeutic yoga tailored to specific medical conditions, holistic wellness guidance, and natural healing through herbs and Ayurvedic advice. Today, Krushnapriya Yog offers a blend of authentic yoga classes, therapy sessions, and Ayurvedic services, creating a space where ancient wisdom supports modern well-being in a grounded, personalized way.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Over the years, we have grown into a comprehensive yoga center offering a diverse range of classes, therapies, and wellness products. Our approach integrates physical postures, breath work, meditation, and philosophical teachings to provide a holistic yoga experience.
          </p>
        </div>
      </div>

      {/* Philosophy Section */}
      <div className="bg-gray-50 dark:bg-[#1e2738] p-10 rounded-2xl mb-20">
        <h2 className="text-3xl font-bold text-center mb-8 dark:text-white">Our Philosophy</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-[#2a3649] p-6 rounded-xl shadow-md">
            <div className="w-16 h-16 bg-[#ff6b45]/20 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#ff6b45]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Authenticity</h3>
            <p className="text-gray-600 dark:text-gray-300">
              We honor the traditional roots of yoga while making it relevant and accessible to modern practitioners of all levels and backgrounds.
            </p>
          </div>
          <div className="bg-white dark:bg-[#2a3649] p-6 rounded-xl shadow-md">
            <div className="w-16 h-16 bg-[#ff6b45]/20 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#ff6b45]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Holistic Wellness</h3>
            <p className="text-gray-600 dark:text-gray-300">
              We believe yoga is a complete system for physical, mental, and spiritual well-being, integrating all aspects of health into our approach.
            </p>
          </div>
          <div className="bg-white dark:bg-[#2a3649] p-6 rounded-xl shadow-md">
            <div className="w-16 h-16 bg-[#ff6b45]/20 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#ff6b45]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Community</h3>
            <p className="text-gray-600 dark:text-gray-300">
              We foster a supportive and inclusive environment where practitioners can connect, grow, and transform together on their yoga journey.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-8 dark:text-white">Our Teachers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Instructor 1 */}
          <div className="bg-white dark:bg-[#1e2738] rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2">
            <div className="h-64 overflow-hidden">
              <img 
                src="/api/placeholder/400/400" 
                alt="Chandni Adesara" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-1 dark:text-white">Chandni Adesara</h3>
              <p className="text-[#ff6b45] font-medium mb-3">Senior Yoga Instructor</p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                With over 10 years of experience, Chandni specializes in Advanced Yoga, Therapy Yoga, and Healthy Yoga practices.
              </p>
              <div className="flex space-x-3">
                <a href="#" className="text-gray-500 hover:text-[#ff6b45] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-[#ff6b45] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-[#ff6b45] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;