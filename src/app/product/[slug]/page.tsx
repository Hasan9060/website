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
  const [loading, setLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('#816DFA');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const query = `*[_type == "product" && slug.current == $slug][0]{
          _id,
          title,
          price,
          description,
          "imageUrl": productImage.asset->url
        }`;
        const fetchedProduct = await client.fetch(query, { slug });
        setProduct(fetchedProduct);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  const handleAddToCart = (product: Product) => {
    if (product) {
      addToCart({ ...product, quantity });
      Swal.fire({
        title: 'Added to Cart!',
        text: `${product.title} has been added to your cart.`,
        icon: 'success',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
      });
    }
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
      <div className="flex flex-col lg:flex-row items-start justify-evenly mt-16 px-4 lg:px-24 gap-12">
        {/* Sidebar Thumbnails */}
        <div className="flex flex-col gap-4">
          {[1, 2, 3, 4].map((num) => (
            <div key={num}>
              <Image
                src={product.imageUrl}
                alt={`Thumbnail ${num}`}
                width={76}
                height={80}
                className="w-20 h-20 object-contain"
              />
            </div>
          ))}
        </div>

        {/* Product Image */}
        <div className="w-full lg:w-1/2 h-auto flex items-center justify-center p-4 rounded-md">
          <Image
            src={product.imageUrl}
            alt={product.title}
            width={500}
            height={600}
            className="max-w-full h-auto"
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

          {/* Size and Color */}
          <h2 className="mt-14 text-[#333333]">Size:</h2>
          <div className="flex items-center gap-3 mt-4">
            {['L', 'XL', 'XS'].map((size) => (
              <button
                key={size}
                className="w-8 h-8 bg-[#F9F1E7] rounded flex items-center justify-center text-sm hover:bg-[#B88E2F] hover:text-white">
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

          {/* Quantity and Add to Cart */}
          <div className="flex items-center gap-3 mt-6">
            <div className="flex items-center border border-black rounded-2xl w-[123px] h-[64px]">
              <button className="px-3" onClick={decrementQuantity}>-</button>
              <span className="px-4">{quantity}</span>
              <button className="px-3" onClick={incrementQuantity}>+</button>
            </div>
            <button
              className="w-[120px] h-[64px] rounded-lg border border-black bg-black text-white"
              onClick={() => handleAddToCart(product)}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <h1 className='text-[36px] font-semibold text-center mt-16'>Related Products</h1>
      <Asgaardproduct />
    </>
  );
}
