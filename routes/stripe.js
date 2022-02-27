const router = require("express").Router();
const stripe = require("stripe")(
  "sk_test_51KUXUcSHvjPvbOCWN830vYk2OPLJw5fDOB7gkv8JILoCHfGNcnAEErkSvF94X29ekYKPUjmaQpe740VRxG82fYpE00mXE5jSHP"
);
// import StripeCheckout from "react-stripe-checkout";

router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "INR",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        console.log(stripeErr);
        res.status(200).json(stripeRes);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;
