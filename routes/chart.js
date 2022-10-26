const express = require('express');
const router = express.Router();
const checkToken = require('./checkToken');
const chartModel = require('../models/chartModel');
// const db = require('../db/database.js');

router.get("/", async (req, res) => {
    const chart = await chartModel.find({});

    return res.status(201).json({
        response: chart
    });

// ------SQLITE 3------
// db.all(
//     "SELECT * FROM chart",
//     (err, row) => {
//         console.log("GAMMLA", row)
//         if (err) {
//             return res.status(401).json({ response: "Something went wrong" })
//         }

//         return res.status(201).json({
//             response: row
//         })
//     }
// )
})

module.exports = router;
