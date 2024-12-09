import React from 'react';

function ImageSlider() {
  return (
    <div className="w-full h-96 bg-blue-500 flex justify-center items-center">
      <div className="w-4/5 h-4/5 bg-white rounded-lg shadow-md flex justify-center items-center">
        <div className="flex overflow-x-auto">
          <img src="path/to/your/image1.jpg" alt="Product Image 1" className="w-1/3 h-full object-cover rounded-lg" />
          <img src="path/to/your/image2.jpg" alt="Product Image 2" className="w-1/3 h-full object-cover rounded-lg" />
          <img src="path/to/your/image3.jpg" alt="Product Image 3" className="w-1/3 h-full object-cover rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export default ImageSlider;

