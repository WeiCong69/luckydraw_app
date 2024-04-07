import db from "../models/index.js";
const User = db.userDetails;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
const create = (req, res) => {
  res.json({ message: "create called." });
};

// Retrieve all Tutorials from the database.
const findAll = (req, res) => {};

// Find a single Tutorial with an id
const findOne = (req, res) => {};

// Update a Tutorial by the id in the request
const update = (req, res) => {};

// Delete a Tutorial with the specified id in the request
const _delete = (req, res) => {
  res.json({ message: "delete called." });
};

// Delete all Tutorials from the database.
const deleteAll = (req, res) => {};

// Find all published Tutorials
const findAllPublished = (req, res) => {};

export default {
  create,
  findAll,
  findOne,
  update,
  _delete,
  deleteAll,
  findAllPublished,
};
