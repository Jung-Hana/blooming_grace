const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
// const SECRETKEY = process.env.JWT_TOKEN_SECRET;
const SECRETKEY = "jwtSecret";

/**
 * AccessToken Generate
 *
 * @param {JSON} payload
 * @return {Text} token
 */
const generateAccessToken = async (payload) => {
  try {
    const token = jwt.sign(payload, SECRETKEY, {
      algorithm: "HS256",
      expiresIn: "1d",
    });
    console.log(token);
    return token;
  } catch (err) {
    console.log(err);
    return -1;
  }
};

/**
 * RefreshToken Generate
 *
 * @param {JSON} payload
 * @return {Text} token
 */
const generateRefreshToken = async (payload) => {
  try {
    const token = jwt.sign(payload, SECRETKEY, {
      algorithm: "HS256",
      expiresIn: "1m",
    });
    console.log(token);
    return token;
  } catch (err) {
    console.log(err);
    return -1;
  }
};

/**
 * AccessToken Expired // Verify Refresh Token // Renew AccessToken
 *
 * @param {Text} token
 * @return {Text} newToken
 */
const recreateAccessToken = (token) => {
  try {
    const refreshDecoded = jwt.verify(token, SECRETKEY);

    const payload = {
      userId: refreshDecoded.userId,
    };
    const newToken = generateAccessToken(payload);
    return newToken;
  } catch (e) {
    console.error("Error refreshing token:", e);
    return null;
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  recreateAccessToken,
};
