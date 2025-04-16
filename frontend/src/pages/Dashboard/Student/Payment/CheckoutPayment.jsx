import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useUser } from '../../../../hooks/useUser';

const CheckoutPayment = ({ price, cartItm }) => {
    const URL = `/payment-info?${cartItm && `classId=${cartItm}`}`;
    const axiosSecure = useAxiosSecure();
    const { currentUser, isLoading } = useUser();
    const [orderId, setOrderId] = useState('');
    const [succeeded, setSucceeded] = useState('');
    const [message, setMessage] = useState('');
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);

    // Return if the amount is less than 0 or not provided
    if (price < 0 || !price) {
        return <Navigate to="/dashboard/my-selected" replace />
    }

    useEffect(() => {
        // Fetch cart items if cartItm is not provided
        if (!cartItm) {
            axiosSecure.get(`/cart/${currentUser?.email}`)
                .then((res) => {
                    // SET CLASSES ID IN STATE
                    const classesId = res.data.map(item => item._id);
                    setCart(classesId);
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        // Load Razorpay script
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [currentUser?.email, cartItm, axiosSecure]);

    const handlePayment = async () => {
        try {
            setLoading(true);
            setMessage('');
            
            // Create payment intent/order on your server
            const { data } = await axiosSecure.post('/create-payment-intent', { price });
            
            // Initialize Razorpay payment
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: data.amount,
                currency: data.currency,
                name: "Your Company Name",
                description: "Payment for selected courses",
                order_id: data.orderId,
                handler: async function(response) {
                    try {
                        // Verify payment with your backend
                        const result = await axiosSecure.post('/verify-payment', {
                            paymentId: response.razorpay_payment_id,
                            orderId: response.razorpay_order_id,
                            signature: response.razorpay_signature,
                            cartItm: cartItm ? [cartItm] : cart
                        });
                        
                        if (result.data.success) {
                            setSucceeded('Payment Successful, You can now access your classes');
                            // Optionally redirect to a success page
                            // window.location.href = '/dashboard/payment-success';
                        } else {
                            setSucceeded('Payment Failed, Please try again');
                        }
                    } catch (error) {
                        console.error(error);
                        setMessage('Error verifying payment. Please contact support.');
                    }
                },
                prefill: {
                    name: currentUser.name || 'Unknown',
                    email: currentUser.email || 'Anonymous',
                },
                theme: {
                    color: "#F37254"
                }
            };
            
            const razorpayInstance = new window.Razorpay(options);
            razorpayInstance.on('payment.failed', function (response) {
                setMessage(`Payment failed: ${response.error.description}`);
            });
            
            razorpayInstance.open();
        } catch (error) {
            console.error(error);
            setMessage('Error initializing payment. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold">Payment Amount: <span className='text-secondary'>₹{price}</span></h1>
                <p className="mt-2 text-gray-600">Secure payment powered by Razorpay</p>
            </div>
            
            <div className="flex justify-center">
                <button 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-md disabled:opacity-50"
                    onClick={handlePayment}
                    disabled={isLoading || loading}
                >
                    {loading ? 'Processing...' : 'Pay Now'}
                </button>
            </div>
            
            {message && <p className="mt-4 text-center text-red-500">{message}</p>}
            {succeeded && <p className="mt-4 text-center text-green-500">{succeeded}</p>}
        </>
    );
};

export default CheckoutPayment;