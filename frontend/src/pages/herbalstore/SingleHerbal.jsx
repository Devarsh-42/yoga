import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosFetch from '../../hooks/useAxiosFetch';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import { BiTime } from "react-icons/bi";
import { MdOutlineLocalShipping, MdNaturePeople } from "react-icons/md";
import { FaLeaf, FaWeightHanging, FaShoppingCart, FaRegHeart } from "react-icons/fa";
import { GiMedicines } from "react-icons/gi";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { useUser } from '../../hooks/useUser';

const SingleHerbal = () => {
  const { id } = useParams();
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();
  const { currentUser } = useUser();
  
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("tab1");
  
  // Fetch product details
  useEffect(() => {
    axiosFetch.get(`/herbal_products/${id}`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [id, axiosFetch]);
  
  // Fetch related products
  useEffect(() => {
    if (product) {
      axiosFetch.get('/herbal_products')
        .then(res => {
          // Filter to get products with similar category or from same manufacturer
          const filtered = res.data
            .filter(p => p._id !== product._id)
            .filter(p => p.category === product.category || 
                      p.manufacturer === product.manufacturer)
            .slice(0, 3);
          setRelatedProducts(filtered);
        })
        .catch(err => {
          console.error("Error fetching related products:", err);
        });
    }
  }, [product, axiosFetch]);

  const handleAddToCart = (productId) => {
    if (!currentUser) {
      return toast.error('Please Login First');
    }
    
    const data = {
      productId: productId,
      userMail: currentUser.email,
      quantity: 1,
      date: new Date()
    };

    toast.promise(
      axiosSecure.post('/cart/add', data), 
      {
        pending: 'Adding to cart...',
        success: 'Added to cart successfully',
        error: {
          render({ data }) {
            return `Error: ${data?.message || 'Something went wrong'}`;
          }
        }
      }
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <>
      <div className="font-medium text-gray-700 dark:text-white text-lg leading-7 md:w-[80%] w-[90%] mx-auto">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-green-600/10 to-green-600/5 dark:from-[#1e2738] dark:to-[#1e2738] py-16 mt-20 rounded-lg">
          <div className="container text-center">
            <h2 className="text-4xl font-bold mb-2 text-gray-800 dark:text-white">
              {product.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Natural remedies for a healthier lifestyle
            </p>
          </div>
        </div>
        
        <div className="my-10">
          <div className="grid grid-cols-12 gap-8">
            {/* Left Content */}
            <div className="lg:col-span-8 col-span-12">
              <div className="rounded-xl overflow-hidden shadow-lg bg-white dark:bg-[#1e2738]">
                {/* Product Image */}
                <div className="h-[400px] mb-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="rounded-t-xl object-cover w-full h-full block"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/api/placeholder/800/400?text=Image+Not+Available';
                    }}
                  />
                </div>
                
                {/* Product Title */}
                <div className="px-8 pb-8">
                  <h2 className="text-3xl font-bold mb-3 text-gray-800 dark:text-white">{product.name}</h2>

                  {/* Manufacturer Info */}
                  <div className="flex flex-wrap items-center gap-8 mt-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3 group">
                      <div className="h-12 w-12 bg-green-600/20 rounded-full flex items-center justify-center text-green-600">
                        <MdNaturePeople className="text-xl" />
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                          Manufacturer
                        </p>
                        <p className="text-gray-800 dark:text-white font-medium">
                          {product.manufacturer || "Ayurvedic Herbs Inc."}
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Added On
                      </p>
                      <p className="text-gray-800 dark:text-white font-medium">
                        {new Date(product.addedDate || Date.now()).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Tabs Navigation */}
                  <div className="mt-8">
                    <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
                      <button 
                        onClick={() => setActiveTab("tab1")}
                        className={`px-4 py-2 font-medium text-sm mr-2 whitespace-nowrap ${
                          activeTab === "tab1" 
                            ? "text-green-600 border-b-2 border-green-600" 
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        Overview
                      </button>
                      <button 
                        onClick={() => setActiveTab("tab2")}
                        className={`px-4 py-2 font-medium text-sm mr-2 whitespace-nowrap ${
                          activeTab === "tab2" 
                            ? "text-green-600 border-b-2 border-green-600" 
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        Benefits
                      </button>
                      <button 
                        onClick={() => setActiveTab("tab3")}
                        className={`px-4 py-2 font-medium text-sm mr-2 whitespace-nowrap ${
                          activeTab === "tab3" 
                            ? "text-green-600 border-b-2 border-green-600" 
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        Usage Guide
                      </button>
                    </div>
                    
                    {/* Tab Content */}
                    <div className="mt-6">
                      {/* Overview Tab */}
                      {activeTab === "tab1" && (
                        <div>
                          <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Product Description</h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-8">
                            {product.description || 
                            "This premium herbal product is sourced from the purest natural ingredients. Carefully selected herbs are processed using traditional methods to preserve their medicinal properties and deliver maximum health benefits."}
                          </p>
                          
                          <div className="bg-gray-50 dark:bg-[#2a3547] p-6 rounded-lg mb-8">
                            <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Key Benefits</h4>
                            <ul className="grid sm:grid-cols-2 grid-cols-1 gap-4">
                              {(product.benefits || [
                                "Boosts immunity and overall health",
                                "Made with 100% natural ingredients",
                                "No artificial preservatives or chemicals",
                                "Scientifically validated formulation"
                              ]).map((item, index) => (
                                <li key={index} className="flex items-start gap-3">
                                  <div className="flex-none mt-1 text-green-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                  </div>
                                  <div className="flex-1 text-gray-600 dark:text-gray-300">
                                    {item}
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Ingredients</h4>
                            <div className="grid sm:grid-cols-3 grid-cols-1 gap-4 mt-3">
                              {(product.ingredients || [
                                "Ashwagandha", 
                                "Turmeric", 
                                "Holy Basil"
                              ]).map((ingredient, index) => (
                                <div key={index} className="bg-white dark:bg-[#2a3547] rounded-lg p-4 flex items-center gap-3 shadow-sm border border-gray-100 dark:border-gray-700">
                                  <div className="text-green-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                  </div>
                                  <span className="text-gray-700 dark:text-gray-200">
                                    {ingredient}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Benefits Tab */}
                      {activeTab === "tab2" && (
                        <div>
                          <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Health Benefits</h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-6">
                            {product.benefitsDescription || 
                            "Our herbal product offers multiple health benefits backed by traditional wisdom and modern scientific research. Regular use may help improve various aspects of your physical and mental wellbeing."}
                          </p>
                          
                          <div className="bg-gray-50 dark:bg-[#2a3547] p-6 rounded-lg mb-8">
                            <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                              Recommended For: <span className="text-green-600">{product.recommendedFor || "Daily Wellness"}</span>
                            </h4>
                          </div>
                          
                          <div className="space-y-4">
                            {(product.detailedBenefits || [
                              { title: "Immune Support", description: "Strengthens the body's natural defense mechanisms" },
                              { title: "Stress Relief", description: "Helps manage stress and promotes mental clarity" },
                              { title: "Energy & Vitality", description: "Enhances natural energy levels without stimulants" },
                              { title: "Digestive Health", description: "Supports healthy digestion and nutrient absorption" }
                            ]).map((benefit, index) => (
                              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                                <div className="bg-gray-50 dark:bg-[#2a3547] px-6 py-4">
                                  <h5 className="font-semibold text-gray-800 dark:text-white">{benefit.title}</h5>
                                  <p className="text-gray-600 dark:text-gray-300 mt-2">{benefit.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Usage Guide Tab */}
                      {activeTab === "tab3" && (
                        <div>
                          <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">How To Use</h3>
                          
                          <p className="text-gray-600 dark:text-gray-300 mb-6">
                            {product.usageGuide || 
                            "For optimal results, follow the recommended dosage and usage instructions. This product is designed to be incorporated into your daily routine with ease."}
                          </p>
                          
                          <div className="bg-gray-50 dark:bg-[#2a3547] p-6 rounded-lg mb-8">
                            <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Dosage</h4>
                            <p className="text-gray-600 dark:text-gray-300">
                              {product.dosage || "Take 1-2 capsules daily with water after meals, or as directed by your healthcare practitioner."}
                            </p>
                          </div>
                          
                          <div className="space-y-6">
                            <h4 className="text-xl font-bold text-gray-800 dark:text-white">Important Notes</h4>
                            <ul className="space-y-4">
                              {(product.usageNotes || [
                                "Store in a cool, dry place away from direct sunlight",
                                "Keep out of reach of children",
                                "Not intended to diagnose, treat, cure, or prevent any disease",
                                "Consult with a healthcare professional before use if pregnant, nursing, or taking medications"
                              ]).map((note, index) => (
                                <li key={index} className="flex items-start gap-3">
                                  <div className="flex-none mt-1 text-green-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1v-3a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                  </div>
                                  <div className="flex-1 text-gray-600 dark:text-gray-300">
                                    {note}
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Sidebar */}
            <div className="lg:col-span-4 col-span-12">
              <div className="space-y-8">
                {/* Product Info Card */}
                <div className="bg-white dark:bg-[#1e2738] rounded-xl shadow-lg overflow-hidden">
                  <div className="h-48 relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/api/placeholder/400/200?text=Image+Not+Available';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                      <div className="text-white text-2xl font-bold">
                        ₹{product.price}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex gap-3 mb-6">
                      <button 
                        onClick={() => handleAddToCart(product._id)} 
                        className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors duration-300 flex items-center justify-center gap-2"
                      >
                        <FaShoppingCart />
                        Add to Cart
                      </button>
                      <button className="w-12 h-12 rounded-md border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors duration-300">
                        <FaRegHeart className="text-lg" />
                      </button>
                    </div>
                    
                    <ul className="space-y-4">
                      <li className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                          <MdNaturePeople className="text-green-600" />
                          <span>Manufacturer</span>
                        </div>
                        <div className="text-gray-800 dark:text-white font-medium">{product.manufacturer || "Ayurvedic Herbs Inc."}</div>
                      </li>
                      
                      <li className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                          <GiMedicines className="text-green-600" />
                          <span>Form</span>
                        </div>
                        <div className="text-gray-800 dark:text-white font-medium">{product.form || "Capsules"}</div>
                      </li>
                      
                      <li className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                          <BiTime className="text-green-600" />
                          <span>Shelf Life</span>
                        </div>
                        <div className="text-gray-800 dark:text-white font-medium">{product.shelfLife || "24 Months"}</div>
                      </li>
                      
                      <li className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                          <FaLeaf className="text-green-600" />
                          <span>Organic</span>
                        </div>
                        <div className="text-gray-800 dark:text-white font-medium">{product.organic ? "Yes" : "No"}</div>
                      </li>
                      
                      <li className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                          <FaWeightHanging className="text-green-600" />
                          <span>Net Weight</span>
                        </div>
                        <div className="text-gray-800 dark:text-white font-medium">{product.weight || "100g"}</div>
                      </li>
                      
                      <li className="flex justify-between items-center pb-3">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                          <MdOutlineLocalShipping className="text-green-600" />
                          <span>Shipping</span>
                        </div>
                        <div className="text-gray-800 dark:text-white font-medium">{product.freeShipping ? "Free" : "Standard Rate"}</div>
                      </li>
                    </ul>
                    
                    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <p className="mb-3 text-gray-600 dark:text-gray-300">Share This Product:</p>
                      <div className="flex gap-3">
                        <a href="#" className="w-9 h-9 rounded-full bg-green-600/10 flex items-center justify-center text-green-600 hover:bg-green-600 hover:text-white transition-colors">
                          <FaFacebookF />
                        </a>
                        <a href="#" className="w-9 h-9 rounded-full bg-green-600/10 flex items-center justify-center text-green-600 hover:bg-green-600 hover:text-white transition-colors">
                          <FaTwitter />
                        </a>
                        <a href="#" className="w-9 h-9 rounded-full bg-green-600/10 flex items-center justify-center text-green-600 hover:bg-green-600 hover:text-white transition-colors">
                          <FaInstagram />
                        </a>
                        <a href="#" className="w-9 h-9 rounded-full bg-green-600/10 flex items-center justify-center text-green-600 hover:bg-green-600 hover:text-white transition-colors">
                          <FaLinkedinIn />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Related Products */}
                <div className="bg-white dark:bg-[#1e2738] rounded-xl shadow-lg p-6">
                  <h4 className="text-xl font-bold mb-5 text-gray-800 dark:text-white">Related Products</h4>
                  
                  {relatedProducts.length > 0 ? (
                    <ul className="space-y-4">
                      {relatedProducts.map((related, index) => (
                        <li key={index} className="flex gap-3 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0">
                          <div className="flex-none">
                            <div className="h-16 w-16 rounded-md overflow-hidden">
                              <img
                                src={related.image}
                                alt={related.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = '/api/placeholder/100/100?text=Image';
                                }}
                              />
                            </div>
                          </div>
                          <div className="flex-1">
                            <h5 className="font-medium text-gray-800 dark:text-white mb-1 line-clamp-1">
                              {related.name}
                            </h5>
                            <p className="text-green-600 font-semibold">
                              ₹{related.price}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">No related products found</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleHerbal;