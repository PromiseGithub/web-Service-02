const routes = require('express').Router();
const express = require('express');
const myControllers = require('../controllers/snack');

// Import the express-validator module
const { body, validationResult } = require('express-validator');

console.log('Something is happening here');

// Define validation rules for snack creation
const createSnackValidationRules = [
    body('snack').notEmpty().withMessage('Pick a snack'),
    body('drink').notEmpty().withMessage('Pick a drink'),
    body('internet').notEmpty().withMessage('Do you need internet'),
  ];

routes.post('/snack', createSnackValidationRules, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    myControllers.create(req, res, next);
  });

routes.get('/', myControllers.getAll);
routes.get('/:id', myControllers.getSingle);
routes.put('/:id', myControllers.update);
routes.delete('/:id', myControllers.remove);

module.exports = routes;