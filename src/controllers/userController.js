const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserService = require("../services/userService");
const generateToken = require("../utils/generateToken");
const tokenMiddleware = require("../middlewares/verifyToken");

// const {
//   verifyAccessToken,
//   verifyRefreshToken,
// } = require("../utils/generateToken");

/**
 * @class register
 * @todo User register
 */
exports.register = async (req, res) => {
  try {
    //user_id, password, passwordConfirm blink check
    if (req.body.user_id && req.body.password && req.body.pwConfirm) {
      const user_id = req.body.user_id;
      const password = req.body.password;
      const pwConfirm = req.body.pwConfirm;

      //password and passwordConfirm match check
      if (password !== pwConfirm) {
        return res.status(401).json({
          message: "Do not match password and passwordConfirm",
        });
      }

      //Check user from DB
      const checkUser = await UserService.User.selectUserId(user_id);

      if (checkUser == 1)
        return res.status(409).json({
          message: "User_id is already in use!",
        });

      //password hash process
      let passHash = await bcrypt.hash(password, 8);
      //user insert into DB
      const createUser = await UserService.User.insertUser(user_id, passHash);

      if (createUser != -1) {
        return res.status(201).json({
          message: "success register",
        });
      } else {
        return res.status(400).json({ message: "Fail to create user" });
      }
    } else {
      return res.status(404).json({ message: "Do not found User" });
    }
  } catch (err) {
    //server error
    return res.status(500).json({ message: "Internal Server Error occured" });
  }
};

/**
 * @class login
 * @todo User login
 */
exports.login = async (req, res) => {
  try {
    const user_id = req.body.user_id;
    const password = req.body.password;

    //user_id and password blink check
    if (!user_id || !password) {
      return res.status(400).json({
        message: "user_id or Password required.",
      });
    }

    //get user's password from Database
    const hashPassword = await UserService.User.selectPassword(user_id);
    //compare user's password and hash password
    const passwordIsValid = await bcrypt.compareSync(password, hashPassword);

    if (passwordIsValid) {
      const payload = {
        user_id: user_id,
      };
      console.log("payload", payload);
      //generate access token & refreshtoken
      const accessToken = await generateToken.generateAccessToken(payload);
      const refreshToken = await generateToken.generateRefreshToken(payload);
      console.log(accessToken);
      console.log(refreshToken);

      //refresh token send to client's cookie
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 14,
      });

      //Access token save in Database
      const updateToken = await UserService.User.updateToken(
        user_id,
        refreshToken
      );

      //Update DB
      if (updateToken != -1) {
        return res.status(200).json({
          message: "Login success",
          accessToken: accessToken,
        });
      } else {
        return res.status(400).json({
          message: "Update DB Fail",
        });
      }
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error occured" });
  }
};
