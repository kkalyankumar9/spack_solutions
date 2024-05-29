import React from 'react';
import { useNavigate } from 'react-router-dom';

const SubscriptionsPlans = () => {
  // Define an array of subscription plans
  const navigate=useNavigate()
  const subscriptionPlans = [
    {
      name: "Basic",
      price: 99,
      duration:"month",
      description: "Access information about movies released in 2020",
    },
    {
      name: "Standard",
      price: 199,
      duration:"month",
      description: "Access information about movies released in 2020 and 2010.",
    },
    {
      name: "Premium",
      price: 299,
      duration:"month",
      description: "Access information about movies released in 2020, 2010 and 2000.",
    },
    {
      name: "Basic",
      price: 199,
      duration:"6 months",
      description: "Access information about movies released in 2020",
    },
    {
      name: "Standard",
      price: 499,
      duration:"6 months",
      description: "Access information about movies released in 2020 and 2010.",
    },
    {
      name: "Premium",
      price: 1299,
      duration:"6 months",
      description: "Access information about movies released in 2020, 2010 and 2000.",
    },
    {
      name: "Basic",
      price: 499,
      duration:"yearly",
      description: "Access information about movies released in 2020",
    },
    {
      name: "Standard",
      price: 1299,
      duration:"yearly",
      description: "Access information about movies released in 2020 and 2010.",
    },
    {
      name: "Premium",
      price: 1999,
      duration:"yearly",
      description: "Access information about movies released in 2020, 2010 and 2000.",
    },
  ];

  const handleClick=()=>{
    navigate("/subscribes")
  }
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {/* Map over the subscriptionPlans array */}
      {subscriptionPlans.map((plan, index) => (
        <div key={index} className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white">
          <div className="px-6 py-8">
            <div className="text-center">
              <h3 className="text-6xl font-medium text-gray-900">{plan.name}</h3>
              <div className="mt-4 flex items-center justify-center">
                <span className="text-3xl font-bold text-gray-900">₹{plan.price}</span>
                <span className="ml-1 text-sm font-semibold text-gray-600">/{plan.duration}</span>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-xl text-gray-500">{plan.description}</p>
            </div>
          </div>
          <div className="px-6 py-4 bg-gray-50">
            <button onClick={handleClick} className="w-full rounded-md bg-indigo-600 text-white py-2 px-4 text-sm font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Choose {plan.name}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubscriptionsPlans;
