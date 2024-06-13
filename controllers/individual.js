const { body, validationResult } = require('express-validator');

const mongodb = require('../db/db');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  const db = await mongodb.getDb(); // Get the MongoDB client instance
  const result = await db.db('mydb').collection('individual').find().toArray();

  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(result);
};

const getSingle = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const db = await mongodb.getDb(); // Get the MongoDB client instance
  const result = await db.db('mydb').collection('individual').find({ _id: userId }).toArray();

  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(result[0]);
};

const create = async (req, res, next) => {
  const db = await mongodb.getDb();
  const individual = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    dob: req.body.dob,
    allergy: req.body.allergy,
    avail: req.body.avail
  };
  const result = await db.db('mydb').collection('individual').insertOne(individual);
  
  res.setHeader('Content-Type', 'application/json');
  res.status(201).json({ id: result.insertedId });
};

const update = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const db = await mongodb.getDb();
  const updatedIndividual = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    dob: req.body.dob,
    allergy: req.body.allergy,
    avail: req.body.avail
  };
  const result = await db.db('mydb').collection('individual').updateOne(
    { _id: userId },
    { $set: updatedIndividual }
  );

  res.status(204).send();
};

const remove = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const db = await mongodb.getDb();
  const result = await db.db('mydb').collection('individual').deleteOne({ _id: userId });

  res.status(204).send();
};

const createContactErrorHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { getAll, getSingle, create, update, remove, createContactErrorHandler };