const product = require("../models/product");
const {
  verifytokenAndAuthorization,
  verifytokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

// Create

// router.post("/", verifytokenAndAdmin, async (req, res) => {
router.post("/", async (req, res) => {
  
    const newProduct = new product(req.body)
    
    try {

        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);

    } catch (err)
    {
      console.log(err)
        res.status(500).json(err)
    }

});


//Update Products

router.put("/:id", verifytokenAndAdmin, async (req, res) => {
    
   


  try {
    const updatedProduct = await product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete Product

router.delete("/:id", verifytokenAndAdmin, async (req, res) => {
  try {
    await product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product data has been deleted.... ");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get product data single

router.get("/single/:id", async (req, res) => {
  //console.log("id")
  try {
    const prod = await product.findById(req.params.id);
   res.status(200).json(prod);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get All Product

router.get("/", async (req, res) => {
  const queryNew = req.query.new;
  const queryCatg = req.query.category;
    try {
        let Prod;

        if (queryNew) {
            Prod = await product.find().sort({ createdAt: -1 }).limit(10);
        }
        else if (queryCatg) {
            Prod = await product.find({
                categories: {
                    $in:[queryCatg],
                }
            })
         }
        else { 
            Prod = await product.find();
        }
      
   
    res.status(200).json(Prod);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
