const mongoose = require("mongoose")
const ProductSchema = new mongoose.Schema(
  {
    title: { type: String },
    subtitletitle: { type: String },
    coverimg: { type: String },
    Backers: { type: Number },
    amountcollected: { type: Number },
    Pledgedamount: { type: Number },
    Daystogo: { type: Number },
    Category: { type: String },
    VedioLink: { type: String },
    Campimg1: { type: String },
    Campimg2: { type: String },
    Campimg3: { type: String },
    Campimg4: { type: String },
    Campimg5: { type: String },
    Campimg6: { type: String },
    Campimg7: { type: String },
    Campimg8: { type: String },
    Campimg9: { type: String },
    Campimg10: { type: String },
    CampVideo1: { type: String },
    CampVideo2: { type: String },
    CampVideo3: { type: String },
    CampVideo4: { type: String },
    CampVideo5: { type: String },
    Shopingestimatetext: { type: String },
    TermsandConditions: { type: String },
    Rates: { type: String },
    Riskandchallanges: { type: String },
  },
  {
    timestamps: true,
  }
);
// const ProductSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     desc: { type: String, required: true },
//     img: { type: String, required: true },
//     categories: { type: Array, required: true },
//     size: { type: String, required: true },
//     color: { type: String, required: true },
//     price: { type: Number, required: true },
//   },
//   {
//     timestamps: true,
//   }
// );

module.exports = mongoose.model("Product", ProductSchema); 