const user = require("../models/user");
const { verifytokenAndAuthorization, verifytokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

router.put("/:id", verifytokenAndAuthorization, async (req, res) => {
    //console.log("after veri")
    if (req.body.password) {
      req.body.password= CryptoJS.AES.encrypt(
        req.body.password,
        process.env.Pass_Key
      ).toString()
    }
   // console.log(req.user,1,req.body.username)
    try {
        const updatedUser = await user.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })

        res.status(200).json(updatedUser);

    } catch (err) { 
        res.status(500).json(err)
    }
});

//Delete

router.delete("/:id", verifytokenAndAuthorization, async (req, res) => { 
    try {
      await user.findByIdAndDelete(req.params.id)
        res.status(200).json("User data has been deleted.... ")
    } catch (err) { 
        res.status(500).json(err);
    }
})

//Get

router.get("/single/:id", verifytokenAndAdmin, async (req, res) => {
  //console.log("id")
  try {
      const ReqUser = await user.findById(req.params.id);
      const {password,...other }=ReqUser._doc
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get All

router.get("/", verifytokenAndAdmin, async (req, res) => {
    const query = req.query.new
  try {
      const AllUser = query ? await user.find().sort({_id:-1}).limit(10) : await user.find();
      // const {password,...other }=AllUser._doc
    res.status(200).json(AllUser);
  } catch (err) {
    res.status(500).json(err);
  }
});


//GET user stats 
router.get("/stats", verifytokenAndAdmin, async (req, res) => { 
  //console.log("stats")
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))//get todays late of last year
  //console.log(lastYear)
  try {

    const data = await user.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month:"$createdAt"}
        },
      },
      {
        $group: {
          _id: "$month",
          total: {$sum:1}
        },
      }
    ]);

    res.status(200).json(data);
  } catch (err) {
    //console.log(err)
    res.status(500).json(err)
   }
})

module.exports = router;