import { mongoose, Schema } from "mongoose";
import productVariantSchema from "./ProductVariant.js";
const productSchema = new Schema(
  {
    name: {
      type: String,
    },

    description: {
      type: String,
    },

    tags: {
      type: [String],
    },

    color: {
      type: String,
    },

    images: {
      type: [String],
    },

    price: {
      type: Number,
    },

    soldCount: {
      type: Number,
    },

    inStock: {
      type: Boolean,
      default: true,
    },

    // variants: {
    //   type: Schema.Types.ObjectId,
    //   ref: "ProductVariant",
    // },

    variants: [productVariantSchema],
    selectedSize: {
      type: String,
      enum: ["sm", "md", "lg", "xl"], // Assuming selectedSize must be one of these values
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
