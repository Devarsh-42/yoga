import React, { useRef, useState } from 'react';
import { useUser } from '../../../hooks/useUser';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
const KEY = import.meta.env.VITE_IMG_TOKEN;

const AddClass = () => {
    const API_URL = `https://api.imgbb.com/1/upload?key=${KEY}&name=`;
    const axiosSecure = useAxiosSecure();
    const { currentUser, isLoading } = useUser();
    const [image, setImage] = useState(null);
    const handleFormSubmit = (e) => {
        e.preventDefault();
        e.preventDefault();
        const formData = new FormData(e.target);
        const newData = Object.fromEntries(formData);
        formData.append('file', image);

        toast.promise(
            fetch(API_URL, {
                method: 'POST',
                body: formData
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.success === true) {
                        console.log(data.data.display_url);
                        newData.image = data.data.display_url;
                        newData.instructorName = currentUser.name;
                        newData.instructorEmail = currentUser.email;
                        newData.status = 'pending';
                        newData.submitted = new Date(); 
                        newData.totalEnrolled = 0;
                        // console.log(newData);
                        axiosSecure.post('/new-class' , newData)
                        .then(res => {
                            console.log(res.data);
                        })

                    }
                }),
            {
                pending: 'Submitting your class...',
                success: 'Submitted successfully!',
                error: 'Failed to submit your class',
            }
        )
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };
    if (isLoading) {
        return <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        </div>;
    }
    return (
        <div className="p-6 bg-white rounded-lg shadow-sm">
            <div className="my-8">
                <h1 className='text-center text-3xl font-semibold text-gray-800'>Add Your <span className='text-teal-600'>Class</span></h1>
                <p className="text-center text-gray-600 mt-2">Create a new yoga class to share with your students</p>
            </div>

            <form onSubmit={handleFormSubmit} className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-5">
                    <div className="mb-5">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
                            Class name
                        </label>
                        <input
                            className="w-full px-4 py-3 border border-teal-500 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-300 transition-all"
                            type="text"
                            required
                            placeholder='Your Class Name'
                            name='name'
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="image" className="block text-gray-700 font-semibold mb-2">Thumbnail Photo</label>
                        <input
                            type="file"
                            required
                            onChange={handleImageChange}
                            name="image"
                            className="block w-full border border-teal-500 shadow-sm rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-300 transition-all file:border-0 file:bg-teal-600 file:text-white file:mr-4 file:py-3 file:px-4" />
                    </div>
                </div>
                <div className="mt-2">
                    <p className='text-sm mb-3 ml-1 text-teal-600'>You cannot change your name or email</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="mb-5">
                            <label className="block text-gray-700 font-semibold mb-2" htmlFor="instructorName">
                                Instructor name
                            </label>
                            <input
                                className="w-full px-4 py-3 bg-gray-50 border border-teal-500 rounded-md focus:outline-none cursor-not-allowed"
                                type="text"
                                value={currentUser?.name}
                                readOnly
                                disabled
                                placeholder='Instructor Name'
                                name='instructorName'
                            />
                        </div>
                        <div className="mb-5">
                            <label className="block text-gray-700 font-semibold mb-2" htmlFor="instructorEmail">
                                Instructor email
                            </label>
                            <input
                                title='You cannot update your email'
                                className="w-full px-4 py-3 bg-gray-50 border border-teal-500 rounded-md focus:outline-none cursor-not-allowed"
                                type="email"
                                value={currentUser?.email}
                                disabled
                                readOnly
                                name='instructorEmail'
                            />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="mb-5">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="availableSeats">
                            Available seats
                        </label>
                        <input
                            className="w-full px-4 py-3 border border-teal-500 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-300 transition-all"
                            type="number"
                            required
                            placeholder='How many seats are available?'
                            name='availableSeats'
                        />
                    </div>
                    <div className="mb-5">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="price">
                            Price (₹)
                        </label>
                        <input
                            className="w-full px-4 py-3 border border-teal-500 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-300 transition-all"
                            type="number"
                            required
                            placeholder='How much does it cost?'
                            name='price'
                        />
                    </div>
                </div>
                <div className="mb-5">
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="videoLink">
                        Youtube Link
                    </label>
                    <p className='text-sm mb-2 text-teal-600'>Only YouTube videos are supported</p>
                    <input
                        required
                        className="w-full px-4 py-3 border border-teal-500 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-300 transition-all"
                        type="text"
                        placeholder='Your course intro video link'
                        name='videoLink'
                    />
                </div>
                <div className="mb-5">
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="description">
                        Description About your course 
                    </label>
                    <textarea 
                        placeholder='Description about your course' 
                        name="description" 
                        className='resize-none border w-full p-4 rounded-lg border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-300 transition-all' 
                        rows="4">
                    </textarea>
                </div>
                <div className="text-center w-full">
                    <button
                        className="bg-teal-600 w-full hover:bg-teal-700 transition-colors duration-300 text-white font-bold py-3 px-6 rounded-md"
                        type="submit"
                    >
                        Add Class
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddClass;