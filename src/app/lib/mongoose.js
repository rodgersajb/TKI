import mongoose from "mongoose";

export default async function connect() {
  if (mongoose.connections[0].readyState) console.log("Already connected");

  return mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
