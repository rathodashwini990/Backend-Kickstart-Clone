const cart = require("../models/cart");
const {
  verifytokenAndAuthorization,
  verifytokenAndAdmin,
  verfyToken,
} = require("./verifyToken");

const router = require("express").Router();

// Create

router.post("/", verfyToken, async (req, res) => {
  const newCart = new cart(req.body);

  try {
    const savedProduct = await newCart.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update Products

router.put("/:id", verifytokenAndAuthorization, async (req, res) => {
  try {
    const updatedcart = await cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedcart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete Product

router.delete("/:id", verifytokenAndAuthorization, async (req, res) => {
  try {
    await cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart data has been deleted.... ");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get user cart data single

router.get("/single/:userid",verifytokenAndAuthorization, async (req, res) => {
  //console.log("id")
  try {
      const prod = await cart.findOne({userId: req.params.userid });
    res.status(200).json(prod);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get All cart


router.get("/", verifytokenAndAdmin, async(req, res) => { 
 
    try {

        const Cart = await cart.find();
        res.status.json(Cart);

    } catch (err) { 
        res.status(500).json(err);
    }

})


module.exports = router;
