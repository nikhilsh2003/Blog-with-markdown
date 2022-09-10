const express = require("express");
const mongoose = require(`mongoose`);
const article = require(`./models/article`);
const articleRouter = require("./routes/articles");
const methodOverride = require(`method-override`);
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(
  `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.sxabv.mongodb.net/?retryWrites=true&w=majority`
);

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  const articles = await article.find().sort({ createdAt: "desc" });

  res.render("articles/index", { articles: articles });
});

app.listen(port, () => {
  console.log(`App is listening at port ${port}`);
});

app.use("/articles", articleRouter);
