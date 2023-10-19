const express = require("express");

const mongoose = require("mongoose");
const app = express();

const Article = require("./models/Article");

mongoose
  .connect(
    "mongodb+srv://hixcoder:12341234@hixdb.clv4wrq.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connect with db success");
  })
  .catch((error) => {
    console.log("error" + error);
  });

// for accept body parameters
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello in my first nodejs project");
});

// this is get request
app.get("/hello", (req, res) => {
  // for send text
  // res.send("project path: " + __dirname + "views/hello.html");

  // for send files
  // res.sendFile(__dirname + "/views/hello.html");

  // for send ejs
  res.render("hello.ejs", {
    name: "hixcoder",
  });
});

// this is post request
app.post("/addcommment", (req, res) => {
  res.send("hello post request");
});

// here we use path params
app.get("/findSum/:n1/:n2", (req, res) => {
  console.log(req.params);
  let n1 = parseInt(req.params.n1);
  let n2 = parseInt(req.params.n2);
  res.send(`the sum of : ${n1} + ${n2} = ${n1 + n2}`);
});

// here we use body params
app.get("/sayHello/", (req, res) => {
  console.log(req.body);
  // here we use json response to help the client parse data
  res.json({
    name: "robot",
    talk: `hello ${req.body.name}`,
  });
});

// here we use query params
app.get("/sayHi/", (req, res) => {
  console.log(req.query);
  res.send(`hi to ${req.query.name} ${req.query.nickname}`);
});

// here we use mongodb
app.post("/articles", async (req, res) => {
  const newArticle = new Article();
  newArticle.title = req.body.title;
  newArticle.body = req.body.body;
  newArticle.numberOfLikes = req.body.numberOfLikes;
  await newArticle.save();
  res.send("the new article has been stored");
});

// get all articles
app.get("/articles", async (req, res) => {
  try {
    const articles = await Article.find();
    console.log(articles);
    res.json(articles);
  } catch (error) {
    res.send("error: " + error);
  }
});

// get specific article
app.get("/articles/:articleId", async (req, res) => {
  const id = req.params.articleId;
  console.log("===> " + id);
  try {
    const article = await Article.findById(id);
    res.json(article);
  } catch (error) {
    res.send("error: " + error);
  }
});

// delete spesific article
app.delete("/articles/:articleId", async (req, res) => {
  const id = req.params.articleId;
  console.log("===> " + id);
  try {
    const articles = await Article.findByIdAndDelete(id);
    res.json(articles);
  } catch (error) {
    res.send("error: " + error);
  }
});

// show articles
app.get("/showArticles", async (req, res) => {
  const articles = await Article.find();

  res.render("articles.ejs", {
    allArticles: articles,
  });
});
app.listen(3000, () => {
  console.log("i am listening in port 3000");
});
