import React, { useState } from "react";
import PricingCard from "../components/PricingCard";
import PaymentModal from "../components/PaymentModal";
import PaymentForm from "../components/PaymentForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SubscriptionPage = () => {
  const [showPlans, setShowPlans] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);

  const plans = [
    {
      title: "Current Plan",
      price: "FREE",
      features: [
        { name: "Video & Audio Quality", value: "Fair" },
        { name: "Resolution", value: "240p, 480p" },
        { name: "Supported Devices", value: "Mobile, Phone, Tab" },
      ],
      buttonText: "Choose Plan",
      
    },
    {
      title: "Standard Plan",
      price: "49",
      features: [
        { name: "Video & Audio Quality", value: "Great" },
        { name: "Resolution", value: "Up to 1080p (Full HD)" },
        { name: "Supported Devices", value: "TV, Computer, Mobile, Tab" },
      ],
      buttonText: "Choose Plan",
    },
    {
      title: "Premium Plan",
      price: "99",
      features: [
        { name: "Video & Audio Quality", value: "Best" },
        { name: "Resolution", value: "4K (Ultra HD) + HDR" },
        { name: "Supported Devices", value: "TV, Computer, Mobile, Tab" },
        { name: "Audio", value: "Spatial Audio" },
      ],
      buttonText: "Choose Plan",
    },
  ];

  const handleChoosePlan = (planTitle, planPrice) => {
    setSelectedPlan({ title: planTitle, price: planPrice });
    setShowModal(true);
  };

  const handleSelectPayment = (method) => {
    setPaymentMethod(method);
    setShowModal(false);
    setShowPlans(false);
    setShowPaymentForm(true);
  };

  const handlePaymentComplete = (isSuccess) => {
    setShowPaymentForm(false);
    if (isSuccess) {
      toast.success(`Payment successful for ${selectedPlan.title}!`);
    } else {
      toast.error("Payment failed! Please try again.");
    }
    setShowPlans(true);
    setSelectedPlan(null);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center text-white">
      <ToastContainer position="top-right" autoClose={3000} />
      {showPlans && (
        <>
          <h1 className="text-4xl font-bold text-center mb-10 mt-8">Subscription Plans</h1>
          <div className="flex flex-wrap justify-center gap-8">
            <PricingCard plans={plans} onChoosePlan={handleChoosePlan} />
          </div>
        </>
      )}
      {showModal && (
        <PaymentModal
          onClose={() => setShowModal(false)}
          onSelectPayment={handleSelectPayment}
          selectedPlan={selectedPlan} // pass selected plan to modal
        />
      )}
      {showPaymentForm && (
        <PaymentForm
          selectedPlan={selectedPlan}
          paymentMethod={paymentMethod}
          onPaymentComplete={handlePaymentComplete}
        />
      )}
    </div>
  );
};

export default SubscriptionPage;
