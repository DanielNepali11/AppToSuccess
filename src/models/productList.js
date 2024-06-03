import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  // Define your list item properties here
  name: {
    type: String,
    required: true,
  },

  oldPrice: {
    type: Number,
    required: true,
  },
  newPrice: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageName: {
    type: String,
    required: true,
  },
});


const Product = mongoose.models.products || mongoose.model("products", productSchema);

export default Product;
