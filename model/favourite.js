const mongoose = require("mongoose");

const favouriteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Register",
      required: true,
    },

    favouriteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

favouriteSchema.index(
  {
    userId: 1,
    favouriteId: 1,
  },
  {
    unique: true,
  }
);

module.exports = mongoose.model( "Favourite", favouriteSchema );
