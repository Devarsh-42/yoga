// import React, { useEffect, useState } from 'react';
// import { FiUser, FiMail, FiBriefcase, FiSend } from 'react-icons/fi';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useUser } from '../../../../hooks/useUser';
// import useAxiosFetch from '../../../../hooks/useAxiosFetch';
// import { ScaleLoader } from 'react-spinners';
// const AsInstructor = () => {
//     const { currentUser } = useUser();
//     const [submittedData, setSubmittedData] = useState({});
//     const [loading, setLoading] = useState(true); // [1
//     const axiosFetch = useAxiosFetch();
//     const onSubmit = (e) => {
//         e.preventDefault();

//         const name = e.target.name.value;
//         const email = e.target.email.value;
//         const experience = e.target.experience.value;

//         const data = {
//             name,
//             email,
//             experience,
//         };
//         axiosFetch.post('/as-instructor', data).then((res) => {
//             console.log(res.data);
//         });
//     };

//     useEffect(() => {
//         axiosFetch.get(`/applied-instructors/${currentUser?.email}`).then((res) => {
//             console.log(res.data);
//             setSubmittedData(res.data);
//             setLoading(false);
//         });
//     }, []);
//     const inputVariants = {
//         hidden: { opacity: 0, x: -20 },
//         visible: { opacity: 1, x: 0 },
//     };

//     const buttonVariants = {
//         hidden: { opacity: 0, scale: 0 },
//         visible: { opacity: 1, scale: 1 },
//     };
//     if (loading) { // [2
//         return <div className='h-full w-full flex justify-center items-center'><ScaleLoader color="#FF1949" /></div>;
//     }

//     return (
//         <>
//             <AnimatePresence>
//                 {!submittedData?.name && (
//                     <div className="py-4 min-h-screen flex items-center w-[60%]">
//                         <form onSubmit={onSubmit}>
//                             <div className="flex w-full">
//                                 <motion.div
//                                     variants={inputVariants}
//                                     initial="hidden"
//                                     animate="visible"
//                                     transition={{ duration: 0.5 }}
//                                     className="mb-4 w-full"
//                                 >
//                                     <label className="text-gray-700" htmlFor="name">
//                                         Name
//                                     </label>
//                                     <div className="flex items-center mt-1">
//                                         <FiUser className="text-gray-500" />
//                                         <input
//                                             defaultValue={currentUser.name}
//                                             disabled
//                                             readOnly
//                                             className="ml-2 w-full border-b border-gray-300 focus:border-secondary outline-none"
//                                             type="text"
//                                             id="name"
//                                             name="name"
//                                         />
//                                     </div>
//                                 </motion.div>
//                                 <motion.div
//                                     variants={inputVariants}
//                                     initial="hidden"
//                                     animate="visible"
//                                     transition={{ duration: 0.5, delay: 0.1 }}
//                                     className="mb-4 w-full"
//                                 >
//                                     <label className="text-gray-700" htmlFor="email">
//                                         Email
//                                     </label>
//                                     <div className="flex items-center mt-1">
//                                         <FiMail className="text-gray-500" />
//                                         <input
//                                             defaultValue={currentUser.email}
//                                             disabled
//                                             readOnly
//                                             className="ml-2 w-full border-b border-gray-300 focus:border-secondary outline-none"
//                                             type="email"
//                                             id="email"
//                                             name="email"
//                                         />
//                                     </div>
//                                 </motion.div>
//                             </div>

//                             <motion.div
//                                 variants={inputVariants}
//                                 initial="hidden"
//                                 animate="visible"
//                                 transition={{ duration: 0.5, delay: 0.3 }}
//                                 className="mb-4 w-full"
//                             >
//                                 <label className="text-gray-700" htmlFor="experience">
//                                     Experience
//                                 </label>
//                                 <div className="flex items-center mt-1">
//                                     <FiBriefcase className="text-gray-500" />
//                                     <textarea
//                                         placeholder="Tell us about your experience..."
//                                         className="ml-2 rounded-lg px-2 placeholder:text-sm py-1 w-full border border-gray-300 focus:border-secondary outline-none resize-none"
//                                         id="experience"
//                                         name="experience"
//                                     ></textarea>
//                                 </div>
//                             </motion.div>

//                             <div className="text-center flex justify-center ">
//                                 <motion.button
//                                     variants={buttonVariants}
//                                     initial="hidden"
//                                     animate="visible"
//                                     transition={{ duration: 0.5, delay: 0.4 }}
//                                     whileHover={{ scale: 1.05 }}
//                                     whileTap={{ scale: 0.95 }}
//                                     type="submit"
//                                     className="flex items-center px-4 py-2 bg-secondary text-white rounded-md focus:outline-none"
//                                 >
//                                     <FiSend className="mr-2" />
//                                     Submit
//                                 </motion.button>
//                             </div>
//                         </form>
//                     </div>
//                 )}
//             </AnimatePresence>

//             <div className="h-full w-full flex justify-center items-center">
//                 <AnimatePresence>
//                     {submittedData?.name && (
//                         <motion.div
//                             initial={{ opacity: 0, scale: 0.8 }}
//                             animate={{ opacity: 1, scale: 1 }}
//                             exit={{ opacity: 0, scale: 0.8 }}
//                             transition={{ duration: 0.5 }}
//                             className="flex flex-col items-center justify-center"
//                         >
//                             <h1 className="text-2xl font-bold">
//                                 Your <span className="text-secondary">application is</span> submitted
//                             </h1>
//                             <p className="text-lg font-semibold">Name: {submittedData?.name}</p>
//                             <p className="text-lg font-semibold">Email: {submittedData?.email}</p>
//                             <p className="text-lg font-semibold">Experience: {submittedData?.experience}</p>
//                             <p>Now you need to wait for a few moments for admin approval</p>
//                         </motion.div>
//                     )}
//                 </AnimatePresence>
//             </div>
//             {
//                 submittedData?.reject && <div className="">
//                     <p>You are not able to join with Instructor</p>
//                     <p className='font-bold'>Reason :</p>
//                     <div className="w-1/2">
//                         {submittedData?.reject}
//                     </div>
//                     <p className="mt-10">If you think it is a mistake then you can contact with Our admin <span><a href="mailto:admin@rakibul.tech"></a></span></p>
//                 </div>
//             }
//         </>
//     );
// };

// export default AsInstructor;
import React, { useEffect, useState } from 'react';
import { FiUser, FiMail, FiBriefcase, FiSend } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../../../../hooks/useUser';
import useAxiosFetch from '../../../../hooks/useAxiosFetch';
import { ScaleLoader } from 'react-spinners';

const AsInstructor = () => {
    const { currentUser } = useUser();
    const [submittedData, setSubmittedData] = useState({});
    const [loading, setLoading] = useState(true);
    const axiosFetch = useAxiosFetch();
    
    const onSubmit = (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.email.value;
        const experience = e.target.experience.value;

        const data = {
            name,
            email,
            experience,
        };
        axiosFetch.post('/as-instructor', data).then((res) => {
            console.log(res.data);
        });
    };

    useEffect(() => {
        axiosFetch.get(`/applied-instructors/${currentUser?.email}`).then((res) => {
            console.log(res.data);
            setSubmittedData(res.data);
            setLoading(false);
        });
    }, []);
    
    const inputVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
    };

    const buttonVariants = {
        hidden: { opacity: 0, scale: 0 },
        visible: { opacity: 1, scale: 1 },
    };
    
    if (loading) {
        return <div className='h-full w-full flex justify-center items-center'><ScaleLoader color="#0d9488" /></div>;
    }

    return (
        <div className="bg-white min-h-screen py-8">
            <div className="container mx-auto px-4">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold">Apply as an <span className="text-teal-600">Instructor</span></h1>
                    <p className="text-gray-600 mt-2">Share your yoga expertise with our community</p>
                </div>
                
                <AnimatePresence>
                    {!submittedData?.name && (
                        <div className="py-4 flex justify-center items-center">
                            <form onSubmit={onSubmit} className="bg-white rounded-lg shadow-md p-8 w-full max-w-2xl">
                                <div className="flex flex-col md:flex-row w-full gap-6">
                                    <motion.div
                                        variants={inputVariants}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ duration: 0.5 }}
                                        className="mb-6 w-full"
                                    >
                                        <label className="text-gray-700 font-medium block mb-2" htmlFor="name">
                                            Name
                                        </label>
                                        <div className="flex items-center border-b-2 border-gray-300 py-2 focus-within:border-teal-600 transition-colors">
                                            <FiUser className="text-teal-600" />
                                            <input
                                                defaultValue={currentUser.name}
                                                disabled
                                                readOnly
                                                className="ml-2 w-full bg-transparent focus:outline-none text-gray-700"
                                                type="text"
                                                id="name"
                                                name="name"
                                            />
                                        </div>
                                    </motion.div>
                                    
                                    <motion.div
                                        variants={inputVariants}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ duration: 0.5, delay: 0.1 }}
                                        className="mb-6 w-full"
                                    >
                                        <label className="text-gray-700 font-medium block mb-2" htmlFor="email">
                                            Email
                                        </label>
                                        <div className="flex items-center border-b-2 border-gray-300 py-2 focus-within:border-teal-600 transition-colors">
                                            <FiMail className="text-teal-600" />
                                            <input
                                                defaultValue={currentUser.email}
                                                disabled
                                                readOnly
                                                className="ml-2 w-full bg-transparent focus:outline-none text-gray-700"
                                                type="email"
                                                id="email"
                                                name="email"
                                            />
                                        </div>
                                    </motion.div>
                                </div>

                                <motion.div
                                    variants={inputVariants}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    className="mb-6 w-full"
                                >
                                    <label className="text-gray-700 font-medium block mb-2" htmlFor="experience">
                                        Experience
                                    </label>
                                    <div className="flex items-start border-2 border-gray-300 rounded-lg p-3 focus-within:border-teal-600 transition-colors">
                                        <FiBriefcase className="text-teal-600 mt-1" />
                                        <textarea
                                            placeholder="Tell us about your yoga experience, certifications, and teaching style..."
                                            className="ml-2 w-full bg-transparent focus:outline-none text-gray-700 resize-none min-h-32"
                                            id="experience"
                                            name="experience"
                                            rows="6"
                                        ></textarea>
                                    </div>
                                </motion.div>

                                <div className="text-center flex justify-center mt-8">
                                    <motion.button
                                        variants={buttonVariants}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ duration: 0.5, delay: 0.4 }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        type="submit"
                                        className="flex items-center px-6 py-3 bg-orange-500 text-white rounded-lg focus:outline-none hover:bg-teal-700 transition-colors"
                                    >
                                        <FiSend className="mr-2" />
                                        Submit Application
                                    </motion.button>
                                </div>
                            </form>
                        </div>
                    )}
                </AnimatePresence>

                <div className="flex justify-center items-center py-8">
                    <AnimatePresence>
                        {submittedData?.name && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.5 }}
                                className="bg-white rounded-lg shadow-md p-8 max-w-2xl w-full text-center"
                            >
                                <div className="bg-teal-50 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                                    <FiSend className="text-teal-600 text-2xl" />
                                </div>
                                <h1 className="text-2xl font-bold mb-4">
                                    Your <span className="text-teal-600">application has been</span> submitted
                                </h1>
                                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                                    <p className="text-lg font-semibold text-gray-700 mb-2">Name: <span className="text-gray-600 font-normal">{submittedData?.name}</span></p>
                                    <p className="text-lg font-semibold text-gray-700 mb-2">Email: <span className="text-gray-600 font-normal">{submittedData?.email}</span></p>
                                    <p className="text-lg font-semibold text-gray-700">Experience: <span className="text-gray-600 font-normal">{submittedData?.experience}</span></p>
                                </div>
                                <p className="text-gray-600 bg-teal-50 p-3 rounded-lg border border-teal-100">Your application is being reviewed. Please wait for admin approval.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                
                {submittedData?.reject && 
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto mt-6"
                    >
                        <div className="bg-red-50 p-4 rounded-lg mb-4">
                            <h2 className="text-xl font-bold text-red-600 mb-2">Application Status: Rejected</h2>
                            <p className="text-gray-700">You are currently not eligible to join as an instructor.</p>
                        </div>
                        <p className='font-bold text-gray-700 mb-2'>Reason:</p>
                        <div className="bg-gray-50 p-4 rounded-lg mb-6 text-gray-600">
                            {submittedData?.reject}
                        </div>
                        <p className="mt-4 text-gray-600">If you believe this is a mistake, please contact our admin at <a href="mailto:admin@rakibul.tech" className="text-teal-600 underline">admin@rakibul.tech</a></p>
                    </motion.div>
                }
            </div>
        </div>
    );
};

export default AsInstructor;