import React from 'react';
import ImageSlider from "../components/products/ImageSlider.jsx"
import ProductCategories from "../components/products/ProductCategories.jsx"
import SearchAndFilters from "../components/products/SearchAndFilters.jsx"
import ProductCard from "../components/products/ProductCard.jsx"
function Product() {
  return (
    <>
    <div className="bg-black min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-blue-500 mb-4">All Products</h1>
        <div className="mb-8">
          <ImageSlider />
        </div>
        <div className="mb-8">
          <ProductCategories />
        </div>
        <div className="mb-8">
          <SearchAndFilters />
        </div>
        <div>
          <ProductCard />
        </div>
      </div>
    </div>
    </>
  );
}

export default Product;
// import React from 'react';

// const AllProducts = () => {
//   return (
//     <div className="bg-blue-50 min-h-screen">
//       {/* Image Slider */}
//       <div className="w-full overflow-hidden">
//         <div className="flex">
//           <img src="image1.jpg" alt="Slide 1" className="w-full h-64 object-cover" />
//           <img src="image2.jpg" alt="Slide 2" className="w-full h-64 object-cover" />
//           <img src="image3.jpg" alt="Slide 3" className="w-full h-64 object-cover" />
//         </div>
//       </div>

//       {/* Product Categories */}
//       <div className="py-8">
//         <h2 className="text-center text-2xl font-bold text-blue-700 mb-4">Product Categories</h2>
//         <div className="flex justify-center space-x-4">
//           <div className="text-center">
//             <img src="category1.jpg" alt="Category 1" className="w-24 h-24 rounded-full mx-auto" />
//             <p className="text-blue-600 mt-2">Category 1</p>
//           </div>
//           <div className="text-center">
//             <img src="category2.jpg" alt="Category 2" className="w-24 h-24 rounded-full mx-auto" />
//             <p className="text-blue-600 mt-2">Category 2</p>
//           </div>
//           <div className="text-center">
//             <img src="category3.jpg" alt="Category 3" className="w-24 h-24 rounded-full mx-auto" />
//             <p className="text-blue-600 mt-2">Category 3</p>
//           </div>
//         </div>
//       </div>

//       {/* Search and Filters */}
//       <div className="py-4 px-8">
//         <div className="flex justify-between items-center">
//           <input
//             type="text"
//             placeholder="Search products..."
//             className="border border-blue-300 rounded-lg p-2 w-1/2"
//           />
//           <select className="border border-blue-300 rounded-lg p-2">
//             <option>Filter by</option>
//             <option>Price</option>
//             <option>Popularity</option>
//             <option>Rating</option>
//           </select>
//         </div>
//       </div>

//       {/* Product Cards */}
//       <div className="py-8 px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         <div className="bg-white shadow-md rounded-lg overflow-hidden">
//           <img src="product1.jpg" alt="Product 1" className="w-full h-48 object-cover" />
//           <div className="p-4">
//             <h3 className="text-blue-700 font-bold">Product 1</h3>
//             <p className="text-blue-500">$20.00</p>
//           </div>
//         </div>
//         <div className="bg-white shadow-md rounded-lg overflow-hidden">
//           <img src="product2.jpg" alt="Product 2" className="w-full h-48 object-cover" />
//           <div className="p-4">
//             <h3 className="text-blue-700 font-bold">Product 2</h3>
//             <p className="text-blue-500">$30.00</p>
//           </div>
//         </div>
//         {/* Add more product cards as needed */}
//       </div>
//     </div>
//   );
// };

// export default AllProducts;
// implement all products page for an ecommprce website where data is like 1. image slider , 2. product catogories(rounded img and text) 3. (search + filters) 4. products cards . give a blueish theme to the website using tailwind 