import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

const SubscriptionForm = () => {
  const [plan, setPlan] = useState('');
  const [price, setPrice] = useState('');
  const [interval, setInterval] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = useSelector((store) => store.AuthReducer.token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        'https://spack-solutions.onrender.com/subscribe/create-plan',
        { plan, price, interval}, 
        { headers: { Authorization: ` ${token}` } } 
      );

      console.log(response.data);
      console.log(response.token);
      toast.success('Subscription created successfully!');
      // Handle success (e.g., redirect to payment page)
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
        toast.error('Failed to create subscription: ' + error.response.data.error);
      } else {
        setError('An unexpected error occurred. Please try again later.');
        toast.error('An unexpected error occurred. Please try again later.');
      }
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6">
      <h2 className="text-xl font-semibold mb-4">Subscribe to a Plan</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (INR):</label>
         
          
          <select
           id="plan"
           type="text"
           value={plan}
           onChange={(e) => setPlan(e.target.value)}
           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
           required
           >
            <option value="">Select Plan</option>
            <option value="basic">Basic</option> 
            <option value="standards">Standard</option> 
            <option value="premium">Premium</option>

           </select>

        </div>
      
        <div className="mb-4">
          <label htmlFor="plan" className="block text-sm font-medium text-gray-700">Plan:</label>
          <select
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          required
           >
            <option value="">Price</option>
            <option value="99">99</option> 
            <option value="499">499</option> 
            <option value="999">999</option>
            <option value="199">199</option> 
            <option value="999">999</option> 
            <option value="1299">1299</option>
            <option value="499">499</option> 
            <option value="1299">1299</option> 
            <option value="1999">1999</option>

           </select>
        </div>
       
        <div className="mb-4">
          <label htmlFor="interval" className="block text-sm font-medium text-gray-700">Interval:</label>
          <select
            id="interval"
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            required
          >
            <option value="">Select Interval</option>
            <option value="monthly">monthly</option> 
            <option value="6 months">6 months</option> 
            <option value="yearly">yearly</option> 

          </select>

      
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          
        >
          {loading ? 'Submitting...' : 'Subscribe'}
        </button>
      </form>
    </div>
  );
};

export default SubscriptionForm;
