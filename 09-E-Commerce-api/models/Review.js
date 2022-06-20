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
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

ReviewSchema.statics.calculateAveragedReting = async function (productId) {
  console.log(productId);
};

ReviewSchema.post("save", async function () {
  console.log("Post save hook called");
  await this.constructor.calculateAveragedReting(this.product);
});

ReviewSchema.post("remove", async function () {
  console.log("Post remove hook called");
  await this.constructor.calculateAveragedReting(this.product);
});

module.exports = mongoose.model("Review", ReviewSchema);
