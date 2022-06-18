const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Plesea provide rating"],
    },
    title: {
      type: String,
      trim: true,
      required: [true, "Plesea provide rating"],
      maxlength: 100,
    },
    comment: {
      type: String,
      required: [true, "Please provide reviews text"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      required: true,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "product",
      required: true,
    },
  },
  { timestamps: true }
);

ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

module.exports = mongoose.model("Review", ReviewSchema);
