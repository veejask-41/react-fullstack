const express = require("express");
const router = express.Router();
const { Posts, Likes } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", validateToken, async (req, res) => {
  const allPosts = await Posts.findAll({ include: [Likes] });
  const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } });
  res.json({ allPosts: allPosts, likedPosts: likedPosts });
});

router.get("/byId/:id", async (req, res) => {
  const postById = await Posts.findByPk(req.params.id);
  res.json(postById);
});

router.get("/byUserId/:id", async (req, res) => {
  const listOfPosts = await Posts.findAll({
    where: { UserId: req.params.id },
    include: [Likes],
  });
  res.json(listOfPosts);
});

router.post("/", validateToken, async (req, res) => {
  const post = req.body;
  post.username = req.user.username;
  post.UserId = req.user.id;
  await Posts.create(post);
  res.json(post);
});

router.put("/title", validateToken, async (req, res) => {
  const { newTitle, id } = req.body;
  await Posts.update({ title: newTitle }, { where: { id: id } });
  res.json("title updated");
});

router.put("/postText", validateToken, async (req, res) => {
  const { newPostText, id } = req.body;
  await Posts.update({ postText: newPostText }, { where: { id: id } });
  res.json("post text updated");
});

router.delete("/:postId", validateToken, async (req, res) => {
  const postId = req.params.postId;
  await Posts.destroy({
    where: {
      id: postId,
    },
  });
  res.json("deleted successfully");
});

module.exports = router;
