//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const homeStartingContent =
  "Welcome! Welcome to my space, your one stop for all tech and JavaScript news! This is where to be. ";
const aboutContent =
  "I am Tolulope David, code craftman, I am passionate about providing high-impact solutions. This project was build with Bootstarp, JavaScript, NodeJs and MongoDB";
const contactContent =
  "Find me on linkedIn Tolulope David Adetokunbo and on twitter @toluwa_david";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect(
  "mongodb+srv://adminEvent:adminEvent@cluster0.56n9z.mongodb.net/?retryWrites=true&w=majority",
  // mongodb+srv://<username>:<password>@cluster0.56n9z.mongodb.net/?retryWrites=true&w=majority
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const postSchema = {
  title: String,
  content: String,
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function (req, res) {
  Post.find({}, function (err, posts) {
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts,
    });
  });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody,
  });

  post.save(function (err) {
    if (!err) {
      res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function (req, res) {
  const requestedPostId = req.params.postId;

  Post.findOne({ _id: requestedPostId }, function (err, post) {
    res.render("post", {
      title: post.title,
      content: post.content,
    });
  });
});

app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});

let port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

