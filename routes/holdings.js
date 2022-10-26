const express = require('express');
const router = express.Router();
const checkToken = require('./checkToken');
const holdingModel = require('../models/holdingModel');
const walletModel = require('../models/walletModel');
// const db = require('../db/database.js');

router.get("/show", checkToken, async (req, res) => {
  try {
    const row = await holdingModel.find({
      account: req.user.email
    });

    return res.status(201).json({ row });
  } catch (err) {
    return res.status(401).json({ response: "Something went wrong" });
  }

// ------SQLITE 3------
// db.all("SELECT amount, crypto FROM holdings WHERE account=?",
//   req.user.email,
//   (err, row) => {
//     if (err) {
//       return res.status(401).json({ response: "Something went wrong" })
//     }

//     return res.status(201).json({ row })
//   }
// )
})

router.post("/transaction", checkToken, async (req, res) => {
  const action = req.body.action === 'sold' ? "-" : "+";
  const convertedAction = req.body.action === 'sold' ? "+" : "-";
  const transactionPrice = (req.body.amount * req.body.price);
  const { amount, account, crypto } = req.body;

  await holdingModel.findOneAndUpdate({
    account: account,
    crypto: crypto
  }, 
  { $inc: { amount: `${action}` + amount }});

  await walletModel.findOneAndUpdate({
    user: account
  }, { $inc: { balance: `${convertedAction}` + transactionPrice}});
  
  return res.status(201).json({
    response: "Success"
  });
})

module.exports = router;
