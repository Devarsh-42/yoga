import React from 'react';

const HerbalHighlight = () => {
  return (
    <div className="flex justify-center items-center py-16 px-4 ">
      <div className="bg-gradient-to-br from-[#e9f8ed] to-[#cef0d4] p-10 rounded-2xl max-w-5xl w-full text-center shadow-lg">
        <h2 className="text-3xl sm:text-4xl font-bold text-green-700 mb-4">
          Experience the power of nature
        </h2>
        <p className="text-gray-700 text-lg sm:text-xl mb-8 leading-relaxed">
          Our herbal supplements are crafted with organic ingredients, backed by ancient wisdom and modern science.
        </p>
        <button className="px-6 py-3 border-2 border-green-700 text-green-700 font-semibold rounded-lg hover:bg-green-700 hover:text-white transition duration-300"
        onClick={() => window.location.href = '/herbalstore'}>
          View All Products
        </button>
      </div>
    </div>
  );
};

export default HerbalHighlight;
