  
const express = require('express');

// const UserRouter = require("./users/userRouter.js");
// const PostRouter = require("./posts/postRouter.js");

const server = express();

server.use(express.json());
server.use(logger);
// server.use("/api/users", UserRouter);
// server.use("/api/posts", PostRouter);

server.get('/', (req, res) => {
  res.send(`<h2>WELCOME TO API SPRINT CHALLENGE!!!</h2>`);
});

// custom middleware

function logger(req, res, next) {
  console.log(`${req.method} ${req.originalUrl} at ${new Date().toISOString()}`);
  next();
}


module.exports = server;