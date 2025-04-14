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

    const handleHover = (index) => {
        setHoveredCard(index);
    };

    const [classes, setClasses] = useState([]);
    const axiosFetch = useAxiosFetch();
    const axiosSecure = useAxiosSecure();
    useEffect(() => {
        axiosFetch.get('/classes')
            .then(res => setClasses(res.data))
            .catch(err => console.log(err))
    }, [])

    const handelSelect = (id) => {
        axiosSecure.get(`/enrolled-classes/${currentUser?.email}`)
            .then(res => setEnrolledClasses(res.data))
            .catch(err => console.log(err))
        if (!currentUser) {
            return toast.error('Please Login First');
        }
        axiosSecure.get(`/cart-item/${id}?email=${currentUser.email}`)
            .then(res => {
                if (res.data.classId === id) {
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
                    }

                    toast.promise(axiosSecure.post('/add-to-cart', data)
                        .then(res => {
                            console.log(res.data);
                        })

                        , {
                            pending: 'Selecting...',
                            success: {
                                render({ data }) {
                                    return `Selected Successfully`;
                                }
                            },
                            error: {
                                render({ data }) {
                                    return `Error: ${data.message}`;
                                }
                            }
                        });
                }
            })

    }


    return (
        <div>

            <div className="mt-20 pt-3">
                <h1 className="text-4xl font-bold text-center text-dark-primary">Classes</h1>
            </div>


            <div className="my-16 w-[90%] gap-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-auto">
                {classes.map((cls, index) => (
                    <div
                        key={index}
                        className={`relative hover:-translate-y-2  duration-150 hover:ring-[2px] hover:ring-secondary w-64 h-[350px] mx-auto ${cls.availableSeats < 1 ? 'bg-red-300' : 'bg-white'} dark:bg-slate-600 rounded-lg shadow-lg overflow-hidden cursor-pointer`}
                        onMouseEnter={() => handleHover(index)}
                        onMouseLeave={() => handleHover(null)}
                    >
                        <div className="relative h-48">
                            <div
                                className={`absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ${hoveredCard === index ? 'opacity-60' : ''
                                    }`}
                            />
                            <img
                                src={cls.image}
                                alt="Course Image"
                                className="object-cover w-full h-full"
                            />
                            <Transition
                                show={hoveredCard === index}
                                enter="transition-opacity duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition-opacity duration-300"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="absolute inset-0 flex items-center justify-center">

                                    <button onClick={() => handelSelect(cls._id)} title={role === 'admin' || role === 'instructor' ? 'Instructor/Admin Can not be able to select ' ? cls.availableSeats <1 : 'No seat avalible' : 'You can select this classes' } disabled={role === 'admin' || role === 'instructor' || cls.availableSeats < 1} className="px-4 py-2 text-white disabled:bg-red-300 bg-secondary duration-300 rounded hover:bg-red-700">
                                        Select
                                    </button>

                                </div>
                            </Transition>
                        </div>
                        <div className="px-6 py-2">
                            <h3 className={`${cls.name.length > 25 ? 'text-[14px]' : 'text-[16px]'}  font-bold`}>{cls.name}</h3>
                            <p className="text-gray-500 text-xs">Instructor : {cls.instructorName}</p>
                            <div className="flex items-center justify-between mt-4">
                                <span className="text-gray-600 text-xs">Available Seats: <span className='text-secondary'>{cls.availableSeats}</span> </span>
                                <span className="text-green-500 font-semibold">${cls.price}</span>
                            </div>
                            
                            <Link to={`/class/${cls._id}`}><button className="px-4 py-2 mt-4 w-full mx-auto text-white disabled:bg-red-300 bg-secondary duration-300 rounded hover:bg-red-700">
                                        View
                                    </button></Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Classes;


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
//     const [classes, setClasses] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
    
//     const axiosFetch = useAxiosFetch();
//     const axiosSecure = useAxiosSecure();

//     const handleHover = (index) => {
//         setHoveredCard(index);
//     };

//     // Fetch classes on component mount
//     useEffect(() => {
//         setLoading(true);
//         axiosFetch.get('/classes')
//             .then(res => {
//                 setClasses(res.data);
//                 setLoading(false);
//             })
//             .catch(err => {
//                 console.error("Error fetching classes:", err);
//                 setError("Failed to load classes. Please try again later.");
//                 setLoading(false);
//             });
//     }, []);

//     // Fetch enrolled classes for the current user if logged in
//     useEffect(() => {
//         if (currentUser?.email) {
//             axiosSecure.get(`/enrolled-classes/${currentUser.email}`)
//                 .then(res => setEnrolledClasses(res.data))
//                 .catch(err => console.error("Error fetching enrolled classes:", err));
//         }
//     }, [currentUser]);

//     const handelSelect = (id) => {
//         if (!currentUser) {
//             return toast.error('Please Login First');
//         }
        
//         // Check if already selected in cart
//         axiosSecure.get(`/cart-item/${id}?email=${currentUser.email}`)
//             .then(res => {
//                 if (res.data && res.data.classId === id) {
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
//                     };

//                     toast.promise(axiosSecure.post('/add-to-cart', data), {
//                         pending: 'Selecting...',
//                         success: 'Selected Successfully',
//                         error: {
//                             render({ data }) {
//                                 return `Error: ${data?.message || 'Something went wrong'}`;
//                             }
//                         }
//                     });
//                 }
//             })
//             .catch(err => {
//                 console.error("Error checking cart item:", err);
//                 toast.error("Failed to select class. Please try again.");
//             });
//     };

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center h-screen">
//                 <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-secondary"></div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="flex justify-center items-center h-screen">
//                 <div className="text-red-500 text-center">
//                     <p className="text-xl">{error}</p>
//                     <button 
//                         className="mt-4 px-4 py-2 bg-secondary text-white rounded" 
//                         onClick={() => window.location.reload()}
//                     >
//                         Try Again
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div>
//             <div className="mt-20 pt-3">
//                 <h1 className="text-4xl font-bold text-center text-dark-primary">Classes</h1>
//             </div>

//             {classes.length === 0 ? (
//                 <div className="text-center my-16">
//                     <p className="text-xl">No classes available at the moment.</p>
//                 </div>
//             ) : (
//                 <div className="my-16 w-[90%] gap-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-auto">
//                     {classes.map((cls, index) => (
//                         <div
//                             key={index}
//                             className={`relative hover:-translate-y-2 duration-150 hover:ring-[2px] hover:ring-secondary w-64 h-[350px] mx-auto ${cls.availableSeats < 1 ? 'bg-red-300' : 'bg-white'} dark:bg-slate-600 rounded-lg shadow-lg overflow-hidden cursor-pointer`}
//                             onMouseEnter={() => handleHover(index)}
//                             onMouseLeave={() => handleHover(null)}
//                         >
//                             <div className="relative h-48">
//                                 <div
//                                     className={`absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ${hoveredCard === index ? 'opacity-60' : ''}`}
//                                 />
//                                 <img
//                                     src={cls.image}
//                                     alt="Course Image"
//                                     className="object-cover w-full h-full"
//                                     onError={(e) => {
//                                         e.target.onerror = null;
//                                         e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Available';
//                                     }}
//                                 />
//                                 <Transition
//                                     show={hoveredCard === index}
//                                     enter="transition-opacity duration-300"
//                                     enterFrom="opacity-0"
//                                     enterTo="opacity-100"
//                                     leave="transition-opacity duration-300"
//                                     leaveFrom="opacity-100"
//                                     leaveTo="opacity-0"
//                                 >
//                                     <div className="absolute inset-0 flex items-center justify-center">
//                                         <button 
//                                             onClick={() => handelSelect(cls._id)} 
//                                             title={
//                                                 role === 'admin' || role === 'instructor' 
//                                                     ? 'Instructor/Admin cannot select classes' 
//                                                     : cls.availableSeats < 1 
//                                                         ? 'No seats available' 
//                                                         : 'Select this class'
//                                             } 
//                                             disabled={role === 'admin' || role === 'instructor' || cls.availableSeats < 1} 
//                                             className="px-4 py-2 text-white disabled:bg-red-300 bg-secondary duration-300 rounded hover:bg-red-700"
//                                         >
//                                             Select
//                                         </button>
//                                     </div>
//                                 </Transition>
//                             </div>
//                             <div className="px-6 py-2">
//                                 <h3 className={`${cls.name.length > 25 ? 'text-[14px]' : 'text-[16px]'} font-bold mb-1`}>{cls.name}</h3>
//                                 <p className="text-gray-500 text-xs">Instructor: {cls.instructorName}</p>
//                                 <div className="flex items-center justify-between mt-4">
//                                     <span className="text-gray-600 text-xs">Available Seats: <span className='text-secondary'>{cls.availableSeats}</span></span>
//                                     <span className="text-green-500 font-semibold">${cls.price}</span>
//                                 </div>
                                
//                                 <Link to={`/class/${cls._id}`}>
//                                     <button className="px-4 py-2 mt-4 w-full mx-auto text-white bg-secondary duration-300 rounded hover:bg-red-700">
//                                         View
//                                     </button>
//                                 </Link>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Classes;