import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: function () {
      return !this.phone;
    },
  },
  password: {
    type: String,
    required: false,
  },
  name: {
    first: { type: String, required: true },
    last: { type: String, required: true },
  },
  fullName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: function () {
      return !this.email;
    },
  },
});
