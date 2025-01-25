require("dotenv").config();
const bcrypt = require("bcrypt");
const registerRouter = require("express").Router();
const User = require("../models/User");

registerRouter.post("/", async (req, res) => {
  try {
    const { username, name, lastname, email, password } = req.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      lastname,
      email,
      passwordHash,
    });

    const savedUser = await user.save();

    res.json(savedUser);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Something went wrong. Please try again later." });
  }
});

registerRouter.get("/", async (_req, res) => {
  try {
    const users = await User.find({});
    const usernames = users.map((user) => user.username);
    res.json(usernames);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Something went wrong. Please try again later." });
  }
});

module.exports = registerRouter;
