import mongoose from "mongoose";

export const database = {
  initialize() {
    mongoose.connect(
      `MONGO_URL`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      }
    );

    const db = mongoose.connection;

    db.once("open", (_) => {
      console.log("Database connected:");
    });

    db.on("error", (err) => {
      console.error("connection error:");
    });
  },
};
