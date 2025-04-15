import React from 'react';
import { Bell, Book, Calendar, Clock, Heart, Users, Award, Smile } from 'lucide-react';

const InstructorCP = () => {
  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="relative z-10">
            <div className="flex items-center mb-6">
              <div className="flex justify-center items-center w-16 h-16 bg-teal-500 rounded-full mr-4">
                <Award className="text-white" size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Welcome Onboard, Instructor!</h1>
                <p className="text-gray-600">We're delighted to have you join our Krushnapriya Yog family</p>
              </div>
            </div>
            
            <p className="text-gray-700 mb-6">
              As a certified instructor, you play a vital role in our mission to help others find inner peace and wellness through yoga. Your expertise and passion will guide our community members on their transformative journey.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-teal-50 p-4 rounded-lg">
                <div className="flex items-center text-teal-700 mb-2">
                  <Calendar size={20} className="mr-2" />
                  <span className="font-semibold">Your next class:</span>
                </div>
                <p className="pl-7 text-gray-600">Advanced Yoga - Tomorrow, 9:00 AM</p>
              </div>
              <div className="bg-emerald-50 p-4 rounded-lg">
                <div className="flex items-center text-emerald-700 mb-2">
                  <Users size={20} className="mr-2" />
                  <span className="font-semibold">Students enrolled:</span>
                </div>
                <p className="pl-7 text-gray-600">42 students across all your classes</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Rules and Guidelines */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Book className="mr-3 text-teal-600" />
            Instructor Guidelines
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-teal-100 text-teal-600 mr-4">
                <Clock size={20} />
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-1">Punctuality</h3>
                <p className="text-gray-600 text-sm">Arrive 15 minutes before class and ensure sessions start and end on time.</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 mr-4">
                <Users size={20} />
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-1">Student Safety</h3>
                <p className="text-gray-600 text-sm">Always prioritize student safety and offer modifications for different experience levels.</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-teal-100 text-teal-600 mr-4">
                <Heart size={20} />
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-1">Practice Authenticity</h3>
                <p className="text-gray-600 text-sm">Stay true to traditional yoga principles while incorporating modern approaches.</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 mr-4">
                <Bell size={20} />
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-1">Class Updates</h3>
                <p className="text-gray-600 text-sm">Inform administration at least 48 hours in advance of any schedule changes.</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-teal-100 text-teal-600 mr-4">
                <Smile size={20} />
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-1">Positive Environment</h3>
                <p className="text-gray-600 text-sm">Create an inclusive and supportive atmosphere for all practitioners.</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 mr-4">
                <Award size={20} />
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-1">Continuous Learning</h3>
                <p className="text-gray-600 text-sm">Participate in our quarterly workshops to enhance your teaching skills.</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="font-bold text-gray-800 mb-3">Manage Your Classes</h3>
            <p className="text-gray-600 text-sm mb-4">View schedules, attendance, and student information for all your classes.</p>
            <button className="w-full py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors">
              View Classes
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="font-bold text-gray-800 mb-3">Upload Resources</h3>
            <p className="text-gray-600 text-sm mb-4">Share class materials, sequences, and practice guides with your students.</p>
            <button className="w-full py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors">
              Upload Materials
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="font-bold text-gray-800 mb-3">Contact Support</h3>
            <p className="text-gray-600 text-sm mb-4">Need assistance? Our support team is here to help you with any questions.</p>
            <button className="w-full py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors">
              Get Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorCP;