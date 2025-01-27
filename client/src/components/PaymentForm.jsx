import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PaymentPage = ({ initialPaymentMethod, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(initialPaymentMethod);

  const handlePayment = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`Payment via ${paymentMethod} successfully completed!`);
    }, 2000); // Simulate a 2-second payment process
  };

  const handleSelectPayment = (method) => {
    setPaymentMethod(method);
  };

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Overlay Background */}
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
        {/* Payment Modal Box */}
        <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
          {/* Close Button */}
          <button
            onClick={onClose} // Calls the passed `onClose` function to close the modal
            className="absolute top-2 right-2 text-gray-700 text-2xl font-bold hover:text-gray-900"
          >
            &times;
          </button>
          <h2 className="text-2xl font-bold mb-6 text-center">Payment Details</h2>

          {/* Conditional Rendering Based on Payment Method */}
          {paymentMethod === "PayPal" && (
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">PayPal Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter PayPal Email"
                />
              </div>
              <button
                type="button"
                onClick={handlePayment}
                className="w-full bg-yellow-500 text-white py-3 rounded-md text-lg font-bold hover:bg-yellow-700 transition duration-200"
              >
                {isLoading ? "Processing..." : "Pay with PayPal"}
              </button>
            </form>
          )}

          {paymentMethod === "Stripe" && (
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Card Number</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">CVV</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="123"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2">MM/YY</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="12/34"
                />
              </div>
              <button
                type="button"
                onClick={handlePayment}
                className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-bold hover:bg-blue-700 transition duration-200"
              >
                {isLoading ? "Processing..." : "Pay with Stripe"}
              </button>
            </form>
          )}

          {paymentMethod === "QR" && (
            <h1 className="text-2xl font-bold text-center">Scan QR Code to Pay</h1>
          )}

          {/* OR PAY WITH Section */}
          {paymentMethod !== "QR" && (
            <div className="mt-6">
              <div className="border-t border-gray-300 my-4"></div>
              <div className="text-center text-sm font-semibold text-gray-700">OR PAY WITH</div>
              <div className="mt-4 flex justify-center gap-4">
                <button
                  onClick={() => handleSelectPayment("PayPal")}
                  className="py-2 px-4 bg-yellow-500 text-white rounded-lg"
                >
                  Pay with PayPal
                </button>
                <button
                  onClick={() => handleSelectPayment("Stripe")}
                  className="py-2 px-4 bg-blue-600 text-white rounded-lg"
                >
                  Pay with Stripe
                </button>
                {paymentMethod !== "QR" && (
                  <button
                    onClick={() => handleSelectPayment("QR")}
                    className="py-2 px-4 bg-green-600 text-white rounded-lg"
                  >
                    Pay with QR Code
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
