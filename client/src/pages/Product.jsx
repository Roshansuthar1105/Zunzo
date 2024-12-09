import React from 'react';
import ImageSlider from "../components/products/ImageSlider.jsx"
import ProductCategories from "../components/products/ProductCategories.jsx"
import SearchAndFilters from "../components/products/SearchAndFilters.jsx"
import ProductCard from "../components/products/ProductCard.jsx"
function Product() {
  return (
    <>
    <div className="bg-blue-100 min-h-screen">
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

// implement all products page for an ecommprce website where data is like 1. image slider , 2. product catogories(rounded img and text) 3. (search + filters) 4. products cards . give a blueish theme to the website using tailwind 