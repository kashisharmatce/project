// console.log("Hello Everyone");
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./Routes/route");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", routes);
// DB Connection
mongoose
  .connect(
    "mongodb+srv://Sumit001:Sumit001@cluster0.8e9be5o.mongodb.net/Course-App"
  )
  .then(() => {
    console.log("Database is Connected Successfully 😎");
  })
  .catch((err) => {
    console.log(err, "Something Went Wrong");
  });

// Test API
app.get("/test", (req, res) => {
  res.send("Hello , This is Test Api 😎");
});

app.listen(5000, () => {
  console.log("Server Is Running On Port 5000");
});
