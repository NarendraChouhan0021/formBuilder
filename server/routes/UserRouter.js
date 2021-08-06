let router = require("express").Router();
const UserService = require("../services/UserService");

router.get("/login", UserService.loginGet);
router.post("/login", UserService.login);

module.exports = router;
