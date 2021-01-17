import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  user_id: {
    type: String,
    required: true,
  },

  comments: [{content: String, user_id: String}]

});

export const postModel = mongoose.model(
  "Post",
  PostSchema
);
