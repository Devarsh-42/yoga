// import React, { useEffect, useState } from 'react';
// import useAxiosFetch from '../../../hooks/useAxiosFetch';
// import Card from './Card';

// const PopularClasses = () => {
//     const axiosFetch = useAxiosFetch();
//     const [classes, setClasses] = useState([]);
//     useEffect(()=>{
//         const fetchClasses = async () => {
//             const response = await axiosFetch.get('/popular_classes');
//             setClasses(response.data);
//         };
//         fetchClasses();
//     },[])
//     return (
//         <div className='md:w-[80%] mx-auto my-36'>
//             <div className="">
//                 <h1 className='text-5xl font-bold text-center'>Our <span className='text-secondary'>Popular</span> Classes</h1>
//                 <div className="w-[40%] text-center mx-auto my-4">
//                     <p className='text-gray-500'>Explore our Popular Classes . Here is some popular classes based  on How many student enrolled</p>
//                 </div>
//             </div>


//         <div className="grid  md:grid-cols-2 lg:grid-cols-3">
//             {
//                 classes.map((item, index) => <Card id={item._id} key={index} availableSeats={item.availableSeats} price={item.price} name={item.name} image={item.image} totalEnrolled={item.totalEnrolled} />)
//             }
//         </div>

//         </div>
//     );
// };

// export default PopularClasses;

import React, { useEffect, useState } from 'react';
import useAxiosFetch from '../../../hooks/useAxiosFetch';
import Card from './Card';

const PopularClasses = () => {
    const axiosFetch = useAxiosFetch();
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        const fetchClasses = async () => {
            const response = await axiosFetch.get('/popular_classes');
            setClasses(response.data);
        };
        fetchClasses();
    }, []);

    return (
        <div className='md:w-[80%] mx-auto my-36'>
            <div className="">
                <h1 className='text-5xl font-bold text-center dark:text-white'>
                    Our <span className='text-[#ff6b45]'>Yoga</span> Classes
                </h1>
                <div className="w-[75%] text-center mx-auto my-4">
                    <p className='text-gray-500 dark:text-gray-300'>
                        Discover a variety of yoga classes designed to enhance your physical, mental, and spiritual well-being. Our experienced instructors guide you through practices suited for all levels and needs.
                    </p>
                </div>
            </div>

            {/* Card section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                {classes.slice(0, 3).map((item, index) => (
                    <div
                        key={index}
                        className="rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-[#1e2738] transition-all duration-300 hover:-translate-y-2"
                    >
                        <div className="relative h-48 overflow-hidden">
                            <img 
                                src={item.image || "/api/placeholder/400/200"} 
                                alt={item.name} 
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                                <h3 className="text-white text-2xl font-bold p-4">{item.name}</h3>
                            </div>
                        </div>
                        
                        <div className="p-6">
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                {item.description || 
                                 (item.name === "Basic Yoga" ? "Gentle introduction to foundational yoga poses and breathing techniques" : 
                                  item.name === "Hatha Yoga" ? "Traditional approach focusing on physical postures and breath control" :
                                  item.name === "Prenatal Yoga" ? "Safe practices designed specifically for expectant mothers" : 
                                  "A yoga class designed to enhance your well-being")}
                            </p>
                            
                            <div className="flex items-center mb-6">
                                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-gray-600 dark:text-gray-400">
                                    {item.name === "Prenatal Yoga" ? "45 minutes" : "60 minutes"}
                                </span>
                            </div>
                            
                            <button className="w-full py-3 bg-[#ff6b45] hover:bg-[#ff5a30] text-white font-medium rounded-md transition-colors duration-300">
                                BOOK NOW
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-12">
                <button 
                    className="px-8 py-3 border-2 border-[#ff6b45] text-[#ff6b45] hover:bg-[#ff6b45] hover:text-white font-medium rounded-md transition-all duration-300 dark:text-[#ff6b45] dark:hover:text-white"
                    onClick={() => window.location.href = '/classes'} // Change this to your desired route
                >
                    View More Classes
                </button>
            </div>
        </div>
    );
};

export default PopularClasses;