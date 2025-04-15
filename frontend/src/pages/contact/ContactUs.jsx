import React, { useState } from 'react';
import useAxiosFetch from '../../hooks/useAxiosFetch';

const ContactUs = () => {
  const axiosFetch = useAxiosFetch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    axiosFetch.post('/contact', formData)
      .then(res => {
        setSubmitStatus({ success: true, message: 'Thank you for your message. We will get back to you soon!' });
        setFormData({ name: '', email: '', phone: '', message: '' });
      })
      .catch(err => {
        setSubmitStatus({ success: false, message: 'There was an error sending your message. Please try again later.' });
        console.error("Error submitting form:", err);
      })
      .finally(() => {
        setIsSubmitting(false);
        setTimeout(() => setSubmitStatus(null), 5000);
      });
  };

  // Animation style for yoga illustrations
  const animationStyles = {
    float: {
      animation: 'float 3s ease-in-out infinite',
    },
    bounce: {
      animation: 'bounce 2s ease-in-out infinite',
    },
    breathe: {
      animation: 'breathe 4s ease-in-out infinite',
    }
  };

  return (
    <div className="md:w-[80%] mx-auto my-20">
      <div className="mb-16">
        <h1 className="text-5xl font-bold text-center dark:text-white">
          Contact <span className="text-orange-500">Us</span>
        </h1>
        <div className="w-[75%] text-center mx-auto my-4">
          <p className="text-gray-500 dark:text-gray-300">
            Reach out to us with questions, feedback, or to schedule a session. We're here to help you on your wellness journey.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-white dark:bg-[#1e2738] p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Send Us a Message</h2>
          
          {submitStatus && (
            <div className={`p-4 mb-6 rounded-md ${submitStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {submitStatus.message}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              ></textarea>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-6 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors duration-300 disabled:bg-gray-400"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
        
        {/* Replacing contact info with animated yoga illustrations */}
        <div className="flex flex-col space-y-6">
          {/* Meditation illustration */}
          <div className="bg-white dark:bg-[#1e2738] p-8 rounded-lg shadow-md flex flex-col items-center">
            <div className="mb-4" style={animationStyles.float}>
              <svg width="150" height="150" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="130" r="40" fill="#f97316" opacity="0.2" />
                <circle cx="100" cy="60" r="20" fill="#f97316" />
                <rect x="90" y="80" width="20" height="50" fill="#f97316" />
                <path d="M70 120 C 80 100, 120 100, 130 120" stroke="#f97316" strokeWidth="5" fill="none" />
                <path d="M60 140 C 70 120, 130 120, 140 140" stroke="#f97316" strokeWidth="5" fill="none" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Find Inner Peace</h3>
            <p className="text-center text-gray-600 dark:text-gray-400 mt-2">
              Join our meditation sessions to discover tranquility and mindfulness
            </p>
          </div>
          
          {/* Yoga pose illustration */}
          <div className="bg-white dark:bg-[#1e2738] p-8 rounded-lg shadow-md flex flex-col items-center">
            <div className="mb-4" style={animationStyles.breathe}>
              <svg width="150" height="150" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="100" r="50" fill="#4ade80" opacity="0.2" />
                <circle cx="100" cy="50" r="20" fill="#4ade80" />
                <path d="M90 70 L 80 120 L 120 120 L 110 70" fill="#4ade80" />
                <path d="M70 90 L 130 90" stroke="#4ade80" strokeWidth="5" />
                <path d="M70 150 L 90 120" stroke="#4ade80" strokeWidth="5" />
                <path d="M130 150 L 110 120" stroke="#4ade80" strokeWidth="5" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Transform Your Body</h3>
            <p className="text-center text-gray-600 dark:text-gray-400 mt-2">
              Experience physical wellness through our ancient yoga traditions
            </p>
          </div>
          
        </div>
      </div>
      
      {/* Added CSS keyframes for animations */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
};

export default ContactUs;