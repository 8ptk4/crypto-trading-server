const express = require("express")
const router = express.Router()
const db = require("../db/database.js")
const checkToken = require("./checkToken")

router.get("/", checkToken, (req, res) => {
  db.all(
    "SELECT * FROM chart",
    (err, row) => {
      if (err) {
        return res.status(401).json({ response: "Something went wrong" })
      }

      return res.status(201).json({
        response: row
      })
    }
  )
})



module.exports = router;
