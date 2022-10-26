const express = require('express');
const router = express.Router();
const checkToken = require('./checkToken');
const cryptoModel = require('../models/cryptoModel');
// const db = require('../db/database.js');

router.get("/", checkToken, async (req, res) => {
    await cryptoModel.find({}).then((row) => {
        req.app.get("io").emit("crypto", row);

        return res.status(201).json({
            response: "Success"
        });
    })
    
// ------SQLITE 3------
// db.all("SELECT * FROM crypto", (err, row) => {
//     if (err) {
//         return res.status(401).json({ response: "Something went wrong" });
//     }
//     console.log("CHART CHART", row)

//     req.app.get("io").emit('crypto', row);

//     return res.status(201).json({
//         response: "Success"
//     });
// })
})

module.exports = router;
