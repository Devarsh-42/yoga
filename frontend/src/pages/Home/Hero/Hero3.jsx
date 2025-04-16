import React from 'react';
import bgImg from '../../../assets/home/banner-1.jpg';

const Hero3 = () => {
    return (
        <div className='min-h-screen bg-cover' style={{ backgroundImage: `url(https://i.pinimg.com/736x/4f/28/1a/4f281a7f40d1c6a49d2c29076eb600b6.jpg)` }}>
            <div className="min-h-screen flex justify-start pl-11 text-white items-center bg-black bg-opacity-60">
                <div className="">
                    <div className="space-y-4">
                        {/* <h3 className='md:text-4xl text-2xl'>WE PROVIDES</h3> */}
                        <h1 className='md:text-7xl text-4xl font-bold '>Natural Ayurvedic Herbs</h1>
                        <div className="md:w-1/2">
                            <p className=''>Enhance your wellness journey with our authentic ayurvedic herbs. Discover traditional remedies that complement your practice and support holistic health benefits</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-5">
                            {/* <button className='px-7 py-3 rounded-lg bg-secondary font-bold uppercase'>Join Today</button> */}
                            <button className='px-7 py-[10px] bg-opacity-80 hover:bg-white hover:text-black hover:outline-white duration-200 rounded-lg bg-transparent outline font-bold uppercase' onClick={() => window.location.href = '/herbalstore'}>Explore Herbs</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero3;