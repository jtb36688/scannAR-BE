require("dotenv").config();
const moment = require("moment")
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const UserRouter = require("../users/usersRouter.js");
const ProductsRouter = require("../products/productsRouter.js");
const ShipmentsRouter = require("../shipments/shipmentsRouter.js");

const server = express();

// const originUrls = process.env.PERMITTED_URLS.split(',');

// const corsOptions = {
//   origin: '*',
//   credentials: true,
//   methods: ['GET', 'PUT', 'POST', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'UserId'],
// };

server.use(morgan());
server.use(express.json());
server.use(cors());
server.use(helmet());

server.get("/", (req, res) => {
  res.send(`
    <div>
      <h1>scannAR Back-End API</h1>
      <p>
        Welcome to the server! The time is now ${moment().local().format("h:mm:ss a")}.
      </p>
      <h3>POST api/users/register – Creates a new record on the ‘users’ table.</h3>
      <p>
        Expected request body properties: username (required, unique) password
        (required) fullName (required) email oAuth (boolean default false)
      </p>
      <h3>POST api/users/login – Creates a JSON Web Token for user</h3>
      <p>
        Accepted request body properties: username (required) password
        (required)
      </p>
      <h3>GET api/users/checkauth – Checks if user’s token is valid</h3>
      <p>
        Expects a JSON Web token in the request header Returns true or false
        depending on if the token is still valid. Can be used in a
        componentDidMount() to set this.state.loggedIn upon browser refresh.
      </p>
      <h3>
        GET api/products – Returns a list of all products for current user
      </h3>
      <p>
        Expects a JSON web token in the request header. Returns an array of JSON
        objects which represent products.
      </p>
      <h3>
        POST api/products/add – Creates a new record on the “products” table
      </h3>
      <p>
        Expects a JSON web token in the request header. Adds the product for the
        current user. Returns a single JSON object with all of that product’s
        properties.
      </p>
    </div>
  `);
});

server.use("/api/users", UserRouter);
server.use("/api/products", ProductsRouter);
// server.use('/api/shipments', ShipmentsRouter);

module.exports = server;
