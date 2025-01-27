import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SiTicktick } from "react-icons/si";
import { RxCross1 } from "react-icons/rx";

const PaymentModal = ({ onClose, onPaymentComplete, selectedPlan }) => {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayNow = () => {
    toast.info("Please wait, your payment is being processed...");
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowOTP(true);
    }, 2000);
  };

  const handleOtpSubmit = () => {
    if (otp.trim() === "") {
      toast.error("OTP cannot be empty!");
    } else {
      setPaymentSuccess(true);
      toast.success("Your payment is successful!");
      setTimeout(() => {
        onPaymentComplete(true);
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 px-7">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md shadow-lg">
        <h3 className="text-xl font-bold text-center mb-4 text-white">Payment Details</h3>
        {paymentSuccess ? (
          <div className="text-center text-white">
            <h2 className="text-2xl font-semibold text-green-600 flex items-center justify-center"><SiTicktick className="mr-2" />Payment Successful!</h2>
            <p className="mt-4">Redirecting you to your home page...</p>
          </div>
        ) : (
          <>
            {paymentMethod ? (
              <>
                {!showOTP && (
                  <div className="space-y-4 text-black">
                    {paymentMethod === "Stripe" && (
                      <>
                        <div className="mb-4">
                          <label className="block text-gray-300 font-bold mb-2">Card Number</label>
                          <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-gray-300 font-bold mb-2">CVV</label>
                          <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="123"
                          />
                        </div>
                        <div className="mb-6">
                          <label className="block text-gray-300 font-bold mb-2">MM/YY</label>
                          <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="12/34"
                          />
                        </div>
                      </>
                    )}
                    {paymentMethod === "PayPal" && (
                      <>
                        <div className="mb-4">
                          <label className="block text-gray-300 font-bold mb-2">PayPal Email</label>
                          <input
                            type="email"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="example@paypal.com"
                          />
                        </div>
                      </>
                    )}
                    {paymentMethod === "QR" && (
                      <div className="text-white text-center">
                        <p>Scan the QR code to complete payment.</p>
                        <div className="bg-green-500 h-40 w-40 mx-auto my-4"></div>
                      </div>
                    )}
                    <button
                      onClick={handlePayNow}
                      className={`w-full bg-red-600 text-white py-3 rounded-md text-lg font-bold hover:bg-red-700 transition duration-200 mt-6 ${
                        isProcessing ? "opacity-50 pointer-events-none" : ""
                      }`}
                    >
                      {isProcessing ? "Processing..." : `Pay Now $${selectedPlan.price}`}
                    </button>
                  </div>
                )}
                {showOTP && (
                  <div className="mt-6 text-black">
                    <label className="block text-gray-300 font-bold mb-2">Enter OTP</label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter OTP"
                    />
                    <button
                      onClick={handleOtpSubmit}
                      className="w-full bg-green-600 text-white py-2 rounded-md text-lg font-bold mt-4 hover:bg-green-700 transition duration-200"
                    >
                      Submit
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="space-y-4">
                <button
                  onClick={() => setPaymentMethod("Stripe")}
                  className="w-full py-2.5 bg-blue-600 text-white rounded-lg"
                >
                  Pay with Stripe
                </button>
                <button
                  onClick={() => setPaymentMethod("PayPal")}
                  className="w-full py-2.5 bg-yellow-500 text-white rounded-lg"
                >
                  Pay with PayPal
                </button>
                <button
                  onClick={() => setPaymentMethod("QR")}
                  className="w-full py-2.5 bg-green-600 text-white rounded-lg"
                >
                  Pay with QR Code
                </button>
              </div>
            )}
          </>
        )}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition duration-200"
        >
          <RxCross1 />
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;
