import mongoose, { Schema } from "mongoose";

const schema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    text: {
      type: String,
      require: true,
    },
    desc: {
      type: String,
      require: true,
    },
    img: {
      type: String,
      default: "https://source.unsplash.com/1600x900/?blog",
    },
    _author: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    meta: {
      views: {
        type: Number,
        default: 0,
      },
      comments: {
        type: Number,
        default: 0,
      },
      likes: {
        type: Number,
        default: 0,
      },
    },
    comments: [
      {
        _comment: {
          type: Schema.Types.ObjectId,
          ref: "Comment",
        },
      },
    ],
    categories: [
      {
        _categorie: {
          type: Schema.Types.ObjectId,
          ref: "Categorie",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Post", schema);
