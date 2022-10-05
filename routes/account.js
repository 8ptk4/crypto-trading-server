const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const db = require("../db/database.js")

async function accountDb(values, res) {
  const salt = await bcrypt.genSalt(10)
  const password = await bcrypt.hash(values.password, salt)

  db.run(
    "INSERT INTO accounts (firstname, lastname, email, password) VALUES (?, ?, ?, ?)",
    values.firstName,
    values.lastName,
    values.email,
    password,
    (err, row) => {
      if (err) {
        return res.status(401).json({ response: "User couldn't be created" })
      }

      return res.status(201).json({ response: "User created successfully" })
    }
  )
}

router.post("/signup", (req, res) => {
  accountDb(req.body, res)
})

router.post("/signin", (req, res) => {
  db.get(
    "SELECT password FROM accounts WHERE email = ? ",
    req.body.email,
    (err, row) => {
      if (err) {
        return err
      } else if (row === undefined) {
        return "error"
      }

      bcrypt.compare(req.body.password, row.password, (err, encrypted) => {
        if (encrypted) {
          const accessToken = jwt.sign({
            email: req.body.email,
          }, process.env.JWT_ACCESS_SECRET, { expiresIn: '2m' });

          const refreshToken = jwt.sign({
            username: req.body.email,
          }, process.env.JWT_REFRESH_SECRET, { expiresIn: '2m' });

          return res
            .status(200)
            .json({ 
              accessToken: accessToken, 
              refreshToken: refreshToken, 
              username: req.body.email 
            })
        }
        return res.status(500).json({ error: "Bcrypt error" })
      })
    }
  )
})

module.exports = router
