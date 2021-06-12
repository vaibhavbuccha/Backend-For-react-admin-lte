const express = require("express");
const router = express.Router();
const { create, departments } = require("../controller/Department");
const verify = require("../util/auth");

router.post("/create", verify, create);
router.get("/getAll", verify, departments);

module.exports = router;
