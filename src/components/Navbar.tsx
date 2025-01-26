"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartContext } from "@/context/CartContext";
import { ClerkLoaded, SignInButton, useUser, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { cart, removeFromCart, cartTotal } = useCartContext();
  const [cartItems, setCartItems] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  const addToCart = () => {
    setCartItems(cartItems + 1);
    setSubtotal(subtotal + 20); // Assume each item is $20 for this example
  };

  const calculateSubtotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const { user } =useUser();
  const createClerkPasskey =async () => {
    try{ 
      const response = await user?.createPasskey();
      console.log(response);
    } catch (err) {
      console.error("Error:", JSON.stringify(err, null,2));
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-[80px] bg-white flex items-center justify-between px-4 md:px-8 lg:px-16 shadow-md z-50">
      {/* Logo Section */}
      <div className="flex items-center">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={160}
            height={40}
            className="w-auto h-auto ml-2 sm:ml-4 cursor-pointer"
          />
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6 text-gray-800">
        <Link href="/" className="hover:text-[#333333] transition">
          Home
        </Link>
        <Link href="/shop" className="hover:text-[#333333] transition">
          Shop
        </Link>
        <Link href="/blog" className="hover:text-[#333333] transition">
          Blog
        </Link>
        <Link href="/contact" className="hover:text-[#333333] transition">
          Contact
        </Link>
      </div>

      {/* Actions (Cart, Search, Favorites, Profile) */}
      <div className="hidden sm:flex items-center space-x-4">
        {/* Profile Dropdown */}
        
        <div>
      {user ? (
            
            <div className="flex items-center space-x-2">
            <UserButton />
            </div>
            ) : (
              <SignInButton mode="modal" />
            )}
        <div>
      </div>
    </div>

        {/* Search */}
        <Link href="/search">
          <Image
            src="/images/search-icon.svg"
            alt="Search"
            width={24}
            height={24}
            className="w-6 h-6 cursor-pointer hover:opacity-80"
          />
        </Link>
        <ClerkLoaded>
        {user && (
          <>
        {/* Favorites */}
        <Link href="/asgaard-sofa">
          <Image
            src="/images/heart-icon.svg"
            alt="Favorites"
            width={24}
            height={24}
            className="w-6 h-6 cursor-pointer hover:opacity-80"
          />
        </Link>

        {/* Cart with Sliding Menu */}
        <div className="relative">
          <button onClick={toggleCart}>
            <Image
              src="/images/cart-icon.svg"
              alt="Cart"
              width={24}
              height={24}
              className="w-6 h-6 cursor-pointer hover:opacity-80"
            />
          </button>
          {(cart.length > 0 || cartItems > 0) && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cart.length || cartItems}
            </span>
          )}
        </div>
        </>
        )}

</ClerkLoaded>
      </div>
    
      {/* Mobile Menu Icon */}
<div className="md:hidden flex items-center gap-3">
  {/* Menu Button */}
 
   {/* User Authentication */}
   {user ? (
    <div className="flex items-center space-x-2">
      <UserButton />
    </div>
  ) : (
    <SignInButton mode="modal" />
  )}
  {/* Search */}
  <Link href="/search">
          <Image
            src="/images/search-icon.svg"
            alt="Search"
            width={24}
            height={24}
            className="w-6 h-6 cursor-pointer hover:opacity-80"
          />
        </Link>
   {/* Cart with Sliding Menu */}
  <div className="relative">
    <button onClick={toggleCart} aria-label="Open cart">
      <Image
        src="/images/cart-icon.svg"
        alt="Cart"
        width={24}
        height={24}
        className="w-6 h-6 cursor-pointer hover:opacity-80"
      />
    </button>
    {(cart.length > 0 || cartItems > 0) && (
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
        {cart.length || cartItems}
      </span>
    )}
  </div>

  <button
    aria-label="Toggle menu"
    className="text-gray-800 focus:outline-none hover:text-[#333333]"
    onClick={toggleMenu}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16m-7 6h7"
      />
    </svg>
  </button>

  
</div>


      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-[80px] left-0 w-full bg-white shadow-md md:hidden flex flex-col space-y-4 p-4">
          <Link href="/" className="hover:text-[#333333] transition">
            Home
          </Link>
          <Link href="/shop" className="hover:text-[#333333] transition">
            Shop
          </Link>
          <Link href="/blog" className="hover:text-[#333333] transition">
            Blog
          </Link>
          <Link href="/contact" className="hover:text-[#333333] transition">
            Contact
          </Link>
        </div>
      )}

      {/* Sliding Cart */}
      {cartOpen && (
        <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50 transform transition-transform duration-300">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold">Your Cart</h2>
            <button onClick={toggleCart} className="text-gray-600 hover:text-gray-800">
              Close
            </button>
          </div>
          <div className="p-4 space-y-4">
            {cart.length > 0 ? (
              <>
                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between space-x-4"
                  >
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      width={50}
                      height={50}
                      className="rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium">${item.price * item.quantity}</p>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                <div className="border-t pt-4">
                  <p className="text-lg font-semibold">Subtotal: ${cartTotal}</p>
                </div>
                <Link href={'/cart'}>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">CartPage</button>
              </Link>
              </>
            ) : (
              <p className="text-gray-600">Your cart is empty.</p>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
