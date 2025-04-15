import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import AdminStats from './AdminStats';
import { Fade } from "react-awesome-reveal";
import useAxiosFetch from '../../../hooks/useAxiosFetch';

const AdminHome = () => {
    const { user } = useAuth();
    const axiosFetch = useAxiosFetch();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axiosFetch('/users')
            .then(res => setUsers(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="p-6 bg-white rounded-lg shadow-sm">
            <Fade delay={1e3} cascade damping={1e-1}>
                <div className="mb-8">
                    <h1 className="text-3xl font-semibold text-gray-800">
                        Welcome Back, <span className="text-teal-600">{user?.displayName}</span>
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Manage your yoga classes, users, and herbal products from your dashboard.
                    </p>
                </div>
                
                <div className="border-b border-gray-200 mb-6"></div>
                
                <AdminStats users={users} />
            </Fade>
        </div>
    );
};

export default AdminHome;


// future implemetation
{/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
<div className="bg-gradient-to-r from-teal-50 to-green-50 p-6 rounded-lg border border-teal-100">
    <h3 className="text-xl font-medium text-teal-700 mb-3">Quick Actions</h3>
    <div className="grid grid-cols-2 gap-3">
        <button className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Class
        </button>
        <button className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Add User
        </button>
        <button className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Reports
        </button>
        <button className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
        </button>
    </div>
</div>

<div className="bg-orange-50 p-6 rounded-lg border border-orange-100">
    <h3 className="text-xl font-medium text-orange-700 mb-3">Recent Activity</h3>
    <ul className="space-y-3">
        <li className="flex items-center">
            <div className="bg-orange-100 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <div>
                <p className="text-gray-800">New class registration: <span className="font-medium">Advanced Yoga</span></p>
                <p className="text-sm text-gray-500">10 minutes ago</p>
            </div>
        </li>
        <li className="flex items-center">
            <div className="bg-orange-100 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            </div>
            <div>
                <p className="text-gray-800">New user signed up: <span className="font-medium">Raj Patel</span></p>
                <p className="text-sm text-gray-500">45 minutes ago</p>
            </div>
        </li>
        <li className="flex items-center">
            <div className="bg-orange-100 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <div>
                <p className="text-gray-800">Class approved: <span className="font-medium">Prenatal Yoga</span></p>
                <p className="text-sm text-gray-500">1 hour ago</p>
            </div>
        </li>
    </ul>
</div>
</div> */}