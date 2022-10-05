const express = require("express")
const router = express.Router()
const db = require("../db/database.js")
const checkToken = require("./checkToken")

router.get("/", checkToken, (req, res) => {
  db.all(
    "SELECT * FROM crypto",
    (err, row) => {
      if (err) {
        return res.status(401).json({ response: "Something went wrong" })
      }

      req.app.get("io").emit("crypto", row)

      return res.status(201).json({
        response: "Success"
      })
    }
  )
})

module.exports = router
