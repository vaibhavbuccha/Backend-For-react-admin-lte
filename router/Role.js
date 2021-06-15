const express = require("express");
const router = express.Router();
const { create, roles, getRoleById, getRole } = require("../controller/Role");
const verify = require("../util/auth");

router.param("id", getRoleById);

router.post("/create", verify, create);
router.get("/getAll", verify, roles);
router.get("/:id", getRole);

module.exports = router;
