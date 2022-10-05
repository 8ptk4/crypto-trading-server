const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
  const accessToken = req.headers["x-access-token"]

  jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "token doesnt exist" })
    }

    req.user = decoded
    next()
    return undefined;
  })
}