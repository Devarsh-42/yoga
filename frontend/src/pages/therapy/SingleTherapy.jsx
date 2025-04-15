import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosFetch from '../../hooks/useAxiosFetch';

const SingleTherapy = () => {
  const { id } = useParams();
  const axiosFetch = useAxiosFetch();
  const [therapy, setTherapy] = useState(null);

  useEffect(() => {
    axiosFetch.get(`/therapies/${id}`)
      .then(res => setTherapy(res.data))
      .catch(err => console.error("Error fetching therapy:", err));
  }, [id]);

  if (!therapy) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="md:w-[80%] mx-auto my-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="h-[400px] rounded-lg overflow-hidden shadow-md">
          <img src={therapy.image} alt={therapy.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h2 className="text-4xl font-bold text-green-700 mb-4">{therapy.name}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{therapy.description}</p>
          <div className="flex items-center gap-6 text-lg">
            <span className="text-green-600 font-semibold">${therapy.price}</span>
            <span className="text-gray-500 dark:text-gray-400">{therapy.duration} mins</span>
          </div>
          <button className="mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md">
            Book Session
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleTherapy;