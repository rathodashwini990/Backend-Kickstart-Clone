const router = require("express").Router();
const User = require("../models/user")
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken")


// Register===================================
router.post("/register", async (req, res) => {
    const newUser = User({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.Pass_Key
      ).toString(),
      //   username: req.body.username,
    });
   

    try {
        const savedUser = await newUser.save();//save method of mongoose "User" <= user Schema
        //console.log(savedUser)
        res.status(201).json(savedUser);
    } catch (err) { 
        console.log(err)
        res.status(500).json(err)
       // console.log(err);
    }

});

// Login========================

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })

        !user && res.status(401).json("Wrong User name or User not registered")

        const hastpass = CryptoJS.AES.decrypt(
            user.password,
            process.env.Pass_Key
        ).toString(CryptoJS.enc.Utf8);

        hastpass !== req.body.password && res.status(401).json("Wrong Password");

        const accessToken = jwt.sign(
          {
            id: user._id,
            isAdmin: user.isAdmin,
          },
          process.env.JWK,
          { expiresIn: "3d" }
        );

        const { password, ...others } = user._doc;

        res.status(200).json({ ...others,accessToken });

    } catch(err) { 
        res.status(500).json(err)
    }
})


module.exports = router;



