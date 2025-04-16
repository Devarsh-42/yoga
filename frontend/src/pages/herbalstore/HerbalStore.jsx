import React, { useEffect, useState } from 'react';
import useAxiosFetch from '../../hooks/useAxiosFetch';
import { Link } from 'react-router-dom';

const HerbalStore = () => {
  const axiosFetch = useAxiosFetch();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axiosFetch.get('/herbal_products')
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error fetching products:", err));
  }, [axiosFetch]);

  return (
    <div className="md:w-4/5 mx-auto my-20">
      <div className="mb-16">
        <h1 className="text-5xl font-bold text-center dark:text-white">
          Our <span className="text-green-600">Herbal</span> Products
        </h1>
        <div className="w-3/4 text-center mx-auto my-4">
          <p className="text-gray-500 dark:text-gray-300">
            Explore our range of natural herbal products crafted for your wellness and healing needs.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {products.map((item, index) => (
          <div key={index} className="rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 bg-white dark:bg-gray-800">
            <div className="relative h-48">
              <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <h3 className="text-white text-xl font-bold p-4">{item.name}</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-500 dark:text-gray-300 text-sm mb-4">
                {item.description?.slice(0, 100)}...
              </p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-green-600 font-bold text-lg">₹{item.price}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{item.quantity} in stock</span>
              </div>
              <Link to={`/herbal_products/${item._id}`} className="block">
                <button className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors duration-300">
                  VIEW DETAILS
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HerbalStore;