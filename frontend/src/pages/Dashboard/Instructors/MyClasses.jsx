// import React, { useEffect, useState } from 'react';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import { useUser } from '../../../hooks/useUser';
// import { Fade, Slide } from "react-awesome-reveal";
// import moment from 'moment'
// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
// const MyClasses = () => {
//     const [classes, setClasses] = useState([]);
//     const { currentUser, isLoading } = useUser();
//     const navigate = useNavigate();
//     const axiosSecure = useAxiosSecure();
//     useEffect(() => {
//         axiosSecure.get(`/classes/${currentUser?.email}`)
//             .then(res => setClasses(res.data))
//             .catch(err => console.log(err))
//     }, [isLoading])

//     const handleFeedback = (id) => {
//         const theClass = classes.find(cls => cls._id === id);
//         if (theClass.reason) {
//             Swal.fire(
//                 'Reason For Rejected',
//                 theClass.reason,
//                 'info'
//             )
//         }
//         else {
//             Swal.fire(
//                 'Wow Looks Good',
//                 'Your class is approved',
//                 'success'
//             )
//         }
//     }

//     return (
//         <div>
//             <div className="my-9">
//                 <h1 className='text-4xl font-bold text-center '>My <span className='text-secondary'>Classes</span></h1>
//                 <div className="text-center">

//                     <Fade duration={100} className='text-[12px]  text-center' cascade>Here you can see how many classes added by you and all classes status</Fade>
//                 </div>


//                 <div className="">
//                     {
//                         classes.length === 0 ? <div className='text-center text-2xl font-bold mt-10'>You have not added any class yet</div> :
//                             <div className="mt-9">
//                                 {
//                                     classes.map((cls, index) => <Slide duration={1000} key={index} className='mb-5 hover:ring ring-secondary duration-200 focus:ring rounded-lg'>
//                                         <div className="bg-white flex  rounded-lg gap-8  shadow p-4">
//                                             <div className="">
//                                                 <img className='max-h-[200px] max-w-[300px]' src={cls.image} alt="" />
//                                             </div>
//                                             <div className="w-full">
//                                                 <h1 className='text-[21px] font-bold text-secondary border-b pb-2 mb-2'>{cls.name}</h1>
//                                                 <div className="flex gap-5">
//                                                     <div className="">
//                                                         <h1 className='font-bold mb-3'>Some Info : </h1>
//                                                         <h1 className='text-secondary my-2'><span className='text-black '>Total Student</span> : {cls.totalEnrolled ? cls.totalEnrolled : 0}</h1>
//                                                         <h1 className='text-secondary'><span className='text-black '>Total Seats</span> : {cls.availableSeats}</h1>
//                                                         <h1 className='text-secondary my-2'><span className='text-black '>Status</span> : <span className={`font-bold ${cls.status === 'pending' ? 'text-orange-400' : cls.status === 'checking' ? 'text-yellow-300' : cls.status === 'approved' ? 'text-green-500' : 'text-red-600'}`}>{cls.status}</span></h1>
//                                                     </div>
//                                                     <div className="">
//                                                         <h1 className='font-bold mb-3'>.....</h1>
//                                                         <h1 className='text-secondary my-2'><span className='text-black '>Price</span> : {cls.price} <span className='text-black'>$</span></h1>
//                                                         <h1 className='text-secondary my-2'><span className='text-black '>Submitted</span> : <span className=''>{cls.submitted ? moment(cls.submitted).format('MMMM Do YYYY') : 'Not Get Data'}</span></h1>
//                                                     </div>
//                                                     <div className="w-1/3">
//                                                         <h1 className='font-bold mb-3'>Action : </h1>
//                                                         <button onClick={() => handleFeedback(cls._id)} className='px-3 bg-orange-400 font-bold  py-1 text-white w-full rounded-lg'>View Feedback</button>
//                                                         <button className='px-3 bg-green-500 font-bold  py-1 text-white w-full my-3 rounded-lg'>View Details</button>
//                                                         <button className='px-3 bg-secondary font-bold  py-1 text-white w-full rounded-lg' onClick={() => navigate(`/dashboard/update/${cls._id}`)}>Update</button>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </Slide>)}
//                             </div>
//                     }
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default MyClasses;

import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useUser } from '../../../hooks/useUser';
import { Fade, Slide } from "react-awesome-reveal";
import moment from 'moment'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyClasses = () => {
    const [classes, setClasses] = useState([]);
    const { currentUser, isLoading } = useUser();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    useEffect(() => {
        axiosSecure.get(`/classes/${currentUser?.email}`)
            .then(res => setClasses(res.data))
            .catch(err => console.log(err))
    }, [isLoading])

    const handleFeedback = (id) => {
        const theClass = classes.find(cls => cls._id === id);
        if (theClass.reason) {
            Swal.fire(
                'Reason For Rejected',
                theClass.reason,
                'info'
            )
        }
        else {
            Swal.fire(
                'Wow Looks Good',
                'Your class is approved',
                'success'
            )
        }
    }

    return (
        <div className="p-6 bg-white rounded-lg shadow-sm">
            <div className="my-8">
                <h1 className='text-3xl font-semibold text-center'>My <span className='text-teal-600'>Classes</span></h1>
                <div className="text-center mt-2">
                    <Fade duration={100} className='text-gray-600 text-center' cascade>
                        Here you can see how many classes added by you and all classes status
                    </Fade>
                </div>

                <div className="mt-10">
                    {
                        classes.length === 0 ? 
                        <div className='text-center py-16'>
                            <div className="text-teal-600 text-5xl mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <div className='text-2xl font-semibold text-gray-800'>You have not added any class yet</div>
                            <button 
                                onClick={() => navigate('/dashboard/add-class')}
                                className="mt-4 bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-6 rounded-md transition-colors">
                                Add Your First Class
                            </button>
                        </div> 
                        :
                        <div className="space-y-6">
                            {classes.map((cls, index) => (
                                <Slide duration={1000} key={index}>
                                    <div className="bg-white flex flex-col md:flex-row rounded-lg border border-gray-200 hover:border-teal-400 transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden">
                                        <div className="md:w-1/4">
                                            <img className='h-full w-full object-cover' src={cls.image} alt={cls.name} />
                                        </div>
                                        <div className="p-5 w-full">
                                            <h1 className='text-xl font-bold text-teal-700 border-b border-gray-200 pb-3 mb-4'>{cls.name}</h1>
                                            <div className="flex flex-col md:flex-row gap-8">
                                                <div className="flex-1">
                                                    <h2 className='font-semibold text-gray-800 mb-3'>Class Information</h2>
                                                    <p className='text-gray-700 mb-2'>Students: <span className='font-medium text-teal-600'>{cls.totalEnrolled || 0}</span></p>
                                                    <p className='text-gray-700 mb-2'>Available Seats: <span className='font-medium text-teal-600'>{cls.availableSeats}</span></p>
                                                    <p className='text-gray-700 mb-2'>Status: 
                                                        <span className={`ml-2 font-medium px-3 py-1 rounded-full text-xs ${
                                                            cls.status === 'pending' ? 'bg-orange-100 text-orange-700' : 
                                                            cls.status === 'checking' ? 'bg-yellow-100 text-yellow-700' : 
                                                            cls.status === 'approved' ? 'bg-green-100 text-green-700' : 
                                                            'bg-red-100 text-red-700'
                                                        }`}>
                                                            {cls.status.toUpperCase()}
                                                        </span>
                                                    </p>
                                                </div>
                                                <div className="flex-1">
                                                    <h2 className='font-semibold text-gray-800 mb-3'>Additional Details</h2>
                                                    <p className='text-gray-700 mb-2'>Price: <span className='font-medium text-teal-600'>₹{cls.price}</span></p>
                                                    <p className='text-gray-700 mb-2'>Submitted: <span className='font-medium text-teal-600'>{cls.submitted ? moment(cls.submitted).format('MMMM Do YYYY') : 'Not Available'}</span></p>
                                                </div>
                                                <div className="md:w-1/4">
                                                    <h2 className='font-semibold text-gray-800 mb-3'>Actions</h2>
                                                    <div className="space-y-3">
                                                        <button 
                                                            onClick={() => handleFeedback(cls._id)} 
                                                            className='w-full bg-orange-500 hover:bg-orange-600 transition-colors px-4 py-2 text-white font-medium rounded-md'>
                                                            View Feedback
                                                        </button>
                                                        <button 
                                                            className='w-full bg-teal-600 hover:bg-teal-700 transition-colors px-4 py-2 text-white font-medium rounded-md'>
                                                            View Details
                                                        </button>
                                                        <button 
                                                            onClick={() => navigate(`/dashboard/update/${cls._id}`)}
                                                            className='w-full bg-blue-600 hover:bg-blue-700 transition-colors px-4 py-2 text-white font-medium rounded-md'>
                                                            Update
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Slide>
                            ))}
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default MyClasses;