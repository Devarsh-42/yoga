import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Payment.css';
const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

const Payment = () => {
    const location = useLocation();
    const price = location.state?.price;
    const cartItm = location.state?.itemId;
    const [loading, setLoading] = useState(false);
    
    console.log(cartItm, 'itm form payment');
    
    if (!price) {
        return <Navigate to="/dashboard/my-selected" replace />
    }

    // Function to initialize Razorpay
    const initPayment = async () => {
        try {
            setLoading(true);
            
            // Check if Razorpay is loaded
            if (!window.Razorpay) {
                throw new Error("Razorpay SDK is not loaded!");
            }
            
            // Get your auth token from storage
            const token = localStorage.getItem('token'); // adjust based on where you store your token
            
            console.log("Sending payment request with price:", price);
            
            // Get order details from your backend
            const { data } = await axios.post(
                `${BACKEND_URL}/create-payment-intent`, 
                {
                    price: price // Match the backend expected parameter name
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}` // Add authentication
                    }
                }
            );
            
            console.log("Received response from server:", data);
            
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: data.amount,
                currency: data.currency,
                name: "Your Company Name",
                description: "Payment for selected items",
                order_id: data.orderId,
                handler: async (response) => {
                    try {
                        console.log("Payment success, verifying...", response);
                        
                        // Verify payment with your backend (fixed URL typo)
                        const verifyResponse = await axios.post(
                            `${BACKEND_URL}/verify-payment`, 
                            {
                                paymentId: response.razorpay_payment_id,
                                orderId: response.razorpay_order_id,
                                signature: response.razorpay_signature,
                                cartItm: cartItm
                            },
                            {
                                headers: {
                                    'Authorization': `Bearer ${token}` // Add authentication here too
                                }
                            }
                        );
                        
                        if (verifyResponse.data.success) {
                            alert('Payment successful!');
                            // Redirect to success page or dashboard
                            window.location.href = '/dashboard/payment-success';
                        }
                    } catch (error) {
                        console.error("Payment verification failed:", error.response?.data || error.message);
                        alert('Payment verification failed!');
                    }
                },
                prefill: {
                    name: "Customer Name",
                    email: "customer@example.com",
                    contact: "9999999999"
                },
                theme: {
                    color: "#3399cc"
                }
            };
            
            const razorpay = new window.Razorpay(options);
            razorpay.open();
            
        } catch (error) {
            console.error("Payment initialization failed:", error);
            
            // More detailed error information
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error("Server responded with:", error.response.status, error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                console.error("No response received from server:", error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error("Error setting up request:", error.message);
            }
            
            alert('Payment initialization failed! Check the console for details.');
        } finally {
            setLoading(false);
        }
    };
    
    // Load Razorpay script when component mounts
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
        
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className="my-40 payment-custom-class">
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Complete Your Payment</h2>
                <div className="mb-4">
                    <p className="text-gray-700">Amount to pay: {price}</p>
                </div>
                <button 
                    onClick={initPayment}
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    {loading ? 'Processing...' : 'Pay Now'}
                </button>
            </div>
        </div>
    );
};

export default Payment;