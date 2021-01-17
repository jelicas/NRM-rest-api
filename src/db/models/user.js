import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  mail: {
    type: String,
    required: true,
  },

  birth_date: {
    type: Date,
    required: false,
  },


});

export const userModel = mongoose.model("User", UserSchema);
