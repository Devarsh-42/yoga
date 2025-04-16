import React from 'react';
import bgImg from '../../../assets/home/banner-1.jpg';

const Hero2 = () => {
    return (
        <div className='min-h-screen bg-cover' style={{ backgroundImage: `url(https://i.pinimg.com/736x/d4/bc/52/d4bc52cecd5376cd0807eb4e4cd99062.jpg)` }}>
            <div className="min-h-screen flex justify-start pl-11 text-white items-center bg-black bg-opacity-60">
                <div className="">
                    <div className="space-y-4">
                        {/* <h3 className='md:text-4xl text-2xl'>WE PROVIDES</h3> */}
                        <h1 className='md:text-7xl text-4xl font-bold '>Heal Mind & Body</h1>
                        <div className="md:w-1/2">
                            <p className=''>Discover the healing benefits of our specialized therapy sessions. Restore balance, reduce stress and nurture your wellbeing through personalized therapeutic approaches</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-5">
                            {/* <button className='px-7 py-3 rounded-lg bg-secondary font-bold uppercase'>Join Today</button> */}
                            <button className='px-7 py-[10px] bg-opacity-80 hover:bg-white hover:text-black hover:outline-white duration-200 rounded-lg bg-transparent outline font-bold uppercase' onClick={() => window.location.href = '/therapies'}>Explore Therapies</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero2;