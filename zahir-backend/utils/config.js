require("dotenv").config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const SECRET = process.env.SECRET;

const IMGKIT_PUBLIC_KEY = process.env.IMGKIT_PUBLIC_KEY;
const IMGKIT_PRIVATE_KEY = process.env.IMGKIT_PRIVATE_KEY;
const IMGKIT_URL_ENDPOINT = process.env.IMGKIT_URL_ENDPOINT;

module.exports = {
  PORT,
  MONGODB_URI,
  SECRET,
  IMGKIT_PUBLIC_KEY,
  IMGKIT_PRIVATE_KEY,
  IMGKIT_URL_ENDPOINT,
};
