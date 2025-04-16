import { useEffect, useState } from "react";
import { BiTime } from "react-icons/bi";
import { FaUser, FaUsers, FaLevelUpAlt, FaLanguage } from "react-icons/fa";
import { MdBookOnline } from "react-icons/md";
import { useParams } from "react-router-dom";
import useAxiosFetch from "../../hooks/useAxiosFetch";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const SingleTherapy = () => {
    const { id } = useParams();
    const axiosFetch = useAxiosFetch();
    const axiosSecure = useAxiosSecure();
    const [therapy, setTherapy] = useState(null);
    const [relatedTherapies, setRelatedTherapies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("tab1");
    const [currentUser, setCurrentUser] = useState(null);
    const [bookedSessions, setBookedSessions] = useState([]);

    // Fetch therapy data
    useEffect(() => {
        axiosFetch.get(`/therapies/${id}`)
            .then(res => {
                setTherapy(res.data);
                // After getting therapy, fetch related therapies
                axiosFetch.get('/therapies')
                    .then(response => {
                        // Filter to get therapies with similar category or from same therapist
                        const filtered = response.data
                            .filter(t => t._id !== res.data._id)
                            .filter(t => t.therapistName === res.data.therapistName || 
                                        t.category === res.data.category)
                            .slice(0, 3);
                        setRelatedTherapies(filtered);
                        setLoading(false);
                    })
                    .catch(err => {
                        console.error("Error fetching related therapies:", err);
                        setLoading(false);
                    });
            })
            .catch(err => {
                console.error("Error fetching therapy:", err);
                setLoading(false);
            });
    }, [id, axiosFetch]);

    // Get current user
    useEffect(() => {
        // This is a placeholder, replace with your actual user authentication logic
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
    }, []);

    // Fetch booked sessions if user is logged in
    useEffect(() => {
        if (currentUser?.email) {
            axiosSecure.get(`/booked-sessions/${currentUser.email}`)
                .then(res => setBookedSessions(res.data))
                .catch(err => console.error("Error fetching booked sessions:", err));
        }
    }, [currentUser, axiosSecure]);

    const handleBookSession = () => {
        if (!currentUser) {
            return toast.error('Please Login First');
        }
        
        axiosSecure.get(`/check-booking/${id}?email=${currentUser.email}`)
            .then(res => {
                if (res.data && res.data.therapyId === id) {
                    return toast.error('Session already booked');
                } else {
                    const data = {
                        therapyId: id,
                        userMail: currentUser.email,
                        date: new Date()
                    };

                    toast.promise(axiosSecure.post('/book-session', data), {
                        pending: 'Booking session...',
                        success: 'Session booked successfully',
                        error: {
                            render({ data }) {
                                return `Error: ${data?.message || 'Something went wrong'}`;
                            }
                        }
                    });
                }
            })
            .catch(err => {
                console.error("Error checking booking:", err);
                toast.error("Failed to book session. Please try again.");
            });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <>
            <div className="font-medium text-gray-700 dark:text-white text-lg leading-7 md:w-[80%] w-[90%] mx-auto">
                {/* Page Header */}
                <div className="bg-gradient-to-r from-blue-600/10 to-blue-600/5 dark:from-[#1e2738] dark:to-[#1e2738] py-16 mt-20 rounded-lg">
                    <div className="container text-center">
                        <h2 className="text-4xl font-bold mb-2 text-gray-800 dark:text-white">
                            {therapy.name}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Experience wellness with our expert therapist
                        </p>
                    </div>
                </div>
                
                <div className="my-10">
                    <div className="grid grid-cols-12 gap-8">
                        {/* Left Content */}
                        <div className="lg:col-span-8 col-span-12">
                            <div className="rounded-xl overflow-hidden shadow-lg bg-white dark:bg-[#1e2738]">
                                {/* Therapy Image */}
                                <div className="h-[400px] mb-6">
                                    <img
                                        src={therapy.image}
                                        alt={therapy.name}
                                        className="rounded-t-xl object-cover w-full h-full block"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = '/api/placeholder/800/400?text=Image+Not+Available';
                                        }}
                                    />
                                </div>
                                
                                {/* Therapy Title */}
                                <div className="px-8 pb-8">
                                    <h2 className="text-3xl font-bold mb-3 text-gray-800 dark:text-white">{therapy.name}</h2>

                                    {/* Therapist Info */}
                                    <div className="flex flex-wrap items-center gap-8 mt-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                                        <div className="flex items-center gap-3 group">
                                            <div className="h-12 w-12 bg-blue-600/20 rounded-full flex items-center justify-center text-blue-600">
                                                <FaUser className="text-xl" />
                                            </div>
                                            <div>
                                                <p className="text-gray-500 dark:text-gray-400 text-sm">
                                                    Therapist
                                                </p>
                                                <p className="text-gray-800 dark:text-white font-medium">
                                                    {therapy.therapistName}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <p className="text-gray-500 dark:text-gray-400 text-sm">
                                                Last Updated
                                            </p>
                                            <p className="text-gray-800 dark:text-white font-medium">
                                                {new Date(therapy.lastUpdated || Date.now()).toLocaleDateString()}
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
                                                        ? "text-blue-600 border-b-2 border-blue-600" 
                                                        : "text-gray-500 dark:text-gray-400"
                                                }`}
                                            >
                                                Overview
                                            </button>
                                            <button 
                                                onClick={() => setActiveTab("tab2")}
                                                className={`px-4 py-2 font-medium text-sm mr-2 whitespace-nowrap ${
                                                    activeTab === "tab2" 
                                                        ? "text-blue-600 border-b-2 border-blue-600" 
                                                        : "text-gray-500 dark:text-gray-400"
                                                }`}
                                            >
                                                Process
                                            </button>
                                            <button 
                                                onClick={() => setActiveTab("tab3")}
                                                className={`px-4 py-2 font-medium text-sm mr-2 whitespace-nowrap ${
                                                    activeTab === "tab3" 
                                                        ? "text-blue-600 border-b-2 border-blue-600" 
                                                        : "text-gray-500 dark:text-gray-400"
                                                }`}
                                            >
                                                Therapist
                                            </button>
                                        </div>
                                        
                                        {/* Tab Content */}
                                        <div className="mt-6">
                                            {/* Overview Tab */}
                                            {activeTab === "tab1" && (
                                                <div>
                                                    <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Therapy Description</h3>
                                                    <p className="text-gray-600 dark:text-gray-300 mb-8">
                                                        {therapy.description || 
                                                        "This comprehensive therapy session is designed to help you reduce stress, improve well-being, and find inner balance. Our expert therapist will guide you through a series of techniques suitable for your needs."}
                                                    </p>
                                                    
                                                    <div className="bg-gray-50 dark:bg-[#2a3547] p-6 rounded-lg mb-8">
                                                        <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Benefits</h4>
                                                        <ul className="grid sm:grid-cols-2 grid-cols-1 gap-4">
                                                            {(therapy.benefits || [
                                                                "Reduced stress and anxiety",
                                                                "Improved sleep quality",
                                                                "Enhanced mood and emotional balance",
                                                                "Relief from physical discomfort"
                                                            ]).map((item, index) => (
                                                                <li key={index} className="flex items-start gap-3">
                                                                    <div className="flex-none mt-1 text-blue-600">
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
                                                        <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Prepare for Your Session</h4>
                                                        <div className="grid sm:grid-cols-3 grid-cols-1 gap-4 mt-3">
                                                            {(therapy.preparation || [
                                                                "Comfortable clothing", 
                                                                "Empty stomach (1-2 hrs)", 
                                                                "Arrive 10 mins early"
                                                            ]).map((req, index) => (
                                                                <div key={index} className="bg-white dark:bg-[#2a3547] rounded-lg p-4 flex items-center gap-3 shadow-sm border border-gray-100 dark:border-gray-700">
                                                                    <div className="text-blue-600">
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
                                            
                                            {/* Process Tab */}
                                            {activeTab === "tab2" && (
                                                <div>
                                                    <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Therapy Process</h3>
                                                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                                                        {therapy.processDescription || 
                                                        "Our therapy session follows a structured approach designed to maximize benefits and ensure a comfortable experience. Each phase builds upon the previous one to provide comprehensive care."}
                                                    </p>
                                                    
                                                    <div className="bg-gray-50 dark:bg-[#2a3547] p-6 rounded-lg mb-8">
                                                        <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                                                            Session Type: <span className="text-blue-600">{therapy.type || "Individual"}</span>
                                                        </h4>
                                                    </div>
                                                    
                                                    <div className="space-y-4">
                                                        {(therapy.process || [
                                                            { title: "Initial Assessment", duration: "15 minutes", description: "A brief consultation to understand your specific needs" },
                                                            { title: "Preparatory Phase", duration: "10 minutes", description: "Relaxation techniques to prepare for the main therapy" },
                                                            { title: "Core Therapy", duration: "30 minutes", description: "The main therapeutic techniques customized to your needs" },
                                                            { title: "Integration", duration: "5 minutes", description: "Gentle transition back to regular awareness" }
                                                        ]).map((step, index) => (
                                                            <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                                                                <div className="bg-gray-50 dark:bg-[#2a3547] px-6 py-4 flex justify-between items-center">
                                                                    <h5 className="font-semibold text-gray-800 dark:text-white">{step.title}</h5>
                                                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                                                        {step.duration}
                                                                    </div>
                                                                </div>
                                                                <div className="px-6 py-4">
                                                                    <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            
                                            {/* Therapist Tab */}
                                            {activeTab === "tab3" && (
                                                <div>
                                                    <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">About the Therapist</h3>
                                                    
                                                    <div className="flex items-center gap-4 mb-6">
                                                        <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center text-blue-600">
                                                            <FaUser className="text-2xl" />
                                                        </div>
                                                        <div>
                                                            <h4 className="text-xl font-semibold text-gray-800 dark:text-white">
                                                                {therapy.therapistName}
                                                            </h4>
                                                            <p className="text-blue-600">
                                                                {therapy.therapistTitle || "Licensed Therapist"}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    
                                                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                                                        {therapy.therapistBio || 
                                                        `${therapy.therapistName} is a licensed therapist with extensive experience helping clients improve their well-being. Their approach combines traditional healing techniques with modern science to provide effective therapeutic experiences.`}
                                                    </p>
                                                    
                                                    <div className="bg-gray-50 dark:bg-[#2a3547] p-6 rounded-lg">
                                                        <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Specializations</h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            {(therapy.therapistSpecializations || [
                                                                "Stress Management", "Trauma Recovery", "Mindfulness", "Holistic Healing"
                                                            ]).map((specialty, index) => (
                                                                <span key={index} className="bg-blue-600/10 text-blue-600 px-3 py-1 rounded-full text-sm">
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
                                {/* Therapy Info Card */}
                                <div className="bg-white dark:bg-[#1e2738] rounded-xl shadow-lg overflow-hidden">
                                    <div className="h-48 relative">
                                        <img
                                            src={therapy.image}
                                            alt={therapy.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = '/api/placeholder/400/200?text=Image+Not+Available';
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                                            <div className="text-white text-2xl font-bold">
                                                ₹{therapy.price}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="p-6">
                                        <button 
                                            onClick={handleBookSession} 
                                            disabled={therapy.availableSlots < 1}
                                            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed mb-6"
                                        >
                                            {therapy.availableSlots < 1 ? 'No Available Slots' : 'Book Session'}
                                        </button>
                                        
                                        <ul className="space-y-4">
                                            <li className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                                    <FaUser className="text-blue-600" />
                                                    <span>Therapist</span>
                                                </div>
                                                <div className="text-gray-800 dark:text-white font-medium">{therapy.therapistName}</div>
                                            </li>
                                            
                                            <li className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                                    <MdBookOnline className="text-blue-600" />
                                                    <span>Session Type</span>
                                                </div>
                                                <div className="text-gray-800 dark:text-white font-medium">{therapy.sessionType || "One-on-one"}</div>
                                            </li>
                                            
                                            <li className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                                    <BiTime className="text-blue-600" />
                                                    <span>Duration</span>
                                                </div>
                                                <div className="text-gray-800 dark:text-white font-medium">{therapy.duration || "60"} minutes</div>
                                            </li>
                                            
                                            <li className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                                    <FaUsers className="text-blue-600" />
                                                    <span>Available Slots</span>
                                                </div>
                                                <div className="text-gray-800 dark:text-white font-medium">{therapy.availableSlots || 5}</div>
                                            </li>
                                            
                                            <li className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                                    <FaLevelUpAlt className="text-blue-600" />
                                                    <span>Experience Level</span>
                                                </div>
                                                <div className="text-gray-800 dark:text-white font-medium">{therapy.experienceLevel || "All Levels"}</div>
                                            </li>
                                            
                                            <li className="flex justify-between items-center pb-3">
                                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                                    <FaLanguage className="text-blue-600" />
                                                    <span>Language</span>
                                                </div>
                                                <div className="text-gray-800 dark:text-white font-medium">{therapy.language || "English"}</div>
                                            </li>
                                        </ul>
                                        
                                        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                                            <p className="mb-3 text-gray-600 dark:text-gray-300">Share This Therapy:</p>
                                            <div className="flex gap-3">
                                                <a href="#" className="w-9 h-9 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-colors">
                                                    <FaFacebookF />
                                                </a>
                                                <a href="#" className="w-9 h-9 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-colors">
                                                    <FaTwitter />
                                                </a>
                                                <a href="#" className="w-9 h-9 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-colors">
                                                    <FaInstagram />
                                                </a>
                                                <a href="#" className="w-9 h-9 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-colors">
                                                    <FaLinkedinIn />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Related Therapies */}
                                <div className="bg-white dark:bg-[#1e2738] rounded-xl shadow-lg p-6">
                                    <h4 className="text-xl font-bold mb-5 text-gray-800 dark:text-white">Related Therapies</h4>
                                    
                                    {relatedTherapies.length > 0 ? (
                                        <ul className="space-y-4">
                                            {relatedTherapies.map((related, index) => (
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
                                                        <p className="text-blue-600 font-semibold">
                                                            ₹{related.price}
                                                        </p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-500 dark:text-gray-400">No related therapies found</p>
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

export default SingleTherapy;