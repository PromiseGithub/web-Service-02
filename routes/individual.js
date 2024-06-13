const routes = require('express').Router();
const express = require('express');
const myControllers = require('../controllers/individual');

// Import the express-validator module
const { body, validationResult } = require('express-validator');

console.log('Something is happening here');

// Define validation rules for individual creation
const createIndividualValidationRules = [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Invalid email'),
  body('phone').isMobilePhone().withMessage('Invalid Phone Number'),
  body('dob').isDate().withMessage('Enter a valid date'),
  body('allergy').notEmpty().withMessage('Enter none if no allergies'),
  body('avail').notEmpty().withMessage('Choose availability')
];


// Apply validation rules and handle errors
routes.post('/individual', createIndividualValidationRules, (req, res, next) => {
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
