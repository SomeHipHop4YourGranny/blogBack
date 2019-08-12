import mongoose, { Schema } from "mongoose";

const schema = new Schema(
  {
    text: {
      type: String,
      require: true,
      unique: true,
    },
    likes: {
      type: Number,
    },
    _author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Comment", schema);
