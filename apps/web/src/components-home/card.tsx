"use client"
import React, { useState } from 'react';

export default function Card() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const items = [
        "dimana ini",
        "dan",
        "terjadi",
        "lagi",
        "kisah",
        "lama"
    ];

    return (
        <div>
            <div className="flex justify-between my-10">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className={`h-56 w-44 border flex justify-center bg-red-900 transition-opacity duration-500 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                        style={{ zIndex: index === currentIndex ? 1 : 0 }}
                    >
                        {item}
                    </div>
                ))}
            </div>
            <div className="flex justify-between mt-4">
                <button onClick={() => setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1))}>Previous</button>
                <button onClick={() => setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1))}>Next</button>
            </div>
        </div>
    );
}
