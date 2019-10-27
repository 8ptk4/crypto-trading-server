const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.headers["x-access-token"];
  const secret = "hemligakorvmojjar";

  jwt.verify(token, secret, function (err, decoded) {
    if (err) {
      return res.status(401).json({ error: "token doesnt exist" });
    }

    req.user = decoded
    next();
    return undefined;
  });
}