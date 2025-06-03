import React, { useState, useEffect } from 'react';
import { FaSearch } from "react-icons/fa";
import Img1 from '../assets/img1.jpg'
import Img2 from '../assets/img2.jpg'
import Img3 from '../assets/img3.jpg'
import Img4 from '../assets/img4.jpg'
import Img5 from '../assets/img5.jpg'

export default function Carousel({ search, setSearch }) {

    const images = [Img1, Img2, Img3, Img4, Img5]; // ✅ Moved inside the component

    const [current, setCurrent] = useState(0);

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + images.length) % images.length);
    };

    // Autoplay
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <div className="relative max-w-full mx-auto">
                {/* Images container */}
                <div className="overflow-hidden md:max-h-[550px]">
                    <div
                        className="flex transition-transform ease-out duration-500"
                        style={{ transform: `translateX(-${current * 100}%)` }}
                    >
                        {images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Slide ${index}`}
                                className="w-full flex-shrink-0 brightness-[60%] object-cover"
                            />
                        ))}
                    </div>
                </div>

                <span className="">

                    {/* Search Box */}
                    <div className="absolute top-3/4 text-white left-1/2 transform -translate-x-1/2 flex gap-2">
                        <span className='flex items-center  rounded-md gap-1.5 border px-2 py-1.5 hover:border-2 hover:border-green-500'>
                            <FaSearch className='w-5 h-5' />
                            <input type='text'
                                className='w-[400px] focus:w-[500px] font-bold ease-in-out transition-all duration-700 bg-transparent focus:outline-none'
                                value={search}
                                onChange={(e) => setSearch(e.target.value)} />
                        </span>
                    </div>

                    {/* Previous Button */}
                    <button
                        onClick={prevSlide}
                        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/20 hover:bg-white/90 hover:text-black text-white rounded-full p-2 shadow"
                    >
                        ❮
                    </button>

                    {/* Next Button */}
                    <button
                        onClick={nextSlide}
                        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/20 hover:bg-white/90 hover:text-black text-white rounded-full p-2 shadow"
                    >
                        ❯
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrent(index)}
                                className={`h-2 w-2 rounded-full ${current === index ? 'bg-white' : 'bg-gray-400'
                                    }`}
                            ></button>
                        ))}
                    </div>
                </span>
            </div>
        </div>
    )
}
