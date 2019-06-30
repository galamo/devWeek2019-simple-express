const express = require("express");
const eventEmitter = require("events");
const api = express();

const port = 3200;

// class MyEmitter extends eventEmitter{}
const emitter = new eventEmitter();

const users = [
  { name: "gal", id: 2398983, mail: "galamo88@gmail.com" },
  { name: "hen", id: 123456, mail: "hen@gmail.com" }
];

api.use("/", (req, res, next) => {
  //   const { userName } = req.query;
  //   if (!userName) return res.status(401).send("No User Name");
  if (req.headers.authorization !== "token_1234")
    return res.status(401).send("Invalid token");

  next();
});
api.get("/users", (req, res, next) => {
  res.json(users);
});
console.log(111);

api.get("/users2", (req, res, next) => {
  res.json(users);
});
// api.use((error, req, res, next) => {
//   console.log("errr");
//   res.json(error);
// });

api.listen(port, () => {
  console.log(`node js is working on port ${port}`);
  emitter.emit("serverStart");
});

emitter.on("serverStart", () => {
  console.log("server starts with port...");
});
