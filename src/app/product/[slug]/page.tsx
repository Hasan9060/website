'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { createClient } from '@sanity/client';
import Asgaardproduct from '@/app/query/Asgaardproduct/page';
import { useCartContext } from '@/context/CartContext';
import Swal from 'sweetalert2';

// Sanity Client Setup
const client = createClient({
  projectId: '2srh4ekv',
  dataset: 'productions',
  apiVersion: '2023-01-01',
  useCdn: true,
  token: 'skz6lWFJkAgpfrjXgwK8Tb6UBsTpRcSwzsQawON5Qps118XQdODrtVLdyXySTgJqC7rhPUKAOzb9prGs2aORcV0IICFN6pLKCLW2G0P7u5rExc8E92fzYp0UMuro6VpCzm51svtpWMCniHWaEiZAeJApDrYyIXgO5Uar4GLM2QPxFsswwZnU',
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

  const handleAddToCart = () => {
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

  return (
    <div>
      <nav className="bg-[#F9F1E7] h-24 mt-20 flex items-center gap-8 pl-20">
        <ul className="flex items-center gap-2">
          <li><a href="/">Home</a></li>
          <li><Image src="/images/black-arr.png" alt="" width={20} height={20} /></li>
          <li><a href="/shop">Shop</a></li>
          <li><Image src="/images/black-arr.png" alt="" width={20} height={20} /></li>
          <li>{product.title}</li>
        </ul>
      </nav>

      <div className="flex flex-col lg:flex-row mt-16 px-4 lg:px-24 gap-12">
        <div className="flex flex-col gap-4">
          {[1, 2, 3, 4].map((_, index) => (
            <Image
              key={index}
              src={product.imageUrl}
              alt={`Thumbnail ${index + 1}`}
              width={76}
              height={80}
              className="w-20 h-20 object-contain"
            />
          ))}
        </div>

        <div className="w-full lg:w-1/2">
          <Image
            src={product.imageUrl}
            alt={product.title}
            width={500}
            height={600}
          />
        </div>

        <div className="flex flex-col max-w-lg">
          <h1 className="text-4xl font-semibold mb-2">{product.title}</h1>
          <span className="text-2xl">$ {product.price}</span>
          <p>
            {showFullDescription ? product.description : `${product.description.slice(0, 260)}...`}
            <button onClick={() => setShowFullDescription(!showFullDescription)}>
              {showFullDescription ? 'Read Less' : 'Read More'}
            </button>
          </p>

          {/* Add to Cart Section */}
          <div>
            <button onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}>-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
          </div>
          <button onClick={handleAddToCart}>Add To Cart</button>
        </div>
      </div>

      <h1 className="text-center mt-16">Related Products</h1>
      <Asgaardproduct />
    </div>
  );
}
