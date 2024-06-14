const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/db');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const { auth } = require('express-openid-connect');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 8080;

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.secret,
  baseURL: process.env.baseURL,
  clientID: process.env.clientID,
  issuerBaseURL: process.env.issuerBaseURL
};

// Apply the auth middleware
app.use(auth(config));

// Apply the logging middleware to all routes
const logRequests = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};
app.use(logRequests);

// Middleware to handle CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Use body-parser middleware
app.use(bodyParser.json());

// Serve API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Use routes
app.use('/', routes);

// Connect to MongoDB and start the server
mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Connected to DB and listening on ${port}`);
    });
  }
});