// import React, { useEffect, useState } from 'react';
// import useAxiosFetch from '../../hooks/useAxiosFetch';
// import { Transition } from '@headlessui/react';
// import { useUser } from '../../hooks/useUser';
// import { toast } from 'react-toastify';
// import useAxiosSecure from '../../hooks/useAxiosSecure';
// import { Link } from 'react-router-dom';
// const Classes = () => {
//     const [hoveredCard, setHoveredCard] = useState(null);
//     const { currentUser } = useUser();
//     const role = currentUser?.role;
//     const [enrolledClasses, setEnrolledClasses] = useState([]);

//     const handleHover = (index) => {
//         setHoveredCard(index);
//     };

//     const [classes, setClasses] = useState([]);
//     const axiosFetch = useAxiosFetch();
//     const axiosSecure = useAxiosSecure();
//     useEffect(() => {
//         axiosFetch.get('/classes')
//             .then(res => setClasses(res.data))
//             .catch(err => console.log(err))
//     }, [])

//     const handelSelect = (id) => {
//         axiosSecure.get(`/enrolled-classes/${currentUser?.email}`)
//             .then(res => setEnrolledClasses(res.data))
//             .catch(err => console.log(err))
//         if (!currentUser) {
//             return toast.error('Please Login First');
//         }
//         axiosSecure.get(`/cart-item/${id}?email=${currentUser.email}`)
//             .then(res => {
//                 if (res.data.classId === id) {
//                     return toast.error('Already Selected');
//                 }
//                 else if (enrolledClasses.find(item => item.classes._id === id)) {
//                     return toast.error('Already Enrolled');
//                 }
//                 else {
//                     const data = {
//                         classId: id,
//                         userMail: currentUser.email,
//                         date: new Date()
//                     }

//                     toast.promise(axiosSecure.post('/add-to-cart', data)
//                         .then(res => {
//                             console.log(res.data);
//                         })

//                         , {
//                             pending: 'Selecting...',
//                             success: {
//                                 render({ data }) {
//                                     return `Selected Successfully`;
//                                 }
//                             },
//                             error: {
//                                 render({ data }) {
//                                     return `Error: ${data.message}`;
//                                 }
//                             }
//                         });
//                 }
//             })

//     }


//     return (
//         <div>

//             <div className="mt-20 pt-3">
//                 <h1 className="text-4xl font-bold text-center text-dark-primary">Classes</h1>
//             </div>


//             <div className="my-16 w-[90%] gap-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-auto">
//                 {classes.map((cls, index) => (
//                     <div
//                         key={index}
//                         className={`relative hover:-translate-y-2  duration-150 hover:ring-[2px] hover:ring-secondary w-64 h-[350px] mx-auto ${cls.availableSeats < 1 ? 'bg-red-300' : 'bg-white'} dark:bg-slate-600 rounded-lg shadow-lg overflow-hidden cursor-pointer`}
//                         onMouseEnter={() => handleHover(index)}
//                         onMouseLeave={() => handleHover(null)}
//                     >
//                         <div className="relative h-48">
//                             <div
//                                 className={`absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ${hoveredCard === index ? 'opacity-60' : ''
//                                     }`}
//                             />
//                             <img
//                                 src={cls.image}
//                                 alt="Course Image"
//                                 className="object-cover w-full h-full"
//                             />
//                             <Transition
//                                 show={hoveredCard === index}
//                                 enter="transition-opacity duration-300"
//                                 enterFrom="opacity-0"
//                                 enterTo="opacity-100"
//                                 leave="transition-opacity duration-300"
//                                 leaveFrom="opacity-100"
//                                 leaveTo="opacity-0"
//                             >
//                                 <div className="absolute inset-0 flex items-center justify-center">

//                                     <button onClick={() => handelSelect(cls._id)} title={role === 'admin' || role === 'instructor' ? 'Instructor/Admin Can not be able to select ' ? cls.availableSeats <1 : 'No seat avalible' : 'You can select this classes' } disabled={role === 'admin' || role === 'instructor' || cls.availableSeats < 1} className="px-4 py-2 text-white disabled:bg-red-300 bg-secondary duration-300 rounded hover:bg-red-700">
//                                         Select
//                                     </button>

//                                 </div>
//                             </Transition>
//                         </div>
//                         <div className="px-6 py-2">
//                             <h3 className={`${cls.name.length > 25 ? 'text-[14px]' : 'text-[16px]'}  font-bold`}>{cls.name}</h3>
//                             <p className="text-gray-500 text-xs">Instructor : {cls.instructorName}</p>
//                             <div className="flex items-center justify-between mt-4">
//                                 <span className="text-gray-600 text-xs">Available Seats: <span className='text-secondary'>{cls.availableSeats}</span> </span>
//                                 <span className="text-green-500 font-semibold">{cls.price}</span>
//                             </div>
                            
//                             <Link to={`/class/${cls._id}`}><button className="px-4 py-2 mt-4 w-full mx-auto text-white disabled:bg-red-300 bg-secondary duration-300 rounded hover:bg-red-700">
//                                         View
//                                     </button></Link>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Classes;


import React, { useEffect, useState } from 'react';
import useAxiosFetch from '../../hooks/useAxiosFetch';
import { Transition } from '@headlessui/react';
import { useUser } from '../../hooks/useUser';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';

const Classes = () => {
    const [hoveredCard, setHoveredCard] = useState(null);
    const { currentUser } = useUser();
    const role = currentUser?.role;
    const [enrolledClasses, setEnrolledClasses] = useState([]);
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const axiosFetch = useAxiosFetch();
    const axiosSecure = useAxiosSecure();

    const handleHover = (index) => {
        setHoveredCard(index);
    };

    // Fetch classes on component mount
    useEffect(() => {
        setLoading(true);
        axiosFetch.get('/classes')
            .then(res => {
                setClasses(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching classes:", err);
                setError("Failed to load classes. Please try again later.");
                setLoading(false);
            });
    }, []);

    // Fetch enrolled classes for the current user if logged in
    useEffect(() => {
        if (currentUser?.email) {
            axiosSecure.get(`/enrolled-classes/${currentUser.email}`)
                .then(res => setEnrolledClasses(res.data))
                .catch(err => console.error("Error fetching enrolled classes:", err));
        }
    }, [currentUser, axiosSecure]);

    const handleSelect = (id) => {
        if (!currentUser) {
            return toast.error('Please Login First');
        }
        
        // Check if already selected in cart
        axiosSecure.get(`/cart-item/${id}?email=${currentUser.email}`)
            .then(res => {
                if (res.data && res.data.classId === id) {
                    return toast.error('Already Selected');
                }
                else if (enrolledClasses.find(item => item.classes._id === id)) {
                    return toast.error('Already Enrolled');
                }
                else {
                    const data = {
                        classId: id,
                        userMail: currentUser.email,
                        date: new Date()
                    };

                    toast.promise(axiosSecure.post('/add-to-cart', data), {
                        pending: 'Selecting...',
                        success: 'Selected Successfully',
                        error: {
                            render({ data }) {
                                return `Error: ${data?.message || 'Something went wrong'}`;
                            }
                        }
                    });
                }
            })
            .catch(err => {
                console.error("Error checking cart item:", err);
                toast.error("Failed to select class. Please try again.");
            });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#ff6b45]"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-red-500 text-center">
                    <p className="text-xl">{error}</p>
                    <button 
                        className="mt-4 px-4 py-2 bg-[#ff6b45] text-white rounded" 
                        onClick={() => window.location.reload()}
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="md:w-[80%] mx-auto my-20">
            <div className="mb-16">
                <h1 className="text-5xl font-bold text-center dark:text-white">
                    Our <span className="text-[#ff6b45]">Yoga</span> Classes
                </h1>
                <div className="w-[75%] text-center mx-auto my-4">
                    <p className="text-gray-500 dark:text-gray-300">
                        Explore our wide range of yoga classes designed to enhance your physical, mental, and spiritual well-being. 
                        From beginners to advanced practitioners, we have something for everyone.
                    </p>
                </div>
            </div>

            {classes.length === 0 ? (
                <div className="text-center my-16">
                    <p className="text-xl dark:text-white">No classes available at the moment.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                    {classes.map((cls, index) => (
                        <div
                            key={index}
                            className={`rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 ${
                                cls.availableSeats < 1 
                                ? 'bg-red-100 dark:bg-red-900/30' 
                                : 'bg-white dark:bg-[#1e2738]'
                            }`}
                            onMouseEnter={() => handleHover(index)}
                            onMouseLeave={() => handleHover(null)}
                        >
                            <div className="relative h-48">
                                <img
                                    src={cls.image}
                                    alt={cls.name}
                                    className="object-cover w-full h-full"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = '/api/placeholder/400/200?text=Image+Not+Available';
                                    }}
                                />
                                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                                    <h3 className="text-white text-xl font-bold p-4">{cls.name}</h3>
                                </div>
                                <Transition
                                    show={hoveredCard === index}
                                    enter="transition-opacity duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="transition-opacity duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                                        <button 
                                            onClick={() => handleSelect(cls._id)} 
                                            title={
                                                role === 'admin' || role === 'instructor' 
                                                    ? 'Instructor/Admin cannot select classes' 
                                                    : cls.availableSeats < 1 
                                                        ? 'No seats available' 
                                                        : 'Select this class'
                                            } 
                                            disabled={role === 'admin' || role === 'instructor' || cls.availableSeats < 1} 
                                            className="px-6 py-2 text-white disabled:bg-gray-400 bg-[#ff6b45] duration-300 rounded-md hover:bg-[#ff5a30] font-medium"
                                        >
                                            {cls.availableSeats < 1 ? 'Class Full' : 'Select Class'}
                                        </button>
                                    </div>
                                </Transition>
                            </div>
                            <div className="p-6">
                                <p className="text-gray-500 dark:text-gray-300 text-sm mb-4">
                                    Instructor: <span className="font-medium text-gray-700 dark:text-gray-200">{cls.instructorName}</span>
                                </p>
                                
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                        <span className="text-gray-600 dark:text-gray-400">
                                            <span className="text-[#ff6b45]">{cls.availableSeats}</span> seats left
                                        </span>
                                    </div>
                                    <span className="text-[#ff6b45] font-bold text-lg">{cls.price}</span>
                                </div>
                                
                                <div className="flex flex-col space-y-3">
                                    <Link to={`/class/${cls._id}`} className="block">
                                        <button className="w-full py-3 bg-[#ff6b45] hover:bg-[#ff5a30] text-white font-medium rounded-md transition-colors duration-300">
                                            VIEW DETAILS
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Classes;
