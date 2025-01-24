"use client";
import { useState } from "react";
import { useSwipeable } from "react-swipeable"; // Import swipeable hooks

export default function Home() {
  const images = [
    "https://images.unsplash.com/photo-1533779283484-8ad4940aa3a8?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGludGVyaW9yJTIwZGVzaWdufGVufDB8fDB8fHww",
    "https://plus.unsplash.com/premium_photo-1661765778256-169bf5e561a6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1558&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1543248939-ff40856f65d4?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aW50ZXJpb3IlMjBkZXNpZ258ZW58MHx8MHx8fDA%3D",
    "https://plus.unsplash.com/premium_photo-1676968002767-1f6a09891350?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aW50ZXJpb3IlMjBkZXNpZ258ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1505576391880-b3f9d713dc4f?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aW50ZXJpb3IlMjBkZXNpZ258ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1519974719765-e6559eac2575?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aW50ZXJpb3IlMjBkZXNpZ258ZW58MHx8MHx8fDA%3D",
    "https://plus.unsplash.com/premium_photo-1684348962314-64fa628992f0?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aW50ZXJpb3IlMjBkZXNpZ258ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1502005097973-6a7082348e28?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGludGVyaW9yJTIwZGVzaWdufGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1505577058444-a3dab90d4253?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGludGVyaW9yJTIwZGVzaWdufGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGludGVyaW9yJTIwZGVzaWdufGVufDB8fDB8fHww",
    "https://plus.unsplash.com/premium_photo-1681113076872-c74b8926e70c?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGludGVyaW9yJTIwZGVzaWdufGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1525896544042-354764aa27e6?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGludGVyaW9yJTIwZGVzaWdufGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1527005980469-e172416c200b?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGludGVyaW9yJTIwZGVzaWdufGVufDB8fDB8fHww",
    "https://plus.unsplash.com/premium_photo-1670360414483-64e6d9ba9038?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGludGVyaW9yJTIwZGVzaWdufGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGludGVyaW9yJTIwZGVzaWdufGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGludGVyaW9yJTIwZGVzaWdufGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGludGVyaW9yJTIwZGVzaWdufGVufDB8fDB8fHww",
    "https://plus.unsplash.com/premium_photo-1661778812498-d56d7f09d1fd?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGludGVyaW9yJTIwZGVzaWdufGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1526057565006-20beab8dd2ed?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGludGVyaW9yJTIwZGVzaWdufGVufDB8fDB8fHww",
    
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const handlers = useSwipeable({
    onSwipedLeft: goToNext, // Swipe left to go to the next image
    onSwipedRight: goToPrevious, // Swipe right to go to the previous image
    trackMouse: true, // Allow mouse tracking for desktop
  });

  return (
    <div className="mt-11 flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center px-4">Explore 50+ Beautiful Room Inspirations</h1>

      <div className="relative w-full max-w-2xl mb-6" {...handlers}> {/* Apply swipeable handlers */}
        <img
          src={images[currentImageIndex]}
          alt="Room Design"
          className="w-full h-96 object-cover rounded-lg shadow-lg"
        />
        {/* Navigation buttons for desktop */}
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2 cursor-pointer text-white bg-black bg-opacity-50 p-2 rounded-full sm:block hidden" onClick={goToPrevious}>
          &#8592;
        </div>
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-white bg-black bg-opacity-50 p-2 rounded-full sm:block hidden" onClick={goToNext}>
          &#8594;
        </div>
      </div>

      <button
        onClick={goToNext}
        className="px-6 py-3 bg-indigo-600 text-white text-lg rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out hover:scale-105"
      >
        Explore Next Design
      </button>
    </div>
  );
}
