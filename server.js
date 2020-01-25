const express = require('express');

const ActionsRouter = require("./actions/router/actionsRouter");
const ProjectsRouter = require("./projects/router/projectsRouter");

const server = express();

server.use(express.json());
server.use(logger);
server.use("/api/actions", ActionsRouter);
server.use("/api/projects", ProjectsRouter);

server.get('/', (req, res) => {
  res.send(`
  <h2>WELCOME TO API SPRINT CHALLENGE!!!</h2>
  
  
  
  `);
  
});

function logger(req, res, next) {
  console.log(`${req.method} ${req.originalUrl} at ${new Date().toISOString()}`);
  next();
}

module.exports = server;