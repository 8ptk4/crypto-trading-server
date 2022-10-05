const express = require("express")
const router = express.Router()
const db = require("../db/database.js")
const checkToken = require("./checkToken")

router.post("/deposit", checkToken, (req, res) => {
  db.run(
    "UPDATE wallets SET balance=balance+? WHERE user = ?",
    req.body.amount,
    req.body.user,
    (err, row) => {
      if (err) {
        return res.status(401).json({ response: "Something went wrong" })
      }

      return res.status(201).json({
        response: `${req.body.amount} successfully added to the account.`
      })
    }
  )
})

router.get("/balance", checkToken, (req, res) => {
  db.get(
    "SELECT balance FROM wallets WHERE user=?",
    req.user.email,
    (err, row) => {
      if (err) {
        return res.status(401).json({ response: "Something went wrong" })
      }
      console.log(row)
      return res.status(201).json({
        response: row
      })
    }
  )
})

module.exports = router
