const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    desc: { type: String, require: true },
    image: { type: String, require: true },
    price: { type: String, require: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Register",
      required: true,
    },
    status : { type: String, enum: [ "public", "private" ], default: "private" },
  },
  { timestamps: true }
);

const modelProduct = mongoose.model("Product", productSchema);

module.exports = modelProduct;
