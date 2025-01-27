import React from "react";

const PricingCard = ({ plans, onChoosePlan }) => {
  return (
    <div className="flex justify-center gap-8 flex-wrap">
      {plans.map((plan) => (
        <div
          key={plan.title}
          className="card w-80 p-6 border border-gray-800 rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:shadow-xl hover:border-red-600 flex flex-col"
        >
          <h3 className="text-2xl font-bold text-center mb-6">{plan.title}</h3>
          <p className="text-2xl font-bold text-center mb-6">${plan.price}</p>
          <hr className="border-t-2 border-gray-600 mb-6" />
          <ul className="space-y-4 text-left flex-grow">
            {plan.features.map((feature, index) => (
              <div key={index}>
                <li className="text-lg mb-2">
                  <span className="font-bold">{feature.name}: </span>
                  {feature.value}
                </li>
                {index < plan.features.length - 1 && (
                  <hr className="border-t-2 border-gray-600 my-4" />
                )}
              </div>
            ))}
          </ul>
          <button
            className={`w-full py-3 rounded-md text-lg font-bold transition duration-200 mt-6 ${
              plan.price === "FREE"
                ? "bg-gray-500 text-white cursor-not-allowed"
                : "bg-red-600 text-white hover:bg-red-700"
            }`}
            onClick={() => onChoosePlan(plan.title, plan.price)}
            disabled={plan.price === "FREE"}
          >
            {plan.buttonText}
          </button>
        </div>
      ))}
    </div>
  );
};

export default PricingCard;
