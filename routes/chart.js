const express = require("express");
const router = express.Router();
const db = require("../db/database.js");

// Route for creating an account
router.get("/", function (req, res, next) {
  console.log("hmmm");
});

module.exports = router;
