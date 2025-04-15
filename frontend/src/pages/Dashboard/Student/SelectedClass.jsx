import React, { useEffect, useState } from 'react';
import { useTitle } from '../../../hooks/useTitle';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useUser } from '../../../hooks/useUser';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import { MdDeleteSweep } from 'react-icons/md';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { Pagination, ThemeProvider, createTheme } from '@mui/material';
import { ScaleLoader } from 'react-spinners';

const SelectedClass = () => {
    useTitle('Selected Class | Yoga Master Selected Class');
    const { currentUser } = useUser();
    const [loading, setLoading] = useState(true);
    const [classes, setClasses] = useState([]);
    const [paginatedData, setPaginatedData] = useState([]);
    const [page, setPage] = useState(1);
    const itemPerPage = 5;
    const totalPage = Math.ceil(classes.length / itemPerPage);
    const navigate = useNavigate();

    const axiosSecure = useAxiosSecure();

    const theme = createTheme({
        palette: {
            primary: {
                main: '#0d9488', // Teal color
            },
            secondary: {
                main: '#14b8a6', // Lighter teal
            },
        },
    });

    useEffect(() => {
        axiosSecure.get(`/cart/${currentUser?.email}`)
            .then((res) => {
                // Add current date if none exists
                const classesWithDate = res.data.map(item => {
                    // If the item doesn't have a selected_at timestamp, add the current time
                    if (!item.selected_at) {
                        return {
                            ...item,
                            selected_at: new Date().toISOString()
                        };
                    }
                    return item;
                });
                setClasses(classesWithDate);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, [currentUser?.email]);

    const handleChange = (event, value) => {
        setPage(value);
    }
    
    useEffect(() => {
        const lastIndex = page * itemPerPage;
        const firstIndex = lastIndex - itemPerPage;
        const currentItems = classes.slice(firstIndex, lastIndex);
        setPaginatedData(currentItems);
    }, [page, classes]);
    
    const totalPrice = classes.reduce((acc, item) => acc + parseInt(item.price), 0);
    const totalTax = totalPrice * 0.01;
    const price = totalPrice + totalTax;

    // Function to handle adding a new class to cart
    const handleAddToCart = (classItem) => {
        // Add selected_at timestamp when adding to cart
        const classWithTimestamp = {
            ...classItem,
            selected_at: new Date().toISOString()
        };
        
        // Your existing add to cart logic here
        // ...
    };

    const handlePay = (id) => {
        console.log(id, 'id from pay')
        const item = classes.find((item) => item._id === id);
        // console.log(item, 'item from pay')
        const price = item.price;
        navigate('/dashboard/user/payment', { state: { price: price, itemId: id } });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0d9488',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/delete-cart-item/${id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your selected class has been deleted.',
                                'success'
                            )
                            const newClasses = classes.filter((item) => item._id !== id);
                            setClasses(newClasses);
                        }
                    })
            }
        })
        // Handle the delete action here
    };
    
    if (loading) { // [2
        return <div className='h-full w-full flex justify-center items-center'><ScaleLoader color="#0d9488" /></div>;
    }
    
    return (
        <div className="bg-white min-h-screen">
            <div className="my-6 pt-4">
                <h1 className='text-4xl text-center font-bold'>My <span className='text-teal-600'>Selected</span> Class</h1>
            </div>
            <div className="py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-2xl font-semibold mb-4 text-gray-700">Shopping Cart</h1>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="md:w-3/4">
                            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                                <table className="w-full">
                                    <thead>
                                        <tr>
                                            <th className="text-left font-semibold text-gray-700">#</th>
                                            <th className="text-left font-semibold text-gray-700">Product</th>
                                            <th className="text-left font-semibold text-gray-700">Price</th>
                                            <th className="text-left font-semibold text-gray-700">Selected Date</th>
                                            <th className="text-left font-semibold text-gray-700">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            classes.length === 0 ? <tr><td colSpan='5' className='text-center text-2xl font-bold text-gray-600'>No Classes Found</td></tr> : // If there is no item in the cart
                                                paginatedData.map((item, idx) => {
                                                    const letIdx = (page - 1) * itemPerPage + idx + 1;
                                                    
                                                    // Get the selection date - use selected_at, submitted, or current date
                                                    const selectionDate = item.selected_at || item.submitted || new Date().toISOString();
                                                    
                                                    return <tr key={item._id}>
                                                        <td className="py-4">{letIdx}</td>
                                                        <td className="py-4">
                                                            <div className="flex items-center">
                                                                <img className="h-16 w-16 mr-4 rounded" src={item.image} alt="Product image" />
                                                                <span className={`font-semibold ${item.name.length > 20 ? 'text-[13px]' : 'text-[18px]'} whitespace-pre-wrap text-gray-700`}>{item.name}</span>
                                                            </div>
                                                        </td>
                                                        <td className="py-4 text-teal-600 font-medium">₹{item.price}</td>
                                                        <td className="py-4">
                                                            <p className='text-teal-700 text-sm'>{moment(selectionDate).format('MMMM Do YYYY, h:mm a')}</p>
                                                        </td>
                                                        <td className="py-4 flex pt-8 gap-2">
                                                            <motion.button
                                                                whileHover={{ scale: 1.1 }}
                                                                whileTap={{ scale: 0.9 }}
                                                                className='px-3 py-1 cursor-pointer bg-red-500 rounded-3xl text-white font-bold'
                                                                onClick={() => handleDelete(item._id)}
                                                            >
                                                                <MdDeleteSweep />
                                                            </motion.button>
                                                            <motion.button
                                                                whileHover={{ scale: 1.1 }}
                                                                whileTap={{ scale: 0.9 }}
                                                                className='px-3 py-1 cursor-pointer bg-teal-600 rounded-3xl text-white font-bold flex items-center'
                                                                onClick={() => handlePay(item._id)}
                                                            >
                                                                
                                                                Pay
                                                            </motion.button>
                                                        </td>
                                                    </tr>
                                                })}
                                    </tbody>
                                </table>
                                <ThemeProvider theme={theme}>
                                    <Pagination onChange={handleChange} count={totalPage} color="primary" />
                                </ThemeProvider>
                            </div>
                        </div>
                        <div className="md:w-1/5 fixed right-3">
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-lg font-semibold mb-4 text-gray-700">Summary</h2>
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="text-gray-700">₹{totalPrice}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-600">Taxes</span>
                                    <span className="text-gray-700">
                                        ₹{totalTax.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-600">Extra Fees</span>
                                    <span className="text-gray-700">₹0</span>
                                </div>
                                <hr className="my-2" />
                                <div className="flex justify-between mb-2">
                                    <span className="font-semibold text-gray-700">Total</span>
                                    <span className="font-semibold text-teal-600">₹{price.toFixed(2)}</span>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => navigate('/dashboard/user/payment', { state: { price: price, itemId: null } })}
                                    disabled={price <= 0}
                                    className="bg-teal-600 text-white py-2 px-4 rounded-lg mt-4 w-full hover:bg-teal-700 transition-colors"
                                >
                                    Checkout
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectedClass;