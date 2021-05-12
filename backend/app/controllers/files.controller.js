const db = require("../models");
const File = db.files;
const Op = db.Sequelize.Op;

// Create and Save a new File
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "File can not be empty!",
    });
    return;
  }

  // Create a File
  const file = {
    customer_id: req.body.customer_id,
    title: req.body.title,
    type: req.body.type,
    url: req.body.url,
    language: req.body.language,
    description: req.body.description,
    length: req.body.length,
  };

  // Save File in the database
  File.create(file)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the File.",
      });
    });
};

// Retrieve all Files from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  File.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Files.",
      });
    });
};

// Find a single File with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  File.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving File with id=" + id,
      });
    });
};

// Update a File by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  File.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "File was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update File with id=${id}. Maybe File was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating File with id=" + id,
      });
    });
};

// Delete a File with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  File.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "File was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete File with id=${id}. Maybe File was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete File with id=" + id,
      });
    });
};

// Delete all Files from the database.
exports.deleteAll = (req, res) => {
  File.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Files were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Files.",
      });
    });
};

// find all published File
exports.findAllPublished = (req, res) => {
  File.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Files.",
      });
    });
};
