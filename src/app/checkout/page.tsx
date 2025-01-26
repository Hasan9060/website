"use client";

import React, { useState } from "react";
import Image from "next/image";
import { loadStripe } from "@stripe/stripe-js";
import { useCartContext } from "@/context/CartContext"; // Assuming you have this hook

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CheckOutPage = () => {
  const { cart, cartTotal } = useCartContext();
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
      }
    } catch (error) {
      console.error("Checkout failed:", error);
      setError("An error occurred during the checkout process.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Image
        src={"/images/checkout.png"}
        alt="checkout"
        width={1440}
        height={316}
        className="w-full h-auto mt-20"
      />
      <div className="container mx-auto px-4 lg:px-12 mt-16">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-10">
          <div className="w-full lg:w-[60%]">
            <h1 className="text-[36px] font-semibold mb-5">Billing details</h1>
            {/* Form fields for billing details */}
          </div>

          <div className="w-full lg:w-[35%]">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-3">
                <h2 className="text-[24px] font-semibold">Product</h2>
                {cart.map(item => (
                  <p key={item._id} className="text-[#333333]">
                    {item.title} <span className="text-black">X {item.quantity}</span>
                  </p>
                ))}
                <span className="font-semibold">Subtotal</span>
                <span className="font-semibold">Total</span>
              </div>
              <div className="flex flex-col gap-3 text-right">
                <h2 className="text-[24px] font-semibold">Subtotal</h2>
                <span>Rs. {cartTotal.toLocaleString()}</span>
                <span>Rs. {cartTotal.toLocaleString()}</span>
                <span className="text-[#B88E2F] text-[24px] font-semibold">Rs. {cartTotal.toLocaleString()}</span>
              </div>
            </div>
            <div className="border-b border-[#D9D9D9] w-full mt-6"></div>

            {error && <div className="text-red-500 mt-4">{error}</div>}

            <div className="mt-10">
              <button
                className="w-full lg:w-[318px] h-[64px] border border-black rounded-2xl"
                onClick={handleCheckout}
                disabled={loading}
              >
                {loading ? "Processing..." : "Place order with Stripe"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
