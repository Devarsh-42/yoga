import React, { useState } from 'react';
import { useAuth } from '../../../../hooks/useAuth';
import { useLoaderData, useNavigate } from 'react-router-dom';
import useAxiosFetch from '../../../../hooks/useAxiosFetch';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const UpdateUser = () => {
    const { user } = useAuth();
    const userCredentials = useLoaderData();
    const [loading, setLoading] = useState(false);
    const axiosFetch = useAxiosFetch();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        const updatedData = Object.fromEntries(formData);

        toast.promise(
            axiosSecure.put(`/update-user/${userCredentials?._id}`, updatedData)
                .then((res) => {
                    setLoading(false);
                    // Navigate back to users page after successful update
                    setTimeout(() => navigate('/dashboard/manage-users'), 1500);
                    return 'Update successful!';
                })
                .catch((err) => {
                    setLoading(false);
                    console.log(err);
                    throw new Error('Update failed!');
                }),
            {
                pending: 'Updating user data...',
                success: 'User updated successfully!',
                error: 'Update failed. Please try again.',
            }
        );
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            {/* Header Section */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold">Update User: <span className="text-teal-600">{userCredentials?.name}</span></h1>
                <p className="text-gray-500 mt-2">Modify user details and permissions</p>
            </div>

            {/* Form Section */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                    <div className="flex items-center mb-6">
                        <div className="h-16 w-16 rounded-full overflow-hidden border-4 border-teal-100">
                            <img 
                                src={userCredentials?.photoUrl} 
                                alt={userCredentials?.name} 
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="ml-4">
                            <h2 className="text-xl font-semibold">{userCredentials?.name}</h2>
                            <p className="text-gray-500">{userCredentials?.email}</p>
                        </div>
                    </div>

                    <form className="space-y-6" onSubmit={handleFormSubmit}>
                        {/* Basic Information */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-lg font-medium text-gray-800 mb-4">Basic Information</h3>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
                                        Full Name
                                    </label>
                                    <input
                                        className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
                                        placeholder="Full Name"
                                        type="text"
                                        required
                                        defaultValue={userCredentials?.name}
                                        id="name"
                                        name="name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">
                                        Phone Number
                                    </label>
                                    <input
                                        className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
                                        placeholder="Phone Number"
                                        required
                                        type="tel"
                                        id="phone"
                                        defaultValue={userCredentials?.phone}
                                        name="phone"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Contact & Identification */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-lg font-medium text-gray-800 mb-4">Contact & Identification</h3>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                                        Email Address
                                    </label>
                                    <div className="text-xs text-orange-600 mb-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                        </svg>
                                        Updating email is not recommended
                                    </div>
                                    <input
                                        className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50 bg-gray-100"
                                        placeholder="Email address"
                                        type="email"
                                        required
                                        defaultValue={userCredentials?.email}
                                        name="email"
                                        id="email"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="skills">
                                        Skills
                                    </label>
                                    <div className="text-xs text-orange-600 mb-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                        </svg>
                                        Required for instructors only
                                    </div>
                                    <input
                                        className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
                                        placeholder="Yoga skills (e.g. Hatha, Vinyasa, Meditation)"
                                        defaultValue={userCredentials?.skills}
                                        type="text"
                                        name="skills"
                                        id="skills"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Additional Information */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-lg font-medium text-gray-800 mb-4">Additional Information</h3>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="address">
                                        Address
                                    </label>
                                    <input
                                        className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
                                        placeholder="Full Address"
                                        required
                                        defaultValue={userCredentials?.address}
                                        name="address"
                                        type="text"
                                        id="address"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="photoUrl">
                                        Profile Photo URL
                                    </label>
                                    <input
                                        className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
                                        placeholder="Photo URL"
                                        name="photoUrl"
                                        required
                                        defaultValue={userCredentials?.photoUrl}
                                        type="text"
                                        id="photoUrl"
                                    />
                                </div>
                            </div>
                            
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="about">
                                    About
                                </label>
                                <textarea
                                    className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
                                    placeholder="Brief description about the user"
                                    rows="4"
                                    defaultValue={userCredentials?.about}
                                    name="about"
                                    id="about"
                                ></textarea>
                            </div>
                        </div>

                        {/* Role Selection */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-lg font-medium text-gray-800 mb-4">User Role</h3>
                            <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
                                <div>
                                    <input
                                        className="peer sr-only"
                                        id="option1"
                                        type="radio"
                                        value="user"
                                        defaultChecked={userCredentials?.role === 'user'}
                                        name="option"
                                    />
                                    <label
                                        htmlFor="option1"
                                        className="flex flex-col items-center justify-center rounded-lg border-2 border-gray-200 bg-white p-4 text-gray-500 hover:border-gray-300 peer-checked:border-teal-500 peer-checked:bg-teal-50 peer-checked:text-teal-600 cursor-pointer transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <span className="text-sm font-medium">Standard User</span>
                                    </label>
                                </div>
                                
                                <div>
                                    <input
                                        className="peer sr-only"
                                        id="option2"
                                        type="radio"
                                        value="admin"
                                        defaultChecked={userCredentials?.role === 'admin'}
                                        name="option"
                                    />
                                    <label
                                        htmlFor="option2"
                                        className="flex flex-col items-center justify-center rounded-lg border-2 border-gray-200 bg-white p-4 text-gray-500 hover:border-gray-300 peer-checked:border-orange-500 peer-checked:bg-orange-50 peer-checked:text-orange-600 cursor-pointer transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                        <span className="text-sm font-medium">Administrator</span>
                                    </label>
                                </div>
                                
                                <div>
                                    <input
                                        className="peer sr-only"
                                        id="option3"
                                        value="instructor"
                                        type="radio"
                                        defaultChecked={userCredentials?.role === 'instructor'}
                                        name="option"
                                    />
                                    <label
                                        htmlFor="option3"
                                        className="flex flex-col items-center justify-center rounded-lg border-2 border-gray-200 bg-white p-4 text-gray-500 hover:border-gray-300 peer-checked:border-teal-500 peer-checked:bg-teal-50 peer-checked:text-teal-600 cursor-pointer transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                        <span className="text-sm font-medium">Yoga Instructor</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="flex items-center justify-end space-x-4 pt-4">
                            <button
                                type="button"
                                onClick={() => navigate('/dashboard/manage-users')}
                                className="px-5 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-5 py-2.5 rounded-lg bg-teal-600 text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors disabled:opacity-70"
                            >
                                {loading ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Updating User...
                                    </span>
                                ) : 'Update User'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateUser;