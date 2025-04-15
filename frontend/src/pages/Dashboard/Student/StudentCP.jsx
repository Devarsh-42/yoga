import React from 'react';
import { useUser } from '../../../hooks/useUser';
import welcome from '../../../assets/dashboard/urban-welcome.svg'
import { Link } from 'react-router-dom';

const StudentCP = () => {
    const { currentUser } = useUser();
    return (
        <div className='h-screen flex justify-center items-center bg-white'>
            <div className="max-w-4xl px-4">
                <div className="flex justify-center items-center">
                    <img onContextMenu={e => e.preventDefault()} className='h-[200px] w-auto' placeholder='blur' src={welcome} alt="" />
                </div>
                <h1 className='text-4xl capitalize font-bold text-center mb-2'>Hi , <span className='text-teal-600'>{currentUser.name}</span> Welcome To Your Dashboard</h1>
                <p className='text-center text-base text-gray-600 mb-4'> Have a Good day </p>
                <div className="text-center">
                    <h1 className='font-bold text-gray-700 mb-2'>You jump any page you want from here . </h1>
                    <div className="flex flex-wrap items-center justify-center my-4 gap-3">
                        <div className="border border-teal-600 rounded-lg hover:bg-teal-600 hover:text-white duration-200 px-4 py-2">
                            <Link to='/dashboard/enrolled-class'>My Enroll</Link>
                        </div>
                        <div className="border border-teal-600 rounded-lg hover:bg-teal-600 hover:text-white duration-200 px-4 py-2">
                            <Link to='/dashboard/my-selected'>My Selected</Link>
                        </div>
                        <div className="border border-teal-600 rounded-lg hover:bg-teal-600 hover:text-white duration-200 px-4 py-2">
                            <Link to='/dashboard/my-payments'>Payment History</Link>
                        </div>
                        <div className="border border-teal-600 rounded-lg hover:bg-teal-600 hover:text-white duration-200 px-4 py-2">
                            <Link to='/dashboard/apply-instructor'>Join as a Instructor</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentCP;