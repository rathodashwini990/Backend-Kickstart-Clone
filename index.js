const express = require("express")

const mongoose = require("mongoose")
const dotenv = require("dotenv");
const userRoute =require("./routes/Users")
const authRoute = require("./routes/auth")
const productRoute= require("./routes/Product")
const cartRoute= require("./routes/Cart")
const orderRoute = require("./routes/Order")
// const sRoute = require("./routes/Stripe");
// const payroute=require("./routes/Stripe")
const cors = require("cors");
const multer = require("multer");
// const stripeRoute = require("./routes/Stripe");
const path =require("path")

// const cors = require("cors");






const app = express();
app.use(
  cors({
    origin: "https://kickstarter2.netlify.app",
  })
);



dotenv.config();

app.use(
  "/Public/Images",
  express.static(path.join(__dirname, "/Public/Images"))
);

// Mongo Connect


mongoose
  .connect(
    "mongodb+srv://Ecom:ecom1234@cluster0.clhww.mongodb.net/KickstaterDb?retryWrites=true&w=majority"
  )
  .then(() => console.log("Database connected successfully"))
  .catch((err) => {
    console.log(err);
  });

//Image uploads routed

const storage = multer.diskStorage({
    destination: (req, file, cb) =>
    { 
        cb(null,"./Public/Images")
    }, filename: (req, file, cb) =>
    { 
        // const name = new Date()
        // name+=".jpg"
        cb(null,req.body.name);
    }
})

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) =>
{ 
    console.log("uploaded")
    res.status(200).json("File Uploaded")
})

//routes


app.use(express.json());


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);

// app.use("/api/cart", cartRoute);
// app.use("/api/order", orderRoute);
// app.use("/api/checkout", stripeRoute);

// 
// server start om port
app.listen(process.env.PORT||3500,()=> {
    console.log("server is up and running")

})
