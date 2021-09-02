const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./db/db");
const User = require("./routes/user");
const Post = require("./routes/post");
require("dotenv").config();

const locr = express();

locr.use(express.json());
locr.use(cors());
locr.use("/api/user", User);
locr.use("/api/post", Post);

locr.listen(process.env.PORT, () =>
  console.log("Backend server running on port: " + process.env.PORT)
);

dbConnection();
