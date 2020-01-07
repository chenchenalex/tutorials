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

// expose the user in each request if they are logged in
server.express.use(async (req, res, next) => {
  if (!req.userId) return next();

  const user = await db.query.user(
    {
      where: {
        id: req.userId,
      },
    },
    `{id, permissions, email, name}`,
  );

  req.user = user;
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
