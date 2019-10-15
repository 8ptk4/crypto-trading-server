const express = require("express");
const app = express();

const port = 1337;

// Add a route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Start up server
app.listen(port, () => console.log(`Example API listening on port ${port}!`));
