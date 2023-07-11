import express from "express";
import userRoutes from "./routes/userRoutes";
import tweetRoutes from "./routes/tweetRoutes";

const app = express();
// parse all data to json
app.use(express.json());
app.use("/users", userRoutes);
app.use("/tweets", tweetRoutes);

// app.METHOD(PATH, HANDLER)

// User CRUD

app.listen(8000, () => {
  console.log(`Server is running on port 8000`);
});
