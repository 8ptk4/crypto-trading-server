const express = require("express")
const router = express.Router()
const db = require("../db/database.js")



router.get("/", function (req, res, next) {
  db.all(
    "SELECT * FROM crypto",
    (err, row) => {
      if (err) {
        return res.status(401).json({ response: "Something went wrong" })
      }

      console.log("CRYPTO: ", row)

      req.app.get("io").emit("crypto", row)


      return res.status(201).json({
        response: "Success"
      })
    }
  )
})



// router.get("/show",
//   (req, res, next) => checkToken(req, res, next),
//   (req, res) => {
//     db.all("SELECT amount, crypto FROM holdings WHERE account=?",
//       req.user.email,
//       (err, row) => {
//         if (err) {
//           return res.status(401).json({ response: "Something went wrong" })
//         }

//         return res.status(201).json({ row })

//       }
//     )
//   })




module.exports = router
