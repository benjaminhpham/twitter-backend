import express from "express";
import userRoutes from "./routes/userRoutes";
import tweetRoutes from "./routes/tweetRoutes";

const app = express();
// parse all data to json
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRoutes);
app.use("/tweets", tweetRoutes);

// app.METHOD(PATH, HANDLER)

// User CRUD

app.listen(8000, () => {
  console.log(`Server is running on port 8000`);
});
