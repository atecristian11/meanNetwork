const Post = require("../models/post");
const mongoose = require("mongoose");

const savePost = async (req, res) => {
  if (!req.body.text || !req.body.status)
    return res.status(400).send("Incomplete data");

  let post = new Post({     
    userId: req.user._id,
    text: req.body.text,
    status: req.body.status,
  });

  let result = await post.save();   
  if (!result) return res.status(400).send("Error registering Post");
  return res.status(200).send({ result });
};

const listPost = async (req, res) => {
  let post = await Post.find({ userId: req.user._id });     
  if (!post || post.length === 0)
    return res.status(400).send("You have no assigned Post");
  return res.status(200).send({ post });
};

const updatePost = async (req, res) => {
  let validId = mongoose.Types.ObjectId.isValid(req.body._id);   
  if (!validId) return res.status(400).send("Invalid id");

  if (!req.body._id || !req.body.status || !req.body.text)
    return res.status(400).send("Incomplete data");

  let post = await Post.findByIdAndUpdate(req.body._id, {
    userId: req.user._id,
    text: req.body.text,
    status: req.body.status,
  });

  if (!post) return res.status(400).send("Post not found");
  return res.status(200).send({ post });
};

const deletePost = async (req, res) => {
  let validId = mongoose.Types.ObjectId.isValid(req.params._id);   
  if (!validId) return res.status(400).send("Invalid id");

  let post = await Post.findByIdAndDelete(req.params._id);   
  if (!post) return res.status(400).send("Post not found");
  return res.status(200).send({message: "Post deleted"}); //con el {message: } convertimos ese string a json para que asi se pueda comunicar satisfactoriamente con el frontend
};

module.exports = { savePost, listPost, updatePost, deletePost };
