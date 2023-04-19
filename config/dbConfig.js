import mongoose from "mongoose";

const connectDB = async () => {
  const db = await mongoose.connect(process.env.MONGODB_URI);
  console.log("connected to dataBase");
};

export default connectDB;
