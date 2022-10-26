const express = require('express');
const router = express.Router();
const checkToken = require('./checkToken');
const historyModel = require('../models/historyModel');
const cryptoModel = require('../models/cryptoModel');
const accountModel = require('../models/accountModel');
const chartModel = require('../models/chartModel');
// const db = require('../db/database.js');

router.post("/add", checkToken, async (req, res) => {
  const { buyer, price, crypto, action, amount } = req.body;
  const { firstName, lastName } = await accountModel.findOne({ email: buyer });

  try {
    await historyModel.insertMany({
      buyer: buyer,
      firstname: firstName,
      lastname: lastName,
      price: price,
      currency: crypto,
      action: action,
      amount: amount
    });

    await cryptoModel.findOneAndUpdate({
        currency: crypto
      }, {
        value: Math.floor((Math.abs(Math.floor(Math.random() * 40000) % (40000 - 1000) + 1000)))
    });

    const bitCoin = await cryptoModel.find({
      currency: 'BitCoin'
    });

    const bitConnect = await cryptoModel.find({
      currency: 'BitConnect'
    });

    await chartModel.insertMany({
      btc: bitCoin[0].value,
      bc: bitConnect[0].value
    });

  } catch (err) {
    console.log(err);
  } finally {
    return res.status(201).json({
      response: "Success"
    });
  }

// ------SQLITE 3------
// db.run(
//   `INSERT INTO history (buyer, price, currency, action, amount) VALUES (?, ?, ?, ?, ?)`,
//   req.body.buyer,
//   req.body.price,
//   req.body.crypto,
//   req.body.action,
//   req.body.amount,
//   (err, row) => {
//     if (err) {
//       return res.status(401).json({ response: "Something went wrong" })
//     }

//     return res.status(201).json({
//       response: "Success"
//     })
//   }
// )
})

router.get("/get", checkToken, async (req, res) => {
  await historyModel.find({}).sort({date: 'desc'}).limit(10).then((res) => {
    req.app.get("io").emit("history", res[0]);
  })
  
  return res.status(201).json({
    response: "Success"
  });
  
// ------SQLITE 3------
//   db.all(
//     "SELECT amount, date, firstname, lastname, currency, action FROM history INNER JOIN accounts ON history.buyer=accounts.email ORDER BY date DESC LIMIT 10",
//     (err, row) => {
//       if (err) {
//         return res.status(401).json({ response: "Something went wrong" })
//       }

//       req.app.get("io").emit("history", row[0])

//       return res.status(200).json({
//         response: "Success"
//       })
//     }
//   )
// })
})

module.exports = router;
