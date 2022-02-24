// const { json } = require("express/lib/response");
const order = require("../models/order");
const {
  verifytokenAndAuthorization,
  verifytokenAndAdmin,
  verfyToken,
} = require("./verifyToken");

const router = require("express").Router();

// Create

router.post("/", verfyToken, async (req, res) => {
  const neworder = new order(req.body);

  try {
    const savedProduct = await neworder.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update Products

router.put("/:id", verifytokenAndAdmin, async (req, res) => {
  try {
    const updatedorder = await order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedorder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete Product

router.delete("/:id", verifytokenAndAdmin, async (req, res) => {
  try {
    await order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order data has been deleted.... ");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get user order data single

router.get("/single/:userid", verifytokenAndAuthorization, async (req, res) => {
  //console.log("id")
  try {
    const Orders = await order.find({ userId: req.params.userid });
    res.status(200).json(Orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get All cart

router.get("/", verifytokenAndAdmin, async (req, res) => {
  try {
      const Ord = await order.find();
      console.log(Ord)
    res.status(200).json(Ord);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get monthely incomee

router.get("/income", verifytokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const prevlastMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
    try {
        console.log(lastMonth,"-------",prevlastMonth)
        const income = await order.aggregate([
          { $match: { createdAt: { $gte: prevlastMonth } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount",
                },
            },
           {
            $group: {
              _id: "$month",
              total: { $sum: "$sales" },
            },
          },
        ]);
        console.log(income)
        res.status(200).json(income)

    } catch (err) { 
        console.log(err)
        res.status(500).json(err)
    }
     
});

module.exports = router;
