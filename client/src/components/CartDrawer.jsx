import { useDispatch, useSelector } from "react-redux";
import { XMarkIcon, TrashIcon } from "@heroicons/react/24/outline";
import { toggleCart } from "../features/cart/cartSlice";
import {
  addToCart,
  removeFromCart,
  decreaseQuantity,
} from "../features/cart/cartSlice";

import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

const CartDrawer = () => {
  const dispatch = useDispatch();
  const { isOpen, items } = useSelector((state) => state.cart);
  const [userEmail, setUserEmail] = useState("");

  const submitBtnIsDisabled =
    items.length === 0 || !userEmail || !userEmail.includes("@");

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    console.log("cart-items:", items);
    console.log(
      "VITE_STRIPE_PUBLIC_KEY:",
      import.meta.env.VITE_PUBLIC_STRIPE_PUBLIC_KEY
    );
    console.log("VITE_BACKEND_URL:", import.meta.env.VITE_PUBLIC_BACKEND_URL);
    console.log("userEmail:", userEmail);

    const placeOrderFn = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_PUBLIC_BACKEND_URL}/api/order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ items, email: userEmail }),
        }
      );
      const data = await response.json();
      return data;
    };

    const placedOrderResData = await placeOrderFn();
    localStorage.setItem(
      "placedOrderResData",
      JSON.stringify(placedOrderResData)
    );

    const stripe = await loadStripe(
      import.meta.env.VITE_PUBLIC_STRIPE_PUBLIC_KEY
    );
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch(
      `${import.meta.env.VITE_PUBLIC_BACKEND_URL}/api/create-checkout-session`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({ items, email: userEmail }),
      }
    );

    // =========================================================
    const session = await response.json();
    console.log("session.session:", session.session);
    console.log("session.payment_intent:", session.payment_intent);

    // await new Promise((resolve) => setTimeout(resolve, 30000));

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
      // successUrl: `${window.location.origin}/ordersuccessfull?session_id=${session.id}`,
    });
    console.log("result:", result);

    if (result.error) {
      return console.log(result.error);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-white/30 backdrop-blur-sm z-20 transition-all duration-300"
        onClick={() => dispatch(toggleCart())}
      />

      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white z-30 shadow-xl transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-bold">Your Cart</h2>
            <button
              onClick={() => dispatch(toggleCart())}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                Your cart is empty
              </p>
            ) : (
              <ul className="space-y-4">
                {items?.map((item) => (
                  <li
                    key={item.id}
                    className="flex gap-4 border-b border-gray-400 pb-4"
                  >
                    <div className="h-20 w-20 flex-shrink-0 rounded bg-gray-100 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{item.name}</h3>
                        <button
                          onClick={() => dispatch(removeFromCart(item.id))}
                          className="text-gray-500 hover:text-red-500"
                        >
                          <TrashIcon
                            title="remove from cart"
                            className="cursor-pointer h-5 w-5"
                          />
                        </button>
                      </div>
                      <div className="flex items-center mt-1">
                        <span className="text-sm text-gray-500 mr-2">Qty:</span>
                        <div className="flex items-center border rounded">
                          <button
                            onClick={() => dispatch(decreaseQuantity(item.id))}
                            className="px-2 py-1 hover:bg-pink-50 cursor-pointer"
                            // disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="px-2">{item.quantity}</span>
                          <button
                            onClick={() => dispatch(addToCart(item))}
                            className="px-2 py-1 hover:bg-emerald-50 cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <p className="font-medium mt-1">${item.price}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t">
            <div className="flex justify-between font-bold text-lg mb-4">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <input
              value={userEmail}
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 border rounded mb-2"
              onChange={(e) => setUserEmail(e.target.value?.trim())}
              required
            />
            <button
              className="w-full cursor-pointer disabled:cursor-not-allowed bg-indigo-600 disabled:bg-gray-300 hover:bg-indigo-700 text-white py-2 px-4 rounded-md"
              disabled={submitBtnIsDisabled}
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
