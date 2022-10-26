const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).json({ error: "A token is required for authentication" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }

  return next();
};