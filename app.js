const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

const account = require("./routes/account");
const wallet = require("./routes/wallet");
const crypto = require("./routes/crypto");
const chart = require("./routes/chart");
const holdings = require("./routes/holdings");

const axios = require("axios");

const port = 1337;

const server = app.listen(port, () => {
  console.log(`Example API listening on port ${port}`);
});

const io = require('socket.io')(server);

app.use(cors());

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("combined"));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/account", account);
app.use("/wallet", wallet);
app.use("/crypto", crypto);
app.use("/holdings", holdings);

const Data = [
  {
    name: '14:00',
    BitCoin: 10000,
    BitConnect: 2400,
  },
  {
    name: '14:10',
    BitCoin: 3000,
    BitConnect: 1398,
  },
  {
    name: '14:15',
    BitCoin: 4000,
    BitConnect: 2400,
  },
  {
    name: '14:30',
    BitCoin: 3000,
    BitConnect: 1398,
  },
  {
    name: '14:40',
    BitCoin: 9000,
    BitConnect: 9398,
  },
  {
    name: '15:00',
    BitCoin: 19000,
    BitConnect: 2398,
  },
  {
    name: '17:00',
    BitCoin: 40000,
    BitConnect: 12398,
  }
];

io.sockets.on('connection', socket => {
  console.log("User connected")

  socket.on('disconnect', () => {
    console.log("User disconnected")
  })

  socket.emit('chart_data', Data)
})

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


module.exports = server;
