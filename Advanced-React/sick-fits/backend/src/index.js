const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

require("dotenv").config({ path: "variables.env" });

const createServer = require("./createServer");
const db = require("./db");

const server = createServer();

server.express.use(cookieParser());

// decode user token on each request
server.express.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const { signId } = jwt.verify(token, process.env.APP_SECRET);
    req.userId = signId;
  }
  next();
});

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL,
    },
  },
  deets => {
    console.log(`server is now running on http://localhost:${deets.port}`);
  },
);
