"use client";

import React, { useState } from "react";
import Image from "next/image";
import { loadStripe } from "@stripe/stripe-js";
import { useCartContext } from "@/context/CartContext"; // Assuming you have this hook

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CheckOutPage = () => {
  const { cart, cartTotal, clearCart } = useCartContext();  // Destructure clearCart
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async () => {
    setLoading(true);
    setError(""); // Reset any previous errors
    const stripe = await stripePromise;

    // Prepare cart data to send to the backend
    const items = cart.map(item => ({
      name: item.title,
      price: item.price * 100, // Stripe expects the price in the smallest currency unit (e.g., cents)
      quantity: item.quantity,
      imageUrl: item.imageUrl,
    }));

    console.log("Sending items:", items); // Debugging line

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products: items }), // Send as 'products'
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Error from server:", errorResponse); // Log server response to get more details
        setError("Something went wrong with the checkout.");
        return;
      }

      const session = await response.json();

      if (stripe) {
        // Redirect to Stripe Checkout
        await stripe.redirectToCheckout({ sessionId: session.id });

        // Clear cart after successful checkout redirection
        clearCart();  // Clear the cart and localStorage
      }
    } catch (error) {
      console.error("Checkout failed:", error);
      setError("An error occurred during the checkout process.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <Image
        src={"/images/checkout.png"}
        alt="checkout"
        width={1440}
        height={316}
        className="w-full h-auto mt-20"
      />
      <div className="container mx-auto px-4 lg:px-12 mt-16 text-center">
        <h1 className="text-3xl font-semibold mb-5">Review Your Order</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-[500px] mx-auto">
          <h2 className="text-xl font-semibold mb-4">Products</h2>
          {cart.map(item => (
            <p key={item._id} className="text-lg mb-2">
              {item.title} <span className="text-black">X {item.quantity}</span>
            </p>
          ))}

          <div className="border-t border-gray-300 mt-4 pt-4">
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Subtotal:</span>
              <span className="font-semibold">Rs. {cartTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Total:</span>
              <span className="font-semibold">Rs. {cartTotal.toLocaleString()}</span>
            </div>
          </div>

          {error && <div className="text-red-500 mt-4">{error}</div>}

          <button
            className="w-full h-[48px] bg-black text-white rounded-xl mt-8"
            onClick={handleCheckout}
            disabled={loading}
          >
            {loading ? "Processing..." : "Place Order with Stripe"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
