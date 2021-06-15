const express = require("express");
const router = express.Router();
const {
  create,
  departments,
  getDepartmentById,
  getDepartment,
} = require("../controller/Department");
const verify = require("../util/auth");

router.param("id", getDepartmentById);

router.post("/create", verify, create);
router.get("/getAll", verify, departments);
router.get("/:id", getDepartment);

module.exports = router;
