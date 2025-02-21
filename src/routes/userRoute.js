const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
// const authMiddleware = require("../middlewares/authMiddleware");
// const authMiddleware = require("../middlewares/authMiddleware");

//router para las vistas
// router.get("/", userController.isAuthenticated, (req, res) => {
// res.render("index", { user: req.user });
// });
// router.get("/login", (req, res) => {
//   res.render("login", { alert: false });
// });
// router.get("/register", userController.register);

//router para los métodos del controller
router.post("/register", userController.register);
router.post("/login", userController.login);
// router.get("/logout", userController.logout);

module.exports = router;
