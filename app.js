const app = require("express")()
const http = require("http").createServer(app)
const io = require('socket.io')(http)
const bodyParser = require("body-parser")
const morgan = require("morgan")
const cors = require("cors")
const account = require("./routes/account")
const wallet = require("./routes/wallet")
const crypto = require("./routes/crypto")
const chart = require("./routes/chart")
const holdings = require("./routes/holdings")
const history = require("./routes/history")
const port = 8333

app.use(cors());

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("combined"));
}

app.set("io", io);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/account", account);
app.use("/wallet", wallet);
app.use("/crypto", crypto);
app.use("/holdings", holdings);
app.use("/history", history);
app.use("/chart", chart);

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
})

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



http.listen(port, () => {
  console.log(`Server is up on port ${port}`)
});



module.exports = http;
