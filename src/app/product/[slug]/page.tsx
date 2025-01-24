'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import sanityClient from "@sanity/client";
import client from '@/sanity/lib/client';
import Asgaardproduct from '@/app/query/Asgaardproduct/page';
import { useCartContext } from '@/context/CartContext';
import Swal from 'sweetalert2';

const sanity = sanityClient({
  projectId: "2srh4ekv",
  dataset: "productions",
  apiVersion: '2025-01-18',
  token:  process.env.SANITY_API_TOKEN,
  useCdn: true,
});

// Product Interface
interface Product {
  tags: string[];
  category: string;
  _id: string;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
}

// Props Interface
interface PageProps {
  params: {
    slug: string;
  };
}

export default function Page({ params: { slug } }: PageProps) {
  const { addToCart } = useCartContext();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showFullDescription, setShowFullDescription] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedColor, setSelectedColor] = useState<string>('#816DFA');
  const [activeTab, setActiveTab] = useState<'description' | 'additionalInfo' | 'reviews'>('description');

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const query = `*[_type=='product' && slug.current=="${slug}"]{
        _id,
        title,
        price,
        description,
        "imageUrl": productImage.asset->url,
        tags,
        category,
      }[0]`;
      const fetchedProduct: Product | null = await client.fetch(query);
      setProduct(fetchedProduct);
      setLoading(false);
    };

    fetchProduct();
  }, [slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = (product: any) => {
    addToCart({ ...product, quantity: 1 });
    Swal.fire({
      title: 'Added to Cart!',
      text: `${product.title} has been added to your cart.`,
      icon: 'success',
      showConfirmButton: false,
      timer: 3000,
      toast: true,
      position: 'top-end',
      background: '#F9F1E7',
      iconColor: '#816DFA',
      customClass: {
        popup: 'shadow-lg rounded-md',
      },
    });
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <>
      {/* Navigation Bar */}
      <nav className="bg-[#F9F1E7] h-24 mt-20 flex items-center gap-8 pl-20">
        <ul className="flex items-center gap-2 list-none">
          <li><a href="/" className="text-[#333333]">Home</a></li>
          <li><Image src="/images/black-arr.png" alt="" width={20} height={20} /></li>
          <li><a href="/shop" className="text-[#333333]">Shop</a></li>
          <li><Image src="/images/black-arr.png" alt="" width={20} height={20} /></li>
          <li><span className="text-[#333333]">{product.title}</span></li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row items-start justify-center mt-8 px-4 sm:px-12 lg:px-20 gap-6">
        {/* Sidebar Thumbnails */}
        <div className="flex flex-row lg:flex-col gap-4">
          {[1, 2, 3, 4].map((num) => (
            <div key={num}>
              <Image
                src={product.imageUrl}
                alt={`Thumbnail ${num}`}
                width={60}
                height={60}
                className="w-16 h-16 object-contain rounded-md border border-gray-300"
              />
            </div>
          ))}
        </div>

        {/* Product Image Container */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <Image
            src={product.imageUrl}
            alt={product.title}
            width={250}
            height={250}
            className="rounded-md"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col max-w-lg">
          <h1 className="text-4xl font-semibold mb-2">{product.title}</h1>
          <span className="text-2xl text-[#333333]">$ {product.price}</span>

          {/* Product Description */}
          <p className="mt-6 text-sm lg:text-base">
            {showFullDescription
              ? product.description
              : `${product.description.slice(0, 260)}...`}
            <button
              className="text-blue-700 underline ml-2"
              onClick={() => setShowFullDescription(!showFullDescription)}
            >
              {showFullDescription ? 'Read Less' : 'Read More'}
            </button>
          </p>

          {/* Size and Color Selection */}
          <h2 className="mt-14 text-[#333333]">Size:</h2>
          <div className="flex items-center gap-3 mt-4">
            {['L', 'XL', 'XS'].map((size) => (
              <button
                key={size}
                className="w-8 h-8 bg-[#F9F1E7] rounded flex items-center justify-center text-sm hover:bg-[#B88E2F] hover:text-white"
              >
                {size}
              </button>
            ))}
          </div>

          <h2 className="mt-14 text-[#333333]">Color:</h2>
          <div className="flex items-center gap-3 mt-4">
            {['#816DFA', 'black', '#B88E2F'].map((color) => (
              <div
                key={color}
                className={`w-8 h-8 rounded-full cursor-pointer ${
                  selectedColor === color ? 'ring-2 ring-black' : ''
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              ></div>
            ))}
          </div>

          {/* Quantity and Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-3 mt-6">
            <div className="flex items-center border border-black rounded-2xl w-full sm:w-[123px] h-16">
              <button className="px-3" onClick={decrementQuantity}>-</button>
              <span className="px-4 flex-1 text-center">{quantity}</span>
              <button className="px-3" onClick={incrementQuantity}>+</button>
            </div>
            <button
              className="w-full sm:w-[120px] h-16 rounded-lg border border-black bg-black text-white font-medium shadow-lg transition-transform transform hover:scale-105 hover:bg-gray-800 active:scale-95"
              onClick={() => handleAddToCart(product)}
            >
              Add To Cart
            </button>
            <button className="w-full sm:w-52 h-16 bg-transparent text-black rounded-2xl border border-black flex items-center justify-center gap-2 hover:bg-[#B88E2F] hover:text-white">
              <span>+</span>
              <span>Compare</span>
            </button>
          </div>

          {/* Divider */}
          <div className="border-b text-[#333333] w-full mt-14"></div>
          <div className="mt-8 flex items-center justify-start gap-8">
            <div className="flex flex-col text-[#333333]">
              <span className="font-semibold">SKU</span>
              <span className="font-semibold">Category</span>
              <span className="font-semibold">Tags</span>
              <span className="font-semibold">Share</span>
            </div>
            <div className="flex flex-col text-[#333333]">
              <span>: SS001</span>
              <span>: {product.category}</span>
              <span>: {product.tags}</span>
              <div className="flex items-center justify-start gap-3">
                :
                {['fb', 'in', 'twi'].map((social) => (
                  <Image
                    key={social}
                    src={`/images/${social}.png`}
                    alt={social}
                    width={20}
                    height={20}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="w-full border-b text-[#333333] mt-20"></div>
      <div className="h-auto">
        <div className="flex flex-col sm:flex-row items-start justify-center gap-6 sm:gap-16 mt-10 text-lg sm:text-2xl">
          <button
            className={`${activeTab === 'description' ? 'font-bold' : ''}`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button
            className={`${activeTab === 'additionalInfo' ? 'font-bold' : ''}`}
            onClick={() => setActiveTab('additionalInfo')}
          >
            Additional Information
          </button>
          <button
            className={`${activeTab === 'reviews' ? 'font-bold' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </button>
        </div>

        {activeTab === 'description' && (
          <div className="flex flex-col items-center mt-10 px-4">
            <p className="text-[#333333] w-full max-w-4xl h-auto text-base sm:text-lg">
              {showFullDescription
                ? product.description
                : `${product.description.slice(0, 560)}...`}
              <button
                className="text-blue-700 underline ml-2"
                onClick={() => setShowFullDescription(!showFullDescription)}
              >
                {showFullDescription ? 'Read Less' : 'Read More'}
              </button>
            </p>
          </div>
        )}

        {activeTab === 'additionalInfo' && (
          <div className="flex flex-col items-center mt-10 px-4">
            <p className="text-[#333333] w-full max-w-4xl h-auto text-base sm:text-lg">
              This furniture is not only beautiful but also made with great quality craftsmanship, ensuring durability and style.
              You can buy it at an affordable price, making it the perfect addition to your home or office. Whether you're looking to
              upgrade your living room, bedroom, or workspace, this furniture offers both elegance and functionality. Don’t miss out on
              this amazing deal—buy it now before it’s too late and transform your space today!
            </p>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="flex flex-col items-center mt-10 px-4">
            <h2 className="text-2xl font-bold text-center mb-6">Customer Reviews</h2>

            {/* Existing Reviews */}
            <div className="w-full max-w-4xl space-y-6">
              <div className="border-b pb-4">
                <div className="flex items-center mb-2">
                  <span className="font-bold text-lg">Usman Ali</span>
                  <span className="ml-4 text-sm text-gray-500">January 20, 2025</span>
                </div>
                <div className="flex items-center mb-2">
                  <span className="text-yellow-500">★★★★★</span>
                  <span className="ml-2 text-sm text-gray-600">5.0</span>
                </div>
                <p className="text-gray-700">
                  I love this furniture; it's the best and most comfortable I've ever had. The design is so stylish, and it makes my
                  home feel warm and inviting. I can spend hours relaxing on it without any discomfort!
                </p>
              </div>

              <div className="border-b pb-4">
                <div className="flex items-center mb-2">
                  <span className="font-bold text-lg">Alina</span>
                  <span className="ml-4 text-sm text-gray-500">January 18, 2025</span>
                </div>
                <div className="flex items-center mb-2">
                  <span className="text-yellow-500">★★★★☆</span>
                  <span className="ml-2 text-sm text-gray-600">4.0</span>
                </div>
                <p className="text-gray-700">
                  I absolutely love this furniture! It's not only the best but also the most comfortable I've ever owned. The
                  quality is outstanding, and it adds such a cozy and modern touch to my space. Every time I sit down, I feel relaxed
                  and at ease! Still worth the price!
                </p>
              </div>
            </div>

            {/* Add a Review */}
            <div className="w-full max-w-4xl mt-10">
              <h3 className="text-xl font-bold mb-4">Write a Review</h3>
              <form className="space-y-4">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                    placeholder="Enter your name"
                  />
                </div>

                {/* Rating Field */}
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="rating">
                    Rating
                  </label>
                  <select
                    id="rating"
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    <option value="5">5 - Excellent</option>
                    <option value="4">4 - Good</option>
                    <option value="3">3 - Average</option>
                    <option value="2">2 - Poor</option>
                    <option value="1">1 - Terrible</option>
                  </select>
                </div>

                {/* Review Field */}
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="review">
                    Review
                  </label>
                  <textarea
                    id="review"
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                    placeholder="Write your review here..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-black text-white rounded-lg py-2 font-medium hover:bg-gray-800 transition"
                >
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-6 sm:flex-row items-center justify-around mt-10">
        <Image src={"/images/sofa-fir.png"} alt="sofa1" width={605} height={348} />
        <Image src={"/images/sofa2.png"} alt="sofa2" width={605} height={348} />
      </div>

      <h1 className="text-[36px] font-semibold text-center mt-16">Related Products</h1>
      <Asgaardproduct />
    </>
  );
}
