import { Schema, model } from "mongoose";

const categorySchema = Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, default: "default category description" },
  image: { type: String, default: "/images/tablets-category.png" },
  attrs: [{ key: { type: String }, value: [{ type: String }] }],
});
categorySchema.index({description: 1})
const Category = model("Category", categorySchema);
export default Category;
