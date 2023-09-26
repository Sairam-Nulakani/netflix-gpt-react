const router = require("express").Router();
const usersController = require("../controllers/usersController");
router.post("/register", usersController.registerUser);
router.post("/login", usersController.loginUser);
module.exports = router;
