const express = require("express");
const subrouter = express.Router();
const { auth } = require("../middleware/auth");
const Subscription = require("../models/subcModel");

// Function to add months to a given date
const addMonths = (date, months) => {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + months);
  return newDate;
};

// Function to calculate end date based on the interval
const calculateEndDate = (startDate, interval) => {
  switch (interval) {
    case "monthly":
      return addMonths(startDate, 1).toISOString().split('T')[0];
    case "6 months":
      return addMonths(startDate, 6).toISOString().split('T')[0];
    case "yearly":
      return addMonths(startDate, 12).toISOString().split('T')[0];
    default:
      throw new Error("Invalid interval. Interval must be 'monthly', '6 months', or 'yearly'.");
  }
};

// Create or update subscription plans
subrouter.post("/create-plan", auth, async (req, res) => {
  const { plan, price, interval, userID } = req.body;

  // Calculate start date (current date)
  const startDate = new Date();

  try {
    // Calculate end date based on interval
    const endDate = calculateEndDate(startDate, interval);

    // Find existing subscription for the same user and plan
    let existingSubscription = await Subscription.findOne({ userID, plan });

    if (existingSubscription) {
      // If the same plan and user, update the existing subscription's end date and interval
      existingSubscription.price = price;
      existingSubscription.interval = interval;
      existingSubscription.endDate = calculateEndDate(existingSubscription.endDate, interval);

      await existingSubscription.save();
      return res.status(200).json({
        message: "Subscription updated.",
        subscription: existingSubscription,
      });
    }

    // If a different plan or no subscription exists, create a new subscription
    const subscription = new Subscription({
      plan,
      price,
      interval,
      startDate: startDate.toISOString().split('T')[0],
      endDate,
      userID,
    });

    // Save the new subscription
    await subscription.save();

    // Alert user and delete the old plan(s)
    let oldSubscriptions = await Subscription.find({ userID, _id: { $ne: subscription._id } });
    if (oldSubscriptions.length > 0) {
      // Delete old subscriptions (excluding the newly created one)
      for (let sub of oldSubscriptions) {
        await Subscription.findByIdAndDelete(sub._id);
      }
      return res.status(201).json({
        message: "New plan created. Old plan(s) deleted.",
        subscription,
      });
    }

    res.status(201).json(subscription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = subrouter;
