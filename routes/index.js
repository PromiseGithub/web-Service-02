const express = require('express');
const router = express.Router();

const { auth } = require('express-openid-connect');

// Authentication check middleware function
const checkAuthenticated = (req, res, next) => {
  if (req.oidc && req.oidc.isAuthenticated()) {
    return next();
  }
  res.status(401).send('Unauthorized');
};

// req.isAuthenticated is provided from the auth router
router.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

// Use the individual and snack routes, protected by the authentication check middleware
router.use('/individual', checkAuthenticated, require('./individual'));
router.use('/snack', checkAuthenticated, require('./snack'));

module.exports = router;