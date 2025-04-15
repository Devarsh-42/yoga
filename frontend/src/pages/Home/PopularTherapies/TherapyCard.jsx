import React from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useUser } from '../../../hooks/useUser';

const TherapyCard = ({ name, image, availableSeats, price, totalEnrolled, id: itmId }) => {
  const axiosSecure = useAxiosSecure();
  const { currentUser } = useUser();
  const role = currentUser?.role;

  const handleSelect = (id) => {
    if (!currentUser) return toast.error('Please Login First');

    axiosSecure.get(`/cart-item/${id}`).then((res) => {
      if (res.data.classId === id) {
        return toast.error('Already Selected');
      } else {
        const data = {
          classId: id,
          userMail: currentUser.email,
          date: new Date(),
        };

        toast.promise(axiosSecure.post('/add-to-cart', data), {
          pending: 'Selecting...',
          success: 'Selected Successfully',
          error: {
            render({ data }) {
              return `Error: ${data.message}`;
            }
          }
        });
      }
    });
  };

  return (
    <motion.div
      className="shadow-lg rounded-lg p-3 flex flex-col justify-between border border-blue-400 overflow-hidden m-4"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <motion.img
        loading='lazy'
        className="h-48 w-full object-cover"
        src={image}
        alt={name}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 dark:text-white">{name}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-1">Seats: {availableSeats}</p>
        <p className="text-gray-600 dark:text-gray-300 mb-1">Price: ₹{price}</p>
        <p className="text-gray-600 dark:text-gray-300 mb-3">Enrolled: {totalEnrolled}</p>
        <button
          onClick={() => handleSelect(itmId)}
          className="w-full bg-blue-500 text-white py-2 rounded-md font-bold hover:bg-blue-600 transition-colors"
        >
          Select
        </button>
      </div>
    </motion.div>
  );
};

export default TherapyCard;
