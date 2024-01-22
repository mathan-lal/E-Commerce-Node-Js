import { mongoose, Schema } from "mongoose";
const productVariantSchema = new Schema(
  {
    size: {
      type: String,
      enum: ["sm", "md", "lg", "xl"],
    },
    stock_quantity: {
      type: Number,
    },
  },
  { _id: false }
);
//const ProductVariant = mongoose.model("ProductVariant", productVariantSchema);
export default productVariantSchema;
