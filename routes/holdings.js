const express = require("express");
const router = express.Router();
const db = require("../db/database.js");
const checkToken = require("./checkToken");

router.get("/show",
  (req, res, next) => checkToken(req, res, next),
  (req, res) => {
    db.all("SELECT amount, crypto FROM holdings WHERE account=?",
      req.user.email,
      (err, row) => {
        if (err) {
          return res.status(401).json({ response: "Something went wrong" });
        }

        return res.status(201).json({ row });

      }
    );
  });

router.post("/transaction", function (req, res, next) {
  const action = req.body.action === 'sold' ? "-" : "+";
  const convertedAction = req.body.action === 'sold' ? "+" : "-";
  const transactionPrice = (req.body.amount * req.body.price);
  db.run(
    `UPDATE holdings SET amount=amount${action}? WHERE account = ? AND crypto = ?`,
    req.body.amount,
    req.body.account,
    req.body.crypto,
    (err, row) => {
      if (err) {
        return res.status(401).json({ response: "Something went wrong" });
      }

      db.run(
        `UPDATE wallets SET balance=balance${convertedAction}? WHERE user = ?`,
        transactionPrice,
        req.body.account,
        (err, row) => {
          if (err) {
            return res.status(401).json({ response: "Something went wrong" });
          }

          return res.status(201).json({
            response: "Success"
          });
        }
      );
    }
  );
});




module.exports = router;
