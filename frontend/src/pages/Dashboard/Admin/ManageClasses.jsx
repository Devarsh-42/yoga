import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosFetch from '../../../hooks/useAxiosFetch';
import { FcDeleteDatabase } from 'react-icons/fc';
import { GrUpdate } from 'react-icons/gr';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Pagination, ThemeProvider, createTheme } from '@mui/material';

const ManageClasses = () => {
    const navigate = useNavigate();
    const axiosFetch = useAxiosFetch();
    const axiosSecure = useAxiosSecure();
    const [classes, setClasses] = useState([]); 
    const [page, setPage] = useState(1);
    const [paginatedData, setPaginatedData] = useState([]);
    const itemPerPage = 5;
    const totalPage = Math.ceil(classes.length / 5);


    useEffect(() => {
        axiosFetch.get('/classes-manage')
            .then(res => setClasses(res.data))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        let lastIndex = page * itemPerPage;
        const firstIndex = lastIndex - itemPerPage;
        if (lastIndex > classes.length) {
            lastIndex = classes.length;
        }
        const currentData = classes.slice(firstIndex, lastIndex);
        setPaginatedData(currentData);
    }, [page, classes])


    const theme = createTheme({
        palette: {
            primary: {
                main: '#2CB49F', // Set the primary color to teal
            },
            secondary: {
                main: '#FF7550', // Set the secondary color to orange
            },
        },
    });


    const handleApprove = (id) => {
        axiosSecure.put(`/change-status/${id}`, { status: 'approved' })
            .then(res => {
                console.log(res.data)
                setClasses(classes.map(cls => cls._id == id ? { ...cls, status: 'approved' } : cls))
            })
            .catch(err => console.log(err))
    }
    const handelReject = (id) => {
        Swal.fire({
            title: 'Reason for reject',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Reject',
            confirmButtonColor: '#FF7550',
            cancelButtonColor: '#6c757d',
            showLoaderOnConfirm: true,
            preConfirm: async (text) => {
                try {
                    const res = await axiosSecure.put(`/change-status/${id}`, { status: 'rejected', reason: text })
                    if (res.data.modifiedCount > 0) {
                        setClasses(classes.map(cls => cls._id == id ? { ...cls, status: 'rejected' } : cls))
                    }
                    return res.data
                } catch (error) {
                    Swal.showValidationMessage(
                        `Request failed: ${error}`
                    )
                }

            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Changed..!',
                    text: 'You reject this class.',
                    icon: 'success',
                    confirmButtonColor: '#2CB49F'
                })
            }
        })
    }
    const handleChange = (event, value) => setPage(value);
    return (
        <div>
            <h1 className='text-4xl text-teal-600 font-bold text-center my-10'>Manage <span className='text-gray-800'>Classes</span></h1>


            <div className="">

                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                            <div className="overflow-hidden shadow-md rounded-lg">
                                <table className="min-w-full text-left text-sm font-light">
                                    <thead className="bg-teal-50 font-medium border-b">
                                        <tr>
                                            <th scope="col" className="px-6 py-4 text-gray-700">PHOTO</th>
                                            <th scope="col" className="px-6 py-4 text-gray-700">COURSE NAME</th>
                                            <th scope="col" className="px-6 py-4 text-gray-700">INSTRUCTOR NAME</th>
                                            <th scope="col" className="px-6 py-4 text-gray-700">STATUS</th>
                                            <th scope="col" className="px-6 py-4 text-gray-700">DETAILS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            classes.length == 0 ? <tr><td colSpan='6' className='text-center text-2xl font-bold py-4'>No Classes Found</td></tr> :
                                                paginatedData.map((cls, idx) => <tr
                                                    key={cls._id}
                                                    className="border-b transition duration-300 ease-in-out hover:bg-orange-50 dark:border-neutral-500">
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        <img src={cls.image} className='h-[35px] w-[35px] rounded-md object-cover' alt="" />
                                                    </td>
                                                    <td className="whitespace-pre-wrap px-6 py-4">{cls.name}</td>
                                                    <td className="whitespace-nowrap px-6 py-4">{cls.instructorName}</td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        <span className={`font-bold ${cls.status === 'pending' ? 'bg-orange-400' : cls.status === 'checking' ? 'bg-yellow-500' : cls.status === 'approved' ? 'bg-teal-600' : 'bg-red-600'} px-2 py-1 uppercase text-white rounded-xl`}>{cls.status}</span>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        <div className="flex gap-2">
                                                            {
                                                                <button
                                                                    onClick={() => handleApprove(cls._id)}
                                                                    className='text-[12px] cursor-pointer disabled:bg-teal-700 bg-teal-600 py-1 rounded-md px-2 text-white hover:bg-teal-700 transition duration-300'>
                                                                    Approve
                                                                </button>
                                                            }
                                                            {

                                                                <button
                                                                    disabled={cls.status === 'rejected' || cls.status === 'checking'}
                                                                    onClick={() => handelReject(cls._id)}
                                                                    className='cursor-pointer disabled:bg-red-800 bg-red-600 py-1 rounded-md px-2 text-white hover:bg-red-700 transition duration-300'>
                                                                    Deny
                                                                </button>
                                                            }
                                                            {

                                                                <button
                                                                    disabled={cls.status === 'rejected' || cls.status === 'checking'}
                                                                    onClick={() => handelReject(cls._id)}
                                                                    className='cursor-pointer bg-orange-500 py-1 rounded-md px-2 text-white hover:bg-orange-600 transition duration-300'>
                                                                    Feedback
                                                                </button>
                                                            }
                                                        </div>
                                                    </td>
                                                </tr>)
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <ThemeProvider theme={theme}>
                    <div className="w-full h-full flex justify-center items-center my-10">
                        <Pagination onChange={handleChange} count={totalPage} color="primary" />
                    </div>
                </ThemeProvider>
            </div>
        </div>
    );
};

export default ManageClasses;