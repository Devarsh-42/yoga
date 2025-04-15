import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosFetch from '../../hooks/useAxiosFetch';

const SingleHerbal = () => {
  const { id } = useParams();
  const axiosFetch = useAxiosFetch();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axiosFetch.get(`/herbal_products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error("Error fetching product:", err));
  }, [id]);

  if (!product) {
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
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h2 className="text-4xl font-bold text-green-700 mb-4">{product.name}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{product.description}</p>
          <div className="flex items-center gap-6 text-lg">
            <span className="text-green-600 font-semibold">${product.price}</span>
            <span className="text-gray-500 dark:text-gray-400">{product.quantity} in stock</span>
          </div>
          <button className="mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleHerbal;
