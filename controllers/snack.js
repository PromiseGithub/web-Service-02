const { body, validationResult } = require('express-validator');

const mongodb = require('../db/db');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  const db = await mongodb.getDb(); // Get the MongoDB client instance
  const result = await db.db('mydb').collection('snack').find().toArray();

  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(result);
};

const getSingle = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const db = await mongodb.getDb(); // Get the MongoDB client instance
  const result = await db.db('mydb').collection('snack').find({ _id: userId }).toArray();

  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(result[0]);
};

const create = async (req, res, next) => {
  const db = await mongodb.getDb();
  const snack = {
    snack: req.body.snack,
    drink: req.body.drink,
    internet: req.body.internet
  };
  const result = await db.db('mydb').collection('snack').insertOne(snack);
  
  res.setHeader('Content-Type', 'application/json');
  res.status(201).json({ id: result.insertedId });
};

const update = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const db = await mongodb.getDb();
  const updatedSnack = {
    snack: req.body.snack,
    drink: req.body.drink,
    internet: req.body.internet
  };
  const result = await db.db('mydb').collection('snack').updateOne(
    { _id: userId },
    { $set: updatedSnack }
  );

  res.status(204).send();
};

const remove = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const db = await mongodb.getDb();
  const result = await db.db('mydb').collection('snack').deleteOne({ _id: userId });

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