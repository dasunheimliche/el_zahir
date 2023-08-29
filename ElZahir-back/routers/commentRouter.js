require("dotenv").config();
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const getToken = (request) => {
  const auth = request.headers.authorization;

  if (auth && auth.toLowerCase().startsWith("bearer")) {
    return auth.substring(7);
  }
  return null;
};

const commentRouter = require("express").Router();

commentRouter.get("/", async (request, response) => {
  const postId = request.query.postId;
  const commentId = request.query.commentId;

  try {
    let comments;
    if (postId) {
      comments = await Comment.find({
        postID: new mongoose.Types.ObjectId(postId),
      });
    } else if (commentId) {
      comments = await Comment.find({
        commentID: new mongoose.Types.ObjectId(commentId),
      });
    }

    response.json(comments);
  } catch (error) {
    response.status(400).send("Missing query parameter.");
  }
});

commentRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;
  const postUserId = request.query.postUserId;
  const commentUserId = request.query.commentUserId;

  const token = getToken(request);

  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!token || !decodedToken.id) {
    response.status(401).json({ error: "token missing or invalid" });
  }

  const meId = decodedToken.id;

  if (!id || !postUserId || !commentUserId) {
    response.status(400).send("Missing query parameter.");
  }

  if (meId !== postUserId && meId !== commentUserId) {
    response.status(400).send("user is not allowed to delete this comment");
  }

  const deletedComment = await Comment.findByIdAndDelete(id);
  await Comment.deleteMany({ commentID: new mongoose.Types.ObjectId(id) });

  if (!deletedComment) {
    response.status(404).json({ error: "Comment not found" });
  }

  response.json(deletedComment);
});

commentRouter.post("/", async (req, res) => {
  const { username, comment, postID, commentID, userID } = req.body;

  if (!username || !comment || !postID) {
    res.status(400).json({ error: "Missing required fields" });
  }

  const post = await Post.findById(postID);
  if (!post) {
    res.status(404).json({ error: "Post not found" });
  }

  const commentToPost = new Comment({
    username,
    comment,
    date: new Date(),
    postID: commentID ? null : post._id,
    commentID: commentID || null,
    userID: userID,
  });

  await commentToPost.save();
  res.json(commentToPost);
});

module.exports = commentRouter;
