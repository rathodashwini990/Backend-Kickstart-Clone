const mongoose = require("mongoose")
const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
            productId: {
            type:String,
        },
            quantity: {
                type: Number,
                default:1,
            },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", CartSchema); 




// const CartSchema = new mongoose.Schema(
//   {
//     userId: { type: String, required: true },
//     coverimg: {type:String},
//     title: {type:String},
//     subtitle: {type:String},
//     amount: {type:String}
//   },
//   {
//     timestamps: true,
//   }
// );