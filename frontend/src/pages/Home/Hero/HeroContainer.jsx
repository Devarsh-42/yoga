// export default HeroContainer;
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Navigation, Pagination, Autoplay } from "swiper";
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Hero from './Hero';
import Hero2 from './Hero2';
import Hero3 from './Hero3';

const HeroContainer = () => {
  const [swiper, setSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <Swiper
        grabCursor={true}
        effect={"creative"}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: ["-120%", 0, -500],
          },
          next: {
            shadow: true,
            translate: ["120%", 0, -500],
          },
        }}
        modules={[EffectCreative, Navigation, Pagination, Autoplay]}
        className="w-full h-full"
        loop={true}
        speed={800}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false
        }}
        onSwiper={setSwiper}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        <SwiperSlide>
          <Hero />
        </SwiperSlide>
        <SwiperSlide>
          <Hero2 />
        </SwiperSlide>
        <SwiperSlide>
          <Hero3/>
        </SwiperSlide>
      </Swiper>

      {/* Custom navigation controls */}
      <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-between px-4 pointer-events-none">
        <button 
          onClick={() => swiper?.slidePrev()}
          className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center transition-all hover:bg-white/30 pointer-events-auto focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-lg"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        
        <button 
          onClick={() => swiper?.slideNext()}
          className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center transition-all hover:bg-white/30 pointer-events-auto focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-lg"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>
      
      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {[0, 1].map((index) => (
          <button
            key={index}
            onClick={() => swiper?.slideTo(index)}
            className={`w-2 h-2 rounded-full transition-all focus:outline-none ${
              activeIndex === index 
                ? "w-8 bg-blue-500" 
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroContainer;