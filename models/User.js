import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // username: {
    //   type: String,
    //   required: true,
    // },
    // password: {
    //   type: String,
    //   required: true,
    // },
    fbId: {
      type: String,
    },
    prfileDetails: {
      type: Object,
    },
    // email: {
    //   type: String,
    //   required: true,
    // },
    access_token: {
      type: String,
    },
    refresh_token: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("user", userSchema);
