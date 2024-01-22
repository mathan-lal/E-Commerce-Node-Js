import { mongoose, Schema } from "mongoose";
const categorySchema = new Schema(
  {
    name: {
      type: String,
    },

    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);
export default Category;
