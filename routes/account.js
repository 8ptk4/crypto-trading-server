const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db/database.js");

async function accountDb(values, res) {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(values.password, salt);

  db.run(
    "INSERT INTO accounts (firstname, lastname, email, password) VALUES (?, ?, ?, ?)",
    values.firstName,
    values.lastName,
    values.email,
    password,
    (err, row) => {
      if (err) {
        return res.status(401).json({ response: "User couldn't be created" });
      }

      return res.status(201).json({ response: "User created successfully" });
    }
  );
}

function checkToken(req, res, next) {
  const token = req.headers["x-access-token"];
  const secret = "hemligakorvmojjar";

  jwt.verify(token, secret, function(err, decoded) {
    if (err) {
      return res.status(401).json({ error: "token doesnt exist" });
    }

    next();
    return undefined;
  });
}

// Route for creating an account
router.post("/signup", function(req, res, next) {
  accountDb(req.body, res);
});

// Route for signing in a user to the platform
router.post("/signin", function(req, res, next) {
  console.log("hjeysan");
  db.get(
    "SELECT password FROM accounts WHERE email = ? ",
    req.body.email,
    (err, row) => {
      if (err) {
        return err;
      } else if (row === undefined) {
        return "error";
      }

      bcrypt.compare(req.body.password, row.password, function(err, encrypted) {
        if (encrypted) {
          const payload = { email: `${req.body.email}` };
          const secret = "hemligakorvmojjar";

          const token = jwt.sign(payload, secret, { expiresIn: "1h" });

          return res
            .status(200)
            .json({ hemlighet: token, username: req.body.email });
        }
        return res.status(500).json({ error: "Bcrypt error" });
      });
    }
  );
});

module.exports = router;
