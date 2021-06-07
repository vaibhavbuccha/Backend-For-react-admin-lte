const { Router } = require("express");
const express = require("express");
const { register, login } = require("../controller/Admin");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;
