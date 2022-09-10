const express = require("express");
const mongoose = require(`mongoose`);
const article = require(`./models/article`);
const articleRouter = require("./routes/articles");
const methodOverride = require(`method-override`);
const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(
  "mongodb+srv://nikhil_20:Ajhar20032001@cluster0.sxabv.mongodb.net/?retryWrites=true&w=majority"
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
