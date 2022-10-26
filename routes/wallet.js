const express = require('express');
const router = express.Router();
const db = require('../db/database.js');
const checkToken = require('./checkToken');
const walletModel = require('../models/walletModel');

router.post("/deposit", checkToken, async (req, res) => {
  const getWallet = await walletModel.findOne({
    user: req.body.user
  });

  const updateWallet = await walletModel.findOneAndUpdate({ 
    user: req.body.user
  }, { 
    balance: +getWallet.balance + +req.body.amount 
  });
  
  await updateWallet.save();
    
  return res.status(201).json({
    response: `${req.body.amount} successfully added to the account.`
  });

// ------SQLITE 3------
// db.run(
//   "UPDATE wallets SET balance=balance+? WHERE user = ?",
//   req.body.amount,
//   req.body.user,
//   (err, row) => {
//     if (err) {
//       return res.status(401).json({ response: "Something went wrong" })
//     }

//     return res.status(201).json({
//       response: `${req.body.amount} successfully added to the account.`
//     })
//   }
// )
})

router.get("/balance", checkToken, async (req, res) => {
  try {
    const getWallet = await walletModel.findOne({
      user: req.user.email
    });

    return res.status(201).json({
      response: getWallet
    });
  } catch (err) {
    return res.status(401).json({ response: "Something went wrong" });
  }

// ------SQLITE 3------
// db.get(
//   "SELECT balance FROM wallets WHERE user=?",
//   req.user.email,
//   (err, row) => {
//     if (err) {
//       return res.status(401).json({ response: "Something went wrong" })
//     }
//     console.log(row)
//     return res.status(201).json({
//       response: row
//     })
//   }
// )
})

module.exports = router;
