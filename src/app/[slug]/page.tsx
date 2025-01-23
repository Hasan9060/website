'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { client } from '../../sanity/lib/client';
import Asgaardproduct from '../query/Asgaardproduct/page';
import { useCartContext } from "@/context/CartContext";
import Swal from "sweetalert2";

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
  const [loading, setLoading] = useState<boolean>(true);
  const [showFullDescription, setShowFullDescription] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedColor, setSelectedColor] = useState<string>('#816DFA');

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const query = `*[_type=='product' && slug.current=="${slug}"]{
        _id,
        title,
        price,
        description,
        "imageUrl": productImage.asset->url,
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
        title: "Added to Cart!",
        text: `${product.title} has been added to your cart.`,
        icon: "success",
        showConfirmButton: false,
        timer: 3000, 
        toast: true, 
        position: "top-end", 
        background: "#F9F1E7", 
        iconColor: "#816DFA", 
        customClass: {
          popup: "shadow-lg rounded-md", // Custom class for popup
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
    <li>
      <a href="/" className="text-[#333333]">Home</a>
    </li>
    <li>
      <Image src="/images/black-arr.png" alt="" width={20} height={20} />
    </li>
    <li>
      <a href="/shop" className="text-[#333333]">Shop</a>
    </li>
    <li>
      <Image src="/images/black-arr.png" alt="" width={20} height={20} />
    </li>
    <li>
      <span className="text-[#333333]">{product.title}</span>
    </li>
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

        {/* Product Image Container */}
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

          {/* Size and Color Selection */}
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

          {/* Quantity and Actions */}
          <div className="flex items-center gap-3 mt-6">
            <div className="flex items-center border border-black rounded-2xl w-[123px] h-[64px]">
              <button className="px-3" onClick={decrementQuantity}>-</button>
              <span className="px-4">{quantity}</span>
              <button className="px-3" onClick={incrementQuantity}>+</button>
            </div>
            <button
              className="w-[120px] h-[64px] rounded-lg border border-black mt-4 sm:mt-0 sm:ml-3 bg-black text-white font-medium shadow-lg transition-transform transform hover:scale-105 hover:bg-gray-800 active:scale-95"
              onClick={() => handleAddToCart(product)}
            >
              Add To Cart
            </button>
            <button className="w-52 h-16 bg-transparent text-black rounded-2xl border border-black flex items-center justify-center gap-2 mt-4 hover:bg-[#B88E2F] hover:text-white sm:mt-0 sm:ml-3">
              <span>+</span>
              <span>Compare</span>
            </button>
          </div>

          {/* Divider */}
          <div className="border-b btext-[#333333]] w-full mt-14"></div>
          <div className="mt-8 flex items-center justify-start gap-8">
            <div className="flex flex-col text-[#333333]">
    <span className="font-semibold">SKU</span>
    <span className="font-semibold">Category</span>
    <span className="font-semibold">Tags</span>
    <span className="font-semibold">Share</span>
  </div>
            <div className="flex flex-col text-[#333333]">
            <span>: SS001</span>
            <span>: Sofas</span>
            <span>: Sofa, Chair, Home, Shop</span>
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
      <div className='w-full border-b btext-[#333333]] mt-20'></div>
                  <div className='h-[744px]'>
                      <div className='flex flex-col sm:flex-row items-start justify-center gap-6 sm:gap-16 mt-10 text-[24px]'>
                          <h1 className='font-semibold'>Description</h1>
                          <span className='text-[#333333]'>Additional Information</span>
                          <span className='text-[#333333]'>Reviews [5]</span>
                      </div>
      
                      <div className='flex items-center flex-col mt-10'>
                          <p className='text-[#333333] w-full sm:w-[1026px] h-auto sm:h-[48px] px-4'>
                              Embodying the raw, wayward spirit of rock ‘n’ roll, the Kilburn portable active stereo speaker takes the unmistakable look and sound of Marshall, unplugs the chords, and takes the show on the road.
                          </p>
                          <br />
                          <p className='text-[#333333] w-full sm:w-[1026px] h-auto sm:h-[96px] px-4'>
                              Weighing in under 7 pounds, the Kilburn is a lightweight piece of vintage-styled engineering. Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound that is both articulate and pronounced. The analogue knobs allow you to fine-tune the controls to your personal preferences while the guitar-influenced leather strap enables easy and stylish travel.
                          </p>
                      </div>
      
                      <div className='flex flex-col gap-6 sm:flex-row items-center justify-around mt-10'>
                          <Image
                              src={"/images/sofa-fir.png"}
                              alt='sofa1'
                              width={605}
                              height={348}
                          />
                          <Image
                              src={"/images/sofa2.png"}
                              alt='sofa2'
                              width={605}
                              height={348}
                          />
                      </div>
                  </div>
                  <h1 className='text-[36px] font-semibold text-center mt-16'>Related Products</h1>
                <Asgaardproduct />           
    </>
  );
}
