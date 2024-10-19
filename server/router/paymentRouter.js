const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
// console.log(process.env.PUBLIC_KEY);
// console.log(process.env.SECRET_KEY);
const router = express.Router();
const stripe = require("stripe")(`${process.env.SECRET_KEY}`);
// router endpoints
router.post("/intents", async (req, res) => {
  // Create a Payment
  try {
    console.log("amount :", req.body.amount);
    const { amount, userId } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "vnd",
      automatic_payment_methods: {
        enabled: true,
      },
      description: "Payment for order",
      // metadata: {
      //   userId: userId,
      // },
    });
    // Return the secret key
    res.json({
      paymentIntent: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
