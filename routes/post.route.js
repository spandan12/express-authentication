const express = require("express");
const Post = require("../models/Post");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");
const postValidator = require("../validators/post.validator");
const validate = require("../utils/validate");

router.get("/", authenticate, async (req, res) => {
  try {
    const posts = await Post.find();
    res.send(posts);
  } catch (err) {
    res.send(err);
  }
});

router.post("/", validate(postValidator), async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });
  await post.save();
  res.send(post);
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "post doesn't exist!" });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });

    if (req.body.title) {
      post.title = req.body.title;
    }

    if (req.body.description) {
      post.description = req.body.description;
    }

    await post.save();
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "post doesn't exist!" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "post doesn't exist!" });
  }
});

module.exports = router;
