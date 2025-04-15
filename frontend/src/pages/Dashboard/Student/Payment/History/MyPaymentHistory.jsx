// import React, { useEffect, useState } from 'react';
// import { useUser } from '../../../../../hooks/useUser';
// import useAxiosSecure from '../../../../../hooks/useAxiosSecure';
// import useAxiosFetch from '../../../../../hooks/useAxiosFetch';
// import moment from 'moment';
// import Pagination from '@mui/material/Pagination';
// import { ThemeProvider, createTheme } from '@mui/material';
// import { ScaleLoader } from 'react-spinners';
// const MyPaymentHistory = () => {
//     const axiosFetch = useAxiosFetch();
//     const axiosSecure = useAxiosSecure();
//     const { currentUser } = useUser();
//     const [payments, setPayments] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [paginatedPayments, setPaginatedPayments] = useState([]);
//     const totalItem = payments.length;
//     const [page, setPage] = useState(1);
//     let totalPage = Math.ceil(totalItem / 5);
//     let itemsPerPage = 5;
//     const handleChange = (event, value) => {
//         setPage(value);
//     };
//     useEffect(() => {
//         const lastIndex = page * itemsPerPage;
//         const firstIndex = lastIndex - itemsPerPage;
//         const currentItems = payments.slice(firstIndex, lastIndex);
//         setPaginatedPayments(currentItems);
//     }, [page, payments])

//     useEffect(() => {
//         axiosFetch.get(`/payment-history/${currentUser.email}`)
//             .then(res => {
//                 setPayments(res.data)
//                 setLoading(false)
//             })
//             .catch(err => console.log(err))
//     }, [currentUser.email])


//     const theme = createTheme({
//         palette: {
//             primary: {
//                 main: '#FF1949', // Set the primary color
//             },
//             secondary: {
//                 main: '#FF1949', // Set the secondary color
//             },
//         },
//     });

//     const totalPaidAmount = payments.reduce((acc, curr) => acc + curr.amount, 0);
//     if (loading) {
//         return <div className='h-full w-full flex justify-center items-center'>
//             <ScaleLoader color="#FF1949" />
//         </div>;
//     }
//     return (
//         <div>
//             <div className="text-center mt-6   mb-16">
//                 <p className='text-gray-400'>Hey, <span className='text-secondary font-bold'>{currentUser.name}</span> Welcome...!</p>
//                 <h1 className='text-4xl font-bold'>My Paym<span className='text-secondary'>ent Hist</span>ory</h1>
//                 <p className='text-gray-500 text-sm my-3'>You can see your payment history here </p>
//             </div>



//             <div className="">
//                 <div className="">
//                     <h1 className='font-bold'>Total Payments : {payments.length}</h1>
//                     <h1 className='font-bold'>Total Paid : {totalPaidAmount}</h1>
//                 </div>
//                 <div className="flex flex-col">
//                     <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
//                         <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
//                             <div className="overflow-hidden">
//                                 <table className="min-w-full text-left text-sm font-light">
//                                     <thead className="border-b font-medium dark:border-neutral-500">
//                                         <tr>
//                                             <th scope="col" className="px-6 py-4">#</th>
//                                             <th scope="col" className="px-6 py-4">Amount</th>
//                                             <th scope="col" className="px-6 py-4">Total Item</th>
//                                             <th scope="col" className="px-6 py-4">Time</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {
//                                             paginatedPayments.map((payment, idx) => (
//                                                 <tr
//                                                     key={payment._id}
//                                                     className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
//                                                 >
//                                                     <td className="whitespace-nowrap px-6 py-4 font-medium">{(page - 1) * itemsPerPage + idx + 1}</td>
//                                                     <td className="whitespace-nowrap px-6 py-4">{payment.amount}</td>
//                                                     <td className="whitespace-nowrap px-6 py-4">{payment.classesId.length}</td>
//                                                     <td className="whitespace-nowrap px-6 py-4">
//                                                         {moment(payment.date).format('MMMM Do YYYY, h:mm a')}
//                                                     </td>
//                                                 </tr>
//                                             ))
//                                         }

//                                     </tbody>
//                                 </table>
//                                 <div className="mt-5">
//                                     <ThemeProvider theme={theme}>
//                                         <Pagination onChange={handleChange} count={totalPage} color="secondary" />
//                                     </ThemeProvider>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>


//         </div>
//     );
// };

// export default MyPaymentHistory;
import React, { useEffect, useState } from 'react';
import { useUser } from '../../../../../hooks/useUser';
import useAxiosFetch from '../../../../../hooks/useAxiosFetch';
import moment from 'moment';

const MyPaymentHistory = () => {
    const axiosFetch = useAxiosFetch();
    const { currentUser } = useUser();
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const itemsPerPage = 5;
    
    useEffect(() => {
        axiosFetch.get(`/payment-history/${currentUser.email}`)
            .then(res => {
                setPayments(res.data);
                setLoading(false);
            })
            .catch(err => console.log(err));
    }, [currentUser.email, axiosFetch]);

    const totalPaidAmount = payments.reduce((acc, curr) => acc + curr.amount, 0);
    
    // Pagination logic
    const totalPages = Math.ceil(payments.length / itemsPerPage);
    const currentItems = payments.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="w-12 h-12 border-4 border-teal-500 rounded-full animate-spin border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            {/* Header Section */}
            <div className="text-center mb-12">
                <p className="text-gray-500">Welcome, <span className="text-teal-600 font-medium">{currentUser.name}</span>!</p>
                <h1 className="text-3xl font-bold mt-2">My Payment <span className="text-teal-600">History</span></h1>
                <p className="text-gray-500 mt-2">Track all your payments in one place</p>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex items-center">
                        <div className="bg-white/20 p-3 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <p className="text-white/80 text-sm font-medium">Total Payments</p>
                            <h3 className="text-2xl font-bold">{payments.length}</h3>
                        </div>
                    </div>
                </div>
                
                <div className="bg-gradient-to-r from-orange-400 to-orange-500 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex items-center">
                        <div className="bg-white/20 p-3 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-currency-rupee" viewBox="0 0 16 16">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z"/>
                             </svg>
                        </div>
                        <div className="ml-4">
                            <p className="text-white/80 text-sm font-medium">Total Amount Paid</p>
                            <h3 className="text-2xl font-bold">₹{totalPaidAmount}</h3>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Table Section */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Items</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {currentItems.length > 0 ? (
                            currentItems.map((payment, idx) => (
                                <tr key={payment._id} className="hover:bg-gray-50 transition duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {(page - 1) * itemsPerPage + idx + 1}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                        <span className="text-teal-600">₹{payment.amount}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {payment.classesId.length}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {moment(payment.date).format('MMMM Do YYYY, h:mm a')}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                                    No payment records found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-6">
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <button
                            onClick={() => handlePageChange(Math.max(1, page - 1))}
                            disabled={page === 1}
                            className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${page === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                            <span className="sr-only">Previous</span>
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                        
                        {[...Array(totalPages)].map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => handlePageChange(idx + 1)}
                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${page === idx + 1 ? 'z-10 bg-teal-50 border-teal-500 text-teal-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'}`}
                            >
                                {idx + 1}
                            </button>
                        ))}
                        
                        <button
                            onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
                            disabled={page === totalPages}
                            className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${page === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                            <span className="sr-only">Next</span>
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </nav>
                </div>
            )}
        </div>
    );
};

export default MyPaymentHistory;