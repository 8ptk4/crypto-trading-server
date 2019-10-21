const express = require("express");
const router = express.Router();
const db = require("../db/database.js");

// Route for creating an account
router.post("/deposit", function (req, res, next) {
  db.run(
    "UPDATE wallets SET balance=balance+? WHERE user = ?",
    req.body.amount,
    req.body.user,
    (err, row) => {
      if (err) {
        return res.status(401).json({ response: "Something went wrong" });
      }

      return res.status(201).json({
        response: `${req.body.amount} successfully added to the account.`
      });
    }
  );
});

// Route for getting the account balance
router.get("/balance:user", function (req, res, next) {
  db.get(
    "SELECT balance FROM wallets WHERE user = ?",
    req.params.user,
    (err, row) => {
      if (err) {
        return res.status(401).json({ response: "Something went wrong" });
      }

      return res.status(201).json({
        response: row
      });
    }
  );
});

module.exports = router;
