const router = require("express").Router();
const User = require("../models/user")
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer");

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
      const savedUser = await newUser.save(); //save method of mongoose "User" <= user Schema
      //console.log(savedUser)

      // sending mail for registered user//24feb2022//kickstarter57@gmail.com

      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "kickstarter57@gmail.com",
          pass:"24feb2022"
        },
      });

      let mailoption = {
        from: "kickstarter57@gmail.com",
        to: savedUser.email,
        subject: "Mail for successful user registration",
        text: "Thank you for registering at Kick starter, please feel free to mail us for any query or suggestions. ",
      };

      transporter.sendMail(mailoption, function (err, info)
      { 
        if (err) { console.log(err) }
        else console.log(info.response)
      })

      res.status(201).json(savedUser);
    } catch (err) { 
        console.log(err)
        res.status(500).json(err)
       // console.log(err);
    }

});

// Login========================

router.post("/login", async (req, res) =>
{
  console.log(req.body)
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
        console.log("logged in")
        res.status(200).json({ ...others,accessToken });

    } catch(err) { 
        res.status(500).json(err)
    }
})


module.exports = router;



