// routes/subscriptions.js

const express = require("express");
const subrouter = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const { auth } = require("../middleware/auth");
const Subscription = require("../models/subcModel");

// Create subscription plans
subrouter.post("/create-plan", auth, async (req, res) => {
  const { plan, price, interval,userID,username } = req.body;
//   const userId = req.body.userID;
//   const username = req.body.username;
  try {
    // Check if the user already has a subscription for the same plan
    const existingSubscription = await Subscription.findOne({ userID, plan });
    if (existingSubscription) {
      return res
        .status(400)
        .json({ error: "You already have a subscription for this plan" });
    }

    const product = await stripe.products.create({
      name: plan,
    });

    const priceObj = await stripe.prices.create({
      unit_amount: price * 100,
      currency: "inr",
      recurring: { interval },
      product: product.id,
    });

    const subscription = new Subscription({
      plan,
      price,
      interval,
      stripeSubscriptionId: priceObj.id,
      userID,
      username,
    });

    await subscription.save();

    res.status(201).json(subscription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = subrouter;
