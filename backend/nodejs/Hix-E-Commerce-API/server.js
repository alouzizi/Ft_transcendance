const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();
dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 8000;

// Connect with db
mongoose
  .connect(process.env.DB_URL)
  .then((conn) => {
    console.log(`Database Connected: ${conn.connection.host}`);
  })
  .catch((error) => {
    console.error(`Database Error: ${error}`);
    process.exit(1);
  });

// Middlewares
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// Routes

app.post("/", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;

  console.log(name);
  const newCategory = new CategoryModel({
    name: name,
    age: 15,
  });
  newCategory
    .save()
    .then((doc) => {
      res.json(doc);
    })
    .catch((error) => {
      res.json(error);
    });
});

app.get("/", (req, res) => {
  res.send("our Api V1");
});

app.listen(PORT, () => {
  console.log("App running ont port " + PORT);
});
