const express = require("express");
const router = express.Router();
const db = require("../db/database.js");

// Route for creating an account
router.get("/show", function (req, res, next) {
  db.all(
    "SELECT amount, crypto FROM holdings WHERE account = ?",
    'putte.karlsson@gmail.com',
    (err, row) => {
      if (err) {
        return res.status(401).json({ response: "Something went wrong" });
      }

      return res.status(201).json({ row });

    }
  );
});

router.get("/add", function (req, res, next) {
  console.log(req);
});

router.get("/remove", function (req, res, next) {
  console.log(req);
});

module.exports = router;
