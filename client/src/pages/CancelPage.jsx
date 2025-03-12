import React from "react";
import Header from "../components/Header";

const CancelPage = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center mt-20">
        <h1 className="text-4xl font-bold text-pink-700 text-center p-3">
          Order Cancelled
        </h1>
        <p className="mt-4 text-lg text-gray-600 text-center p-2">
          Your order has been cancelled. We hope to see you again soon!
        </p>
      </div>
    </div>
  );
};

export default CancelPage;
