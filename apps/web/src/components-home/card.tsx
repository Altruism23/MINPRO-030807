"use client"
import React, { useState, useEffect } from 'react';

export default function Card() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [hoverIndex, setHoverIndex] = useState(-1); // State to track the hovered item index

    const imageUrls = [
        "https://example.com/page1",
        "https://example.com/page2",
        "https://example.com/page3",
        "https://example.com/page4",
        "https://example.com/page5",
    ];

    const images = [
        "pict/art.jpg",
        "pict/hobbies.jpg",
        "pict/karoke.jpg",
        "pict/music.jpg",
        "pict/mus.jpg",
        "pict/habi.jpg",
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, [images.length]);

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    return (
        <div className="relative w-full">
            <div className="relative w-full h-96 overflow-hidden flex justify-center items-center">
                <div className="relative w-full h-full flex justify-center items-center">
                    {images.map((_, index) => (
                        <a
                            key={index}
                            href={imageUrls[index]}
                            className={`absolute transition-all duration-500 transform ${
                                index === currentIndex ? 'opacity-100 scale-105' : 'opacity-50 scale-95'
                            } ${index === hoverIndex ? 'scale-110 z-30' : 'z-10'}`}
                            onMouseEnter={() => setHoverIndex(index)}
                            onMouseLeave={() => setHoverIndex(-1)}
                            style={{
                                left: '50%',
                                transform: `translateX(${(index - currentIndex) * 300}%) translateX(-50%)`,
                                textDecoration: 'none', // Remove default underline
                            }}
                        >
                            <img src={images[index]} alt={`Image ${index}`} className="px-2 h-3/4 w-96 max-w-96 object-cover" />
                        </a>
                    ))}
                </div>
            </div>
            <div className="flex mt-2 justify-between text-black">
                <button onClick={goToPrevious} className="mr-2 px-4 py-2 bg-gray-200 hover:bg-gray-300">Previous</button>
                <button onClick={goToNext} className="px-4 py-2 bg-gray-200 hover:bg-gray-300">Next</button>
            </div>
        </div>
    );
}
