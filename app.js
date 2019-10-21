const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

const account = require("./routes/account");
const wallet = require("./routes/wallet");
const crypto = require("./routes/crypto");

const port = 1337;

app.use(cors());

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("combined"));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/account", account);
app.use("/wallet", wallet);
app.use("/crypto", crypto);

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status || 500).json({
    errors: [
      {
        status: err.status,
        title: err.message,
        detail: err.message
      }
    ]
  });
});

const server = app.listen(port, () => {
  console.log(`Example API listening on port ${port}`);
});

module.exports = server;
