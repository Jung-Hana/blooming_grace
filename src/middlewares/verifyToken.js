const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRETKEY = process.env.JWT_TOKEN_SECRET;

/**
 * @class VerifyRefreshToken
 * @todo verify user's refreshToken
 */
const verifyRefreshToken = (req, res, next) => {
  if (req.cookies.token) {
    const token = req.cookies.refreshToken;

    try {
      req.decoded = jwt.verify(token, SECRETKEY);
      next();
    } catch (err) {
      // refreshToken's expired
      if (err.name === "TokenExpiredError") {
        res.status(401).json({
          message: "refreshToken expire",
        });
      }
      //Not valid token
      if (err.name === "JsonWebTokenError") {
        res.status(401).json({
          message: "Not valid token",
        });
      }
    }
  } else {
    return res.status(401).json({ message: "Please first login" });
  }
};

/**
 * @class VerifyAccessToken
 * @todo verify user's accessToken
 */
const verifyAccessToken = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization?.split(" ")[1];

    try {
      req.decoded = jwt.verify(token, SECRETKEY);
      next();
    } catch (err) {
      // accessToken's expired
      if (err.name === "TokenExpiredError") {
        res.status(401).json({
          message: "accessToken 만료",
        });
      }
      //Not valid token
      if (err.name === "JsonWebTokenError") {
        res.status(401).json({
          message: "Not valid token",
        });
      }
    }
  } else {
    res.status(401).json({ message: "Please first login" });
    return;
  }
};

module.exports = { verifyAccessToken, verifyRefreshToken };
