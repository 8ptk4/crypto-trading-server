const express = require("express");
const router = express.Router();
const db = require("../db/database.js");

// Route for creating an account
router.get("/", function (req, res, next) {
  db.all(
    "SELECT * FROM crypto",
    (err, row) => {
      if (err) {
        return res.status(401).json({ response: "Something went wrong" });
      }
      console.log(row)
      return res.status(201).json({
        response: row
      });

    }
  );
});

module.exports = router;
