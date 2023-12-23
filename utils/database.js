import mongoose from "mongoose";

let isConnected = false;

export default connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopologt: true,
    });
    isConnected = true;
    console.log("MongoDB Connected");
  } catch (error) {}
};
