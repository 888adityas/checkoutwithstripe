import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const SuccessPage = () => {
  const [timer, setTimer] = useState(6);
  const navigate = useNavigate();
  const location = useLocation();

  const recentOrder = JSON.parse(localStorage.getItem("placedOrderResData"));

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const sessionId = queryParams.get("session_id");

    // Option 2: Fetch session details from your server using the session ID
    if (window && sessionId) {
      fetchPaymentDetails(sessionId);
    }
  }, [location]);

  const fetchPaymentDetails = async (sessionId) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_PUBLIC_BACKEND_URL
        }/api/payment-details/${sessionId}`
      );
      const data = await response.json();

      console.log("Payment details:", data);
      console.log("recentOrder:", recentOrder);

      if (data.paymentId && recentOrder) {
        console.log(
          `${import.meta.env.VITE_PUBLIC_BACKEND_URL}/api/order/${
            recentOrder.data._id
          }`
        );
        const updateOrder = await fetch(
          `${import.meta.env.VITE_PUBLIC_BACKEND_URL}/api/order/${
            recentOrder.data._id
          }`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              transactionId: data.paymentId,
              paymentStatus: "successfull",
            }),
          }
        );

        const res_data = await updateOrder.json();
        if (res_data?.data) {
          localStorage.removeItem("placedOrderResData");
        }
      }
    } catch (error) {
      console.error("Error fetching payment details:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(interval);
      if (timer === 1) {
        navigate("/");
      }
    };
  }, [timer, navigate]);

  return (
    <div>
      <div className="flex flex-col items-center justify-center mt-20">
        <h1 className="text-4xl font-bold text-emerald-500 text-center p-3">
          Order Placed Successfully
        </h1>
        <p className="mt-4 text-lg text-gray-600 text-center p-2">
          Your order has been successfully placed. Thank you for shopping with
          us! Redirecting you in <span className="font-bold">00:0{timer}</span>
        </p>
      </div>
    </div>
  );
};

export default SuccessPage;
