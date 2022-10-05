const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")

let refreshTokens = [];

router.post("/", (req, res) => {
    if (refreshTokens.length === 0) {
        refreshTokens.push(req.body.refreshToken)
    } else {
        refreshTokens = [];
        const newRefreshToken = jwt.sign({
            username: req.body.email,
        }, process.env.JWT_REFRESH_SECRET, { expiresIn: '4m' });
        refreshTokens.push(newRefreshToken)
    };
    
    jwt.verify(refreshTokens[0], process.env.JWT_REFRESH_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({ error: "token doesnt exist" })
        }
    
        const accessToken = jwt.sign({
            email: req.body.user
        }, process.env.JWT_ACCESS_SECRET, {
            expiresIn: '4m'
        });
        return res.json({ accessToken });
    })

})



module.exports = router;