require("dotenv").config();

const { ObjectId } = require("mongodb");

const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

const postRouter = require("express").Router();
const Imagekit = require("imagekit");
const fs = require("fs/promises");
const { default: mongoose } = require("mongoose");
const { response } = require("../App");

const imagekit = new Imagekit({
  publicKey: "public_6DnujADgzOoT69JIc0gb33SS7C4=",
  privateKey: "private_ss2dmZXrdv1OBjRHEEtg6wH09GQ=",
  urlEndpoint: "https://ik.imagekit.io/vo7gdb6tl",
});

const getToken = (request) => {
  const auth = request.headers.authorization;

  if (auth && auth.toLowerCase().startsWith("bearer")) {
    return auth.substring(7);
  }
  return null;
};

postRouter.put("/like/:id", async (request, response) => {
  const token = getToken(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    response.status(401).json({ error: "token missing or invalid" });
  }

  const body = request.body;
  const postId = request.params.id;
  const meId = body.meId;

  const post = await Post.findById(postId);
  const user = await User.findById(meId);

  if (body.mode === "like") {
    post.likes.push(user._id);
    user.likedPosts.push(post._id);

    await post.save();
    await user.save();

    console.log("POST LIKED", post);

    response.status(200).json({ success: true, message: "Post liked", post });
  } else if (body.mode === "unlike") {
    post.likes.pull(meId);
    user.likedPosts.pull(post._id);

    await post.save();
    await user.save();

    console.log("POST DISLIKED", post);

    response.status(200).json({ success: true, message: "Post unliked", post });
  } else {
    response.status(400).json({ success: false, message: "Invalid request" });
  }
});

postRouter.post("/image-file", async (request, response) => {
  const body = request.body;
  const token = getToken(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    response.status(401).json({ error: "token missing or invalid" });
  }

  const user = await User.findById(decodedToken.id);

  let sampleFile = request.files.image;
  let uploadPath = __dirname + "\\uploads\\" + sampleFile.name;

  sampleFile.mv(uploadPath, async function (err) {
    if (err) {
      response.status(500).send(err);
    }

    let fileup = await fs.readFile(uploadPath);

    let promesa = await imagekit.upload({
      file: fileup,
      fileName: sampleFile.name,
      folder: `/zahir/users/${user._id.toString()}/posts`,
    });

    fs.unlink(uploadPath);

    const post = new Post({
      type: body.type,
      title: body.title,
      subtitle: body.subtitle,
      textPost: body.textPost,
      imagePost: promesa.url,
      imgkitID: promesa.fileId,
      date: new Date(),
      user: user._id,
      username: user.username,
      profileImg: user.profileImg,
      mediaWidth: promesa.width,
      mediaHeight: promesa.height,
    });

    const savedPost = await post.save();

    user.posts = user.posts.concat(savedPost._id);
    await user.save();

    response.json(savedPost);
  });
});

postRouter.post("/image-url", async (request, response) => {
  const body = request.body;

  const token = getToken(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    response.status(401).json({ error: "token missing or invalid" });
  }

  const user = await User.findById(decodedToken.id);

  let promesa = await imagekit.upload({
    file: body.imagePost,
    fileName: "randomname",
    folder: `/zahir/users/${user._id.toString()}/posts`,
  });

  const post = new Post({
    type: body.type,
    title: body.title,
    subtitle: body.subtitle,
    textPost: body.textPost,
    imagePost: promesa.url,
    imgkitID: promesa.fileId,
    date: new Date(),
    user: user._id,
    username: user.username,
    profileImg: user.profileImg,
    mediaWidth: promesa.width,
    mediaHeight: promesa.height,
  });

  const savedPost = await post.save();
  user.posts = user.posts.concat(savedPost._id);
  await user.save();

  response.json(savedPost);
});

postRouter.post("/video-file", async (request, response) => {
  const body = request.body;

  const token = getToken(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    response.status(401).json({ error: "token missing or invalid" });
  }

  const user = await User.findById(decodedToken.id);

  let sampleFile = request.files.video;
  let uploadPath = __dirname + "\\uploads\\" + sampleFile.name;

  sampleFile.mv(uploadPath, async function (err) {
    if (err) {
      response.status(500).send(err);
    }

    let fileup = await fs.readFile(uploadPath);

    let promesa = await imagekit.upload({
      file: fileup,
      fileName: sampleFile.name,
      folder: `/zahir/users/${user._id.toString()}/posts`,
    });

    fs.unlink(uploadPath);

    const post = new Post({
      type: body.type,
      title: body.title,
      subtitle: body.subtitle,
      textPost: body.textPost,
      imgkitID: promesa.fileId,
      videoPost: promesa.url,
      videoAr: body.videoAr,
      date: new Date(),
      user: user._id,
      username: user.username,
      profileImg: user.profileImg,
      mediaWidth: promesa.width,
      mediaHeight: promesa.height,
    });

    const savedPost = await post.save();

    user.posts = user.posts.concat(savedPost._id);
    await user.save();

    response.json(savedPost);
  });
});

postRouter.post("/video-url", async (request, response) => {
  const body = request.body;

  const token = getToken(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    response.status(401).json({ error: "token missing or invalid" });
  }

  const user = await User.findById(decodedToken.id);

  function isYoutubeUrl(link) {
    const regExp =
      /^(?:https?:\/\/)?(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w-]{10,12})(?:$|&)/;
    return regExp.test(link);
  }

  const post = new Post({
    type: isYoutubeUrl(body.videoPost) ? "video" : "video-file",
    title: body.title,
    subtitle: body.subtitle,
    textPost: body.textPost,
    imagePost: body.imagePost,
    videoPost: body.videoPost,
    videoAr: body.videoAr,
    date: new Date(),
    user: user._id,
    username: user.username,
    profileImg: user.profileImg,
  });

  const savedPost = await post.save();
  user.posts = user.posts.concat(savedPost._id);
  await user.save();

  response.json(savedPost);
});

postRouter.post("/", async (request, response) => {
  const body = request.body;

  const token = getToken(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    response.status(401).json({ error: "token missing or invalid" });
  }

  const user = await User.findById(decodedToken.id);

  const post = new Post({
    type: body.type,
    title: body.title,
    subtitle: body.subtitle,
    textPost: body.textPost,
    imagePost: body.imagePost,
    videoPost: body.videoPost,
    videoAr: body.videoAr,
    date: new Date(),
    user: user._id,
    username: user.username,
    profileImg: user.profileImg,
  });

  const savedPost = await post.save();
  user.posts = user.posts.concat(savedPost._id);
  await user.save();

  response.json(savedPost);
});

postRouter.get("/my-posts", async (request, response) => {
  const token = getToken(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    response.status(401).json({ error: "token missing or invalid" });
  }

  let posts = await Post.find({ user: decodedToken.id });

  response.json(posts.reverse());
});

postRouter.get("/following-posts", async (request, response) => {
  const token = getToken(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    response.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id);
  const following = user.following;
  const posts = await Post.find({ user: { $in: following } });

  response.json(posts.reverse());
});

postRouter.get("/discover-posts", async (request, response) => {
  const token = getToken(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    response.status(401).json({ error: "token missing or invalid" });
  }

  const user = await User.findById(decodedToken.id);
  const following = user.following;
  const posts = await Post.find({
    user: {
      $nin: [...following, new mongoose.Types.ObjectId(decodedToken.id)],
    },
  });

  response.json(posts.reverse());
});

postRouter.get("/user-posts", async (request, response) => {
  const token = getToken(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    response.status(401).json({ error: "token missing or invalid" });
  }

  const id = request.query.userID;
  const posts = await Post.find({ user: new mongoose.Types.ObjectId(id) });

  response.json(posts.reverse());
});

postRouter.get("/:id", async (request, response) => {
  // No es necesaria verificacion, esta ruta va a ser utilizada para los posts compartidos.
  const id = request.params.id;
  Post.findById(id).then((post) => {
    response.json(post);
  });
});

postRouter.delete("/:id", async (request, response) => {
  const body = request.body;
  const token = getToken(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    response.status(401).json({ error: "token missing or invalid" });
  }

  const id = request.params.id;
  const idObject = new mongoose.Types.ObjectId(id);

  await User.updateMany(
    {},
    { $pull: { posts: idObject, likedPosts: idObject } }
  );
  await Comment.deleteMany({ postID: idObject });

  if (body.imgkitID) {
    await imagekit.deleteFile(body.imgkitID);
  }

  await Post.findByIdAndDelete(id).then((deletedPost) => {
    response.json(deletedPost);
  });
});

module.exports = postRouter;
