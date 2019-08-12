import mongoose, { Schema } from "mongoose";

const schema = new Schema(
  {
    categorie: {
      type: String,
      require: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Categorie", schema);
