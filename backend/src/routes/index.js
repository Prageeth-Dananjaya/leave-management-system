const express = require("express");
const router = express.Router();
const auth = require("./auth");
const leaves = require("./leaves");

router.use("/auth", auth);
router.use("/leaves", leaves);

module.exports = router;
