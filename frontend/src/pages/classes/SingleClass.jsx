import { useEffect, useState } from "react";
import { BiTime } from "react-icons/bi";
import { FaLanguage, FaLevelUpAlt, FaUser, FaUsers } from "react-icons/fa";
import { MdBookOnline } from "react-icons/md";
import { useLoaderData } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import useAxiosFetch from "../../hooks/useAxiosFetch";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const SingleClass = () => {
    const course = useLoaderData();
    const { currentUser } = useUser();
    const role = currentUser?.role;
    const [enrolledClasses, setEnrolledClasses] = useState([]);
    const [relatedCourses, setRelatedCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const axiosFetch = useAxiosFetch();
    const axiosSecure = useAxiosSecure();
    // debugging code :
    
    // Fetch related courses
    useEffect(() => {
        axiosFetch.get('/classes')
            .then(res => {
                // Filter to get courses with similar topic or from same instructor
                const filtered = res.data
                    .filter(c => c._id !== course._id)
                    .filter(c => c.instructorName === course.instructorName || 
                                c.category === course.category)
                    .slice(0, 3);
                setRelatedCourses(filtered);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching related courses:", err);
                setLoading(false);
            });
    }, [course, axiosFetch]);
    
    // Fetch enrolled classes if user is logged in
    useEffect(() => {
        if (currentUser?.email) {
            axiosSecure.get(`/enrolled-classes/${currentUser.email}`)
                .then(res => setEnrolledClasses(res.data))
                .catch(err => console.error("Error fetching enrolled classes:", err));
        }
    }, [currentUser, axiosSecure]);

    const handleSelect = (id) => {
        if (!currentUser) {
            return toast.error('Please Login First');
        }
        
        axiosSecure.get(`/cart-item/${id}?email=${currentUser.email}`)
            .then(res => {
                if (res.data && res.data.classId === id) {
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
                    };

                    toast.promise(axiosSecure.post('/add-to-cart', data), {
                        pending: 'Selecting...',
                        success: 'Selected Successfully',
                        error: {
                            render({ data }) {
                                return `Error: ${data?.message || 'Something went wrong'}`;
                            }
                        }
                    });
                }
            })
            .catch(err => {
                console.error("Error checking cart item:", err);
                toast.error("Failed to select class. Please try again.");
            });
    };

    const [activeTab, setActiveTab] = useState("tab1");

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#ff6b45]"></div>
            </div>
        );
    }

    return (
        <>
            <div className="font-medium text-gray-700 dark:text-white text-lg leading-7 md:w-[80%] w-[90%] mx-auto">
                {/* Page Header */}
                <div className="bg-gradient-to-r from-[#ff6b45]/10 to-[#ff6b45]/5 dark:from-[#1e2738] dark:to-[#1e2738] py-16 mt-20 rounded-lg">
                    <div className="container text-center">
                        <h2 className="text-4xl font-bold mb-2 text-gray-800 dark:text-white">
                            {course.name}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Dive deep into yoga with our expert instructor
                        </p>
                    </div>
                </div>
                
                <div className="my-10">
                    <div className="grid grid-cols-12 gap-8">
                        {/* Left Content */}
                        <div className="lg:col-span-8 col-span-12">
                            <div className="rounded-xl overflow-hidden shadow-lg bg-white dark:bg-[#1e2738]">
                                {/* Course Image */}
                                <div className="h-[400px] mb-6">
                                    <img
                                        src={course.image}
                                        alt={course.name}
                                        className="rounded-t-xl object-cover w-full h-full block"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = '/api/placeholder/800/400?text=Image+Not+Available';
                                        }}
                                    />
                                </div>
                                
                                {/* Course Title */}
                                <div className="px-8 pb-8">
                                    <h2 className="text-3xl font-bold mb-3 text-gray-800 dark:text-white">{course.name}</h2>

                                    {/* Instructor Info */}
                                    <div className="flex flex-wrap items-center gap-8 mt-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                                        <div className="flex items-center gap-3 group">
                                            <div className="h-12 w-12 bg-[#ff6b45]/20 rounded-full flex items-center justify-center text-[#ff6b45]">
                                                <FaUser className="text-xl" />
                                            </div>
                                            <div>
                                                <p className="text-gray-500 dark:text-gray-400 text-sm">
                                                    Instructor
                                                </p>
                                                <p className="text-gray-800 dark:text-white font-medium">
                                                    {course.instructorName}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <p className="text-gray-500 dark:text-gray-400 text-sm">
                                                Last Updated
                                            </p>
                                            <p className="text-gray-800 dark:text-white font-medium">
                                                {new Date(course.submitted || Date.now()).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Tabs Navigation */}
                                    <div className="mt-8">
                                        <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
                                            <button 
                                                onClick={() => setActiveTab("tab1")}
                                                className={`px-4 py-2 font-medium text-sm mr-2 whitespace-nowrap ${
                                                    activeTab === "tab1" 
                                                        ? "text-[#ff6b45] border-b-2 border-[#ff6b45]" 
                                                        : "text-gray-500 dark:text-gray-400"
                                                }`}
                                            >
                                                Overview
                                            </button>
                                            <button 
                                                onClick={() => setActiveTab("tab2")}
                                                className={`px-4 py-2 font-medium text-sm mr-2 whitespace-nowrap ${
                                                    activeTab === "tab2" 
                                                        ? "text-[#ff6b45] border-b-2 border-[#ff6b45]" 
                                                        : "text-gray-500 dark:text-gray-400"
                                                }`}
                                            >
                                                Curriculum
                                            </button>
                                            <button 
                                                onClick={() => setActiveTab("tab3")}
                                                className={`px-4 py-2 font-medium text-sm mr-2 whitespace-nowrap ${
                                                    activeTab === "tab3" 
                                                        ? "text-[#ff6b45] border-b-2 border-[#ff6b45]" 
                                                        : "text-gray-500 dark:text-gray-400"
                                                }`}
                                            >
                                                Instructor
                                            </button>
                                        </div>
                                        
                                        {/* Tab Content */}
                                        <div className="mt-6">
                                            {/* Overview Tab */}
                                            {activeTab === "tab1" && (
                                                <div>
                                                    <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Course Description</h3>
                                                    <p className="text-gray-600 dark:text-gray-300 mb-8">
                                                        {course.description || 
                                                        "This comprehensive yoga class is designed to help you build strength, improve flexibility, and find inner peace. Our expert instructor will guide you through a series of poses and breathing techniques suitable for your level."}
                                                    </p>
                                                    
                                                    <div className="bg-gray-50 dark:bg-[#2a3547] p-6 rounded-lg mb-8">
                                                        <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">What You Will Learn</h4>
                                                        <ul className="grid sm:grid-cols-2 grid-cols-1 gap-4">
                                                            {(course.learningOutcomes || [
                                                                "Master fundamental yoga poses and their variations",
                                                                "Develop proper breathing techniques for better practice",
                                                                "Learn meditation practices for stress reduction",
                                                                "Understand the connection between mind and body"
                                                            ]).map((item, index) => (
                                                                <li key={index} className="flex items-start gap-3">
                                                                    <div className="flex-none mt-1 text-[#ff6b45]">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                        </svg>
                                                                    </div>
                                                                    <div className="flex-1 text-gray-600 dark:text-gray-300">
                                                                        {item}
                                                                    </div>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    
                                                    <div>
                                                        <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Requirements</h4>
                                                        <div className="grid sm:grid-cols-3 grid-cols-1 gap-4 mt-3">
                                                            {(course.requirements || [
                                                                "Yoga mat", 
                                                                "Comfortable clothing", 
                                                                "Water bottle"
                                                            ]).map((req, index) => (
                                                                <div key={index} className="bg-white dark:bg-[#2a3547] rounded-lg p-4 flex items-center gap-3 shadow-sm border border-gray-100 dark:border-gray-700">
                                                                    <div className="text-[#ff6b45]">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                                        </svg>
                                                                    </div>
                                                                    <span className="text-gray-700 dark:text-gray-200">
                                                                        {req}
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            
                                            {/* Curriculum Tab */}
                                            {activeTab === "tab2" && (
                                                <div>
                                                    <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Course Curriculum</h3>
                                                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                                                        {course.curriculumDescription || 
                                                        "Our structured curriculum guides you through a progressive journey from basic foundations to advanced techniques. Each session builds upon the previous one to ensure comprehensive learning."}
                                                    </p>
                                                    
                                                    <div className="bg-gray-50 dark:bg-[#2a3547] p-6 rounded-lg mb-8">
                                                        <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                                                            Class Level: <span className="text-[#ff6b45]">{course.level || "Intermediate"}</span>
                                                        </h4>
                                                    </div>
                                                    
                                                    <div className="space-y-4">
                                                        {(course.curriculum || [
                                                            { title: "Week 1: Foundations", lessons: 3, duration: "45 minutes" },
                                                            { title: "Week 2: Building Strength", lessons: 4, duration: "60 minutes" },
                                                            { title: "Week 3: Flexibility Focus", lessons: 3, duration: "60 minutes" },
                                                            { title: "Week 4: Advanced Techniques", lessons: 5, duration: "75 minutes" }
                                                        ]).map((week, index) => (
                                                            <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                                                                <div className="bg-gray-50 dark:bg-[#2a3547] px-6 py-4 flex justify-between items-center">
                                                                    <h5 className="font-semibold text-gray-800 dark:text-white">{week.title}</h5>
                                                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                                                        {week.lessons} lessons • {week.duration}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            
                                            {/* Instructor Tab */}
                                            {activeTab === "tab3" && (
                                                <div>
                                                    <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">About the Instructor</h3>
                                                    
                                                    <div className="flex items-center gap-4 mb-6">
                                                        <div className="w-20 h-20 bg-[#ff6b45]/20 rounded-full flex items-center justify-center text-[#ff6b45]">
                                                            <FaUser className="text-2xl" />
                                                        </div>
                                                        <div>
                                                            <h4 className="text-xl font-semibold text-gray-800 dark:text-white">
                                                                {course.instructorName}
                                                            </h4>
                                                            <p className="text-[#ff6b45]">
                                                                {course.instructorTitle || "Certified Yoga Instructor"}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    
                                                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                                                        {course.instructorBio || 
                                                        `${course.instructorName} is a certified yoga instructor with years of experience teaching students of all levels. Their approach combines traditional techniques with modern adaptations to make yoga accessible and beneficial for everyone.`}
                                                    </p>
                                                    
                                                    <div className="bg-gray-50 dark:bg-[#2a3547] p-6 rounded-lg">
                                                        <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Specialties</h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            {(course.instructorSpecialties || [
                                                                "Hatha Yoga", "Vinyasa Flow", "Meditation", "Breathing Techniques"
                                                            ]).map((specialty, index) => (
                                                                <span key={index} className="bg-[#ff6b45]/10 text-[#ff6b45] px-3 py-1 rounded-full text-sm">
                                                                    {specialty}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Right Sidebar */}
                        <div className="lg:col-span-4 col-span-12">
                            <div className="space-y-8">
                                {/* Course Info Card */}
                                <div className="bg-white dark:bg-[#1e2738] rounded-xl shadow-lg overflow-hidden">
                                    <div className="h-48 relative">
                                        <img
                                            src={course.image}
                                            alt={course.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = '/api/placeholder/400/200?text=Image+Not+Available';
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                                            <div className="text-white text-2xl font-bold">
                                                {course.price}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="p-6">
                                        <button 
                                            onClick={() => handleSelect(course._id)} 
                                            disabled={role === 'admin' || role === 'instructor' || course.availableSeats < 1}
                                            className="w-full py-3 bg-[#ff6b45] hover:bg-[#ff5a30] text-white font-medium rounded-md transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed mb-6"
                                        >
                                            {course.availableSeats < 1 ? 'Class Full' : 'Enroll Now'}
                                        </button>
                                        
                                        <ul className="space-y-4">
                                            <li className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                                    <FaUser className="text-[#ff6b45]" />
                                                    <span>Instructor</span>
                                                </div>
                                                <div className="text-gray-800 dark:text-white font-medium">{course.instructorName}</div>
                                            </li>
                                            
                                            <li className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                                    <MdBookOnline className="text-[#ff6b45]" />
                                                    <span>Lectures</span>
                                                </div>
                                                <div className="text-gray-800 dark:text-white font-medium">{course.lectures || "12"}</div>
                                            </li>
                                            
                                            <li className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                                    <BiTime className="text-[#ff6b45]" />
                                                    <span>Duration</span>
                                                </div>
                                                <div className="text-gray-800 dark:text-white font-medium">{course.duration || "6 Weeks"}</div>
                                            </li>
                                            
                                            <li className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                                    <FaUsers className="text-[#ff6b45]" />
                                                    <span>Available Seats</span>
                                                </div>
                                                <div className="text-gray-800 dark:text-white font-medium">{course.availableSeats}</div>
                                            </li>
                                            
                                            <li className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                                    <FaLevelUpAlt className="text-[#ff6b45]" />
                                                    <span>Level</span>
                                                </div>
                                                <div className="text-gray-800 dark:text-white font-medium">{course.level || "Intermediate"}</div>
                                            </li>
                                            
                                            <li className="flex justify-between items-center pb-3">
                                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                                    <FaLanguage className="text-[#ff6b45]" />
                                                    <span>Language</span>
                                                </div>
                                                <div className="text-gray-800 dark:text-white font-medium">{course.language || "English"}</div>
                                            </li>
                                        </ul>
                                        
                                        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                                            <p className="mb-3 text-gray-600 dark:text-gray-300">Share This Course:</p>
                                            <div className="flex gap-3">
                                                <a href="#" className="w-9 h-9 rounded-full bg-[#ff6b45]/10 flex items-center justify-center text-[#ff6b45] hover:bg-[#ff6b45] hover:text-white transition-colors">
                                                    <FaFacebookF />
                                                </a>
                                                <a href="#" className="w-9 h-9 rounded-full bg-[#ff6b45]/10 flex items-center justify-center text-[#ff6b45] hover:bg-[#ff6b45] hover:text-white transition-colors">
                                                    <FaTwitter />
                                                </a>
                                                <a href="#" className="w-9 h-9 rounded-full bg-[#ff6b45]/10 flex items-center justify-center text-[#ff6b45] hover:bg-[#ff6b45] hover:text-white transition-colors">
                                                    <FaInstagram />
                                                </a>
                                                <a href="#" className="w-9 h-9 rounded-full bg-[#ff6b45]/10 flex items-center justify-center text-[#ff6b45] hover:bg-[#ff6b45] hover:text-white transition-colors">
                                                    <FaLinkedinIn />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Related Courses */}
                                <div className="bg-white dark:bg-[#1e2738] rounded-xl shadow-lg p-6">
                                    <h4 className="text-xl font-bold mb-5 text-gray-800 dark:text-white">Related Courses</h4>
                                    
                                    {relatedCourses.length > 0 ? (
                                        <ul className="space-y-4">
                                            {relatedCourses.map((related, index) => (
                                                <li key={index} className="flex gap-3 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0">
                                                    <div className="flex-none">
                                                        <div className="h-16 w-16 rounded-md overflow-hidden">
                                                            <img
                                                                src={related.image}
                                                                alt={related.name}
                                                                className="w-full h-full object-cover"
                                                                onError={(e) => {
                                                                    e.target.onerror = null;
                                                                    e.target.src = '/api/placeholder/100/100?text=Image';
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="flex-1">
                                                        <h5 className="font-medium text-gray-800 dark:text-white mb-1 line-clamp-1">
                                                            {related.name}
                                                        </h5>
                                                        <p className="text-[#ff6b45] font-semibold">
                                                            {related.price}
                                                        </p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-500 dark:text-gray-400">No related courses found</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleClass;


// import { DialogActions } from "@mui/material";
// import { BiTime } from "react-icons/bi";
// import { FaLanguage, FaLevelUpAlt, FaUser, FaUsers } from "react-icons/fa";
// import { GiClassicalKnowledge } from "react-icons/gi";
// import { MdBookOnline } from "react-icons/md";
// import { useLoaderData } from "react-router-dom";
// import { useUser } from "../../hooks/useUser";
// import { useState } from "react";
// import useAxiosFetch from "../../hooks/useAxiosFetch";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { toast } from "react-toastify";
// import bannerImg1 from "../../assets/home/banner-1.jpg";
// import girImage from "../../assets/home/girl.jpg"


// const SingleClass = () => {
//     const course = useLoaderData();
//     const { currentUser } = useUser();
//     const role = currentUser?.role;
//     const [enrolledClasses, setEnrolledClasses] = useState([]);
//     const axiosFetch = useAxiosFetch();
//     const axiosSecure = useAxiosSecure();
//     // console.log(course)
//     const handelSelect = (id) => {
//         axiosSecure.get(`/enrolled-classes/${currentUser?.email}`)
//             .then(res => setEnrolledClasses(res.data))
//             .catch(err => console.log(err))
//         if (!currentUser) {
//             return toast.error('Please Login First');
//         }
//         axiosSecure.get(`/cart-item/${id}?email=${currentUser.email}`)
//             .then(res => {
//                 if (res.data.classId === id) {
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
//                     }

//                     toast.promise(axiosSecure.post('/add-to-cart', data)
//                         .then(res => {
//                             console.log(res.data);
//                         })

//                         , {
//                             pending: 'Selecting...',
//                             success: {
//                                 render({ data }) {
//                                     return `Selected Successfully`;
//                                 }
//                             },
//                             error: {
//                                 render({ data }) {
//                                     return `Error: ${data.message}`;
//                                 }
//                             }
//                         });
//                 }
//             })

//     }
//   return (
//     <>
//       <div
//         className=" font-gilroy font-medium text-gray dark:text-white text-lg leading-[27px] w-[90%] mx-auto"
//         data-new-gr-c-s-check-loaded="14.1157.0"
//         data-gr-ext-installed=""
//       >
//         {/* breadcrumb or header */}
//         <div className="breadcrumbs bg-primary py-20 mt-20 section-padding bg-cover bg-center bg-no-repeat">
//           <div className="container text-center">
//             <h2>Course Details</h2>
//           </div>
//         </div>
        
//         <div className="nav-tab-wrapper tabs  section-padding mt-8">
//           <div className="container">
//             <div className="grid grid-cols-12 md:gap-[30px]">
//             <div className="lg:col-span-8 col-span-12">
//                 <div className="single-course-details">
//                   <div className="xl:h-[470px] h-[350px] mb-10 course-main-thumb">
//                     <img
//                       src={course.image}
//                       alt=""
//                       className=" rounded-md object-fut w-full h-full block"
//                     />
//                   </div>
//                   <h2 className="text-2xl mb-2">UI/UX Design and Graphics Learning Bootcamp 2022</h2>

//                   <div className="author-meta mt-6 sm:flex  lg:space-x-16 sm:space-x-5 space-y-5 sm:space-y-0 items-center">
//                     <div className="flex space-x-4 items-center group">
//                       <div className="flex-none">
//                         <div className="h-12 w-12 rounded">
//                           <img
//                             src={girImage}
//                             alt=""
//                             className=" object-cover w-full h-full rounded"
//                           />
//                         </div>
//                       </div>
//                       <div className="flex-1">
//                         <p className=" text-secondary  ">
//                           Trainer
//                           <a href="#" className=" text-black">
//                             : {course.instructorName}
//                           </a>
//                         </p>
//                       </div>
//                     </div>
//                     <div>
//                       <span className=" text-secondary  ">
//                         Last Update: 
//                         <a href="#" className=" text-black ml-1">
//                          {new Date(course.submitted).toLocaleDateString()}
//                         </a>
//                       </span>
//                     </div>
//                   </div>

//                   <div className="nav-tab-wrapper mt-12">
//                     <ul id="tabs-nav" className=" course-tab mb-8">
//                       <li className="active">
//                         <a href="#tab1">Overview</a>
//                       </li>
//                       <li>
//                         <a href="#tab2">Carriculum</a>
//                       </li>
//                       <li>
//                         <a href="#tab3">Instructor</a>
//                       </li>
//                       <li>
//                         <a href="#tab4">Reviews</a>
//                       </li>
//                     </ul>
//                     <div id="tabs-content ">
//                       <div id="tab1" className="tab-content">
//                         <div>
//                           <h3 className=" text-2xl mt-8">Course Description</h3>
//                           <p className="mt-4">
//                             This tutorial will help you learn quickly and
//                             thoroughly. Lorem ipsum, or lipsum as it sometimes
//                             known, is dummy text used in laying out print,
//                             graphic or web designs. Lorem ipsum dolor sit amet,
//                             consectetuer adipiscing elit. Donec odio. Quisque
//                             volutpat mattis eros.
//                             <br /> <br /> You’ll be exposed to principles and
//                             strategies, but, more importantly, you’ll learn how
//                             actually apply these abstract concepts by coding
//                             three different websites for three very different
//                             the audiences. Lorem ipsum is dummy text used in
//                             laying out print, graphic or web designs Lorem ipsum
//                             blinding shot chinwag knees.
//                           </p>
//                           <div className="bg-[#F8F8F8] dark:bg-indigo-500 space-y-6 p-8 rounded-md my-8">
//                             <h4 className=" text-2xl">What You will Learn?</h4>
//                             <ul className=" grid sm:grid-cols-2 grid-cols-1 gap-6">
//                               <li className=" flex space-x-3">
//                                 <div className="flex-none  relative top-1 ">
//                                   <img src="/correct-mark.png" alt="" />
//                                 </div>
//                                 <div className="flex-1">
//                                   Learn how perspective works and how to
//                                   incorporate your art
//                                 </div>
//                               </li>

//                               <li className=" flex space-x-3">
//                                 <div className="flex-none  relative top-1 ">
//                                   <img src="/correct-mark.png" alt="" />
//                                 </div>
//                                 <div className="flex-1">
//                                   Learn how perspective works and how to
//                                   incorporate your art
//                                 </div>
//                               </li>

//                               <li className=" flex space-x-3">
//                                 <div className="flex-none  relative top-1 ">
//                                   <img src="/correct-mark.png" alt="" />
//                                 </div>
//                                 <div className="flex-1">
//                                   Learn how perspective works and how to
//                                   incorporate your art
//                                 </div>
//                               </li>

//                               <li className=" flex space-x-3">
//                                 <div className="flex-none  relative top-1 ">
//                                   <img src="/correct-mark.png" alt="" />
//                                 </div>
//                                 <div className="flex-1">
//                                   Learn how perspective works and how to
//                                   incorporate your art
//                                 </div>
//                               </li>
//                             </ul>
//                           </div>
//                           <div>
//                             <h4 className=" text-2xl">What You will Learn?</h4>
//                             <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 mt-5">
//                               <div className=" bg-white  rounded px-5 py-[18px] flex   shadow-box2 space-x-[10px] items-center">
//                                 <span className="flex-none">
//                                   <img src="/logo.png" alt="" />
//                                 </span>
//                                 <span className="flex-1 text-black">
//                                   Computer/Mobile
//                                 </span>
//                               </div>
//                               <div className=" bg-white  rounded px-5 py-[18px] flex  shadow-box2 space-x-[10px] items-center">
//                                 <div className="flex-none">
//                                   <img src="/logo.png" alt="" />
//                                 </div>
//                                 <span className="flex-1 text-black">
//                                   Paper &amp; Pencil
//                                 </span>
//                               </div>
//                               <div className=" bg-white  rounded px-5 py-[18px] flex  shadow-box2 space-x-[10px] items-center">
//                                 <div className="flex-none">
//                                   <img src="/logo.png" alt="" />
//                                 </div>
//                                 <span className="flex-1 text-black">
//                                   Internet Connect
//                                 </span>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                       <div id="tab2" className="tab-content">
//                         <div>
//                           <h3 className=" text-2xl mt-8">Lesson Plan</h3>
//                           <p className="mt-4">
//                             This tutorial will help you learn quickly and
//                             thoroughly. Lorem ipsum, or lipsum as it sometimes
//                             known, is dummy text used in laying out print,
//                             graphic or web designs. Lorem ipsum dolor sit amet,
//                             consectetuer adipiscing elit. Donec odio. Quisque
//                             volutpat mattis eros.
//                             <br /> <br /> You’ll be exposed to principles and
//                             strategies, but, more importantly, you’ll learn how
//                             actually apply these abstract concepts by coding
//                             three different websites for three very different
//                             the audiences. Lorem ipsum is dummy text used in
//                             laying out print, graphic or web designs Lorem ipsum
//                             blinding shot chinwag knees.
//                           </p>
//                           <div className="bg-[#F8F8F8] dark:bg-indigo-500 space-y-6 p-8 rounded-md my-8">
//                             <h4 className=" text-2xl">This Course is For Beginners </h4>
//                           </div>
//                           <div>
//                             <h4 className=" text-2xl">What You will Learn?</h4>
//                             <p className="mt-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe repellendus voluptate eos molestiae fuga odit ipsam nemo tenetur quod eaque error voluptatibus sapiente quis quaerat veniam, reprehenderit dolorum nisi in. Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, ipsum possimus sapiente minus facere est? Dolore necessitatibus eaque dolores magnam explicabo delectus harum aperiam animi! Fuga sapiente doloribus blanditiis rerum? Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis ab esse adipisci earum laboriosam eos fugit eius temporibus architecto hic reprehenderit ducimus soluta maxime sunt numquam quo consectetur, facere pariatur?</p>
//                           </div>
//                         </div>
//                       </div>
                    
//                     </div>

//                   </div>
                  
//                 </div>
//               </div>

//               {/* right side */}
//               <div className="lg:col-span-4 col-span-12 mt-8 md:mt-0">
//                 <div className="sidebarWrapper space-y-[30px]">
//                   <div className="wdiget custom-text space-y-5 ">
//                     <a className="h-[220px]  rounded relative block" href="#">
//                       <img
//                          src={course.image}
//                         alt=""
//                         className=" block w-full h-full object-cover rounded "
//                       />
//                       <div className=" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
//                         <img src="/play.png" alt="" />
//                       </div>
//                     </a>
//                     <h3>${course.price}</h3>
//                     <button onClick={() => handelSelect(course._id)} title={role === 'admin' || role === 'instructor' ? 'Instructor/Admin Can not be able to select ' ? course.availableSeats <1 : 'No seat avalible' : 'You can select this classes' } disabled={role === 'admin' || role === 'instructor' || course.availableSeats < 1}  className="btn btn-primary w-full text-center bg-secondary py-2 px-6 text-white ">
//                       Enroll Now
//                     </button>
//                     <ul className="list  ">
//                       <li className=" flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
//                         <div className="flex-1 space-x-3 flex items-center">
//                           <FaUser className="inline-flex"/>
//                           <div className=" text-black font-semibold">
//                             Instructor
//                           </div>
//                         </div>
//                         <div className="flex-none">{course.instructorName}</div>
//                       </li>

//                       <li className=" flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
//                         <div className="flex-1 space-x-3 flex items-center">
//                           <MdBookOnline/>
//                           <div className=" text-black font-semibold">
//                             Lectures
//                           </div>
//                         </div>
//                         <div className="flex-none">23</div>
//                       </li>

//                       <li className=" flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
//                         <div className="flex-1 space-x-3 flex items-center">
//                           <BiTime />
//                           <div className=" text-black font-semibold">
//                             Duration
//                           </div>
//                         </div>
//                         <div className="flex-none">2Hr 36Minutes</div>
//                       </li>

//                       <li className=" flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
//                         <div className="flex-1 space-x-3 flex items-center">
//                           <FaUsers />
//                           <div className=" text-black font-semibold">
//                             Enrolled
//                           </div>
//                         </div>
//                         <div className="flex-none">2k Students</div>
//                       </li>

//                       <li className=" flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
//                         <div className="flex-1 space-x-3 flex items-center">
//                           <FaLevelUpAlt />
//                           <div className=" text-black font-semibold">
//                             Course level
//                           </div>
//                         </div>
//                         <div className="flex-none">Intermediate</div>
//                       </li>

//                       <li className=" flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
//                         <div className="flex-1 space-x-3 flex items-center">
//                           <FaLanguage />
//                           <div className=" text-black font-semibold">
//                             Language
//                           </div>
//                         </div>
//                         <div className="flex-none">English</div>
//                       </li>
//                     </ul>
//                     <ul className="flex space-x-4 items-center pt-3 ">
//                       <li className=" text-black font-semibold">Share On:</li>
//                       <li>
//                         <a href="#" className="flex h-10 w-10">
//                           <img src="/logo.png" alt="" />
//                         </a>
//                       </li>
//                       <li>
//                         <a href="#" className="flex h-10 w-10">
//                           <img src="/logo.png" alt="" />
//                         </a>
//                       </li>
//                       <li>
//                         <a href="#" className="flex h-10 w-10">
//                           <img src="/logo.png" alt="" />
//                         </a>
//                       </li>
//                       <li>
//                         <a href="#" className="flex h-10 w-10">
//                           <img src="/logo.png" alt="" />
//                         </a>
//                       </li>
//                     </ul>
//                   </div>

//                   <div className="wdiget">
//                     <h4 className=" widget-title">Related Courses</h4>
//                     <ul className="list">
//                       <li className=" flex space-x-4 border-[#ECECEC] pb-6 mb-6 last:pb-0 last:mb-0 last:border-0 border-b">
//                         <div className="flex-none ">
//                           <div className="h-20 w-20  rounded">
//                             <img
//                               src={bannerImg1}
//                               alt=""
//                               className=" w-full h-full object-cover rounded"
//                             />
//                           </div>
//                         </div>
//                         <div className="flex-1 ">
//                           <div className="flex space-x-3 mb-2">
//                             <iconify-icon
//                               icon="heroicons:star-20-solid"
//                               className=" text-tertiary"
//                             ></iconify-icon>
//                             <iconify-icon
//                               icon="heroicons:star-20-solid"
//                               className=" text-tertiary"
//                             ></iconify-icon>
//                             <iconify-icon
//                               icon="heroicons:star-20-solid"
//                               className=" text-tertiary"
//                             ></iconify-icon>
//                             <iconify-icon
//                               icon="heroicons:star-20-solid"
//                               className=" text-tertiary"
//                             ></iconify-icon>
//                             <iconify-icon
//                               icon="heroicons:star-20-solid"
//                               className=" text-tertiary"
//                             ></iconify-icon>
//                           </div>
//                           <div className="mb-1 font-semibold text-black">
//                             Greatest Passion In...
//                           </div>
//                           <span className=" text-secondary font-semibold">
//                             $38.00
//                           </span>
//                         </div>
//                       </li>
//                       <li className=" flex space-x-4 border-[#ECECEC] pb-6 mb-6 last:pb-0 last:mb-0 last:border-0 border-b">
//                         <div className="flex-none ">
//                           <div className="h-20 w-20  rounded">
//                             <img
//                                src={bannerImg1}
//                               alt=""
//                               className=" w-full h-full object-cover rounded"
//                             />
//                           </div>
//                         </div>
//                         <div className="flex-1 ">
//                           <div className="mb-1 font-semibold text-black">
//                             Greatest Passion In...
//                           </div>
//                           <span className=" text-secondary font-semibold">
//                             $38.00
//                           </span>
//                         </div>
//                       </li>
//                       <li className=" flex space-x-4 border-[#ECECEC] pb-6 mb-6 last:pb-0 last:mb-0 last:border-0 border-b">
//                         <div className="flex-none ">
//                           <div className="h-20 w-20  rounded">
//                             <img
//                                src={bannerImg1}
//                               alt=""
//                               className=" w-full h-full object-cover rounded"
//                             />
//                           </div>
//                         </div>
//                         <div className="flex-1 ">
//                           <div className="mb-1 font-semibold text-black">
//                             Greatest Passion In...
//                           </div>
//                           <span className=" text-secondary font-semibold">
//                             $38.00
//                           </span>
//                         </div>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SingleClass;