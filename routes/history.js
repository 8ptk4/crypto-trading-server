const express = require("express")
const router = express.Router()
const db = require("../db/database.js")



router.post("/add", function (req, res, next) {
  db.run(
    `INSERT INTO history (buyer, price, currency, action, amount) VALUES (?, ?, ?, ?, ?)`,
    req.body.buyer,
    req.body.price,
    req.body.crypto,
    req.body.action,
    req.body.amount,
    (err, row) => {
      if (err) {
        return res.status(401).json({ response: "Something went wrong" })
      }

      return res.status(201).json({
        response: "Success"
      })
    }
  )
})



router.get("/get", function (req, res, next) {
  db.all(
    "SELECT amount, date, firstname, lastname, currency, action FROM history INNER JOIN accounts ON history.buyer=accounts.email ORDER BY date DESC LIMIT 10",
    (err, row) => {
      if (err) {
        return res.status(401).json({ response: "Something went wrong" })
      }
      console.log("123123123", row[0]);
      req.app.get("io").emit("history", row[0])

      return res.status(200).json({
        response: "Success"
      })
    }
  )
})



router.get("/test", function (req, res, next) {
  db.all(
    "SELECT amount, date, firstname, lastname, currency, action FROM history ORDER BY date DESC LIMIT 10",
    (err, row) => {
      if (err) {
        return res.status(401).json({ response: "Something went wrong" })
      }
      req.app.get("io").emit("history", row[0])

      return res.status(200).json({
        response: "Success"
      })
    }
  )
})



module.exports = router
