const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema({
  plan: { type: String, required: true },
  price: { type: Number, required: true },
  interval: { type: String, required: true },
  stripeSubscriptionId: { type: String },
  userID: { type: String },
  username: { type: String },
});

const Subscription = mongoose.model("subscription", SubscriptionSchema);

module.exports = Subscription;
