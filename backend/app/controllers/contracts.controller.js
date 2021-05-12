const db = require("../models");
const Contracts = db.contracts;
const Op = db.Sequelize.Op;

// Create and Save a new Contracts
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Contracts
    const contracts = {
        name: req.body.name,
        start: req.body.start,
        end: req.body.end,
        document_url: req.body.document_url,
        description: req.body.description,
        date_purchased: req.body.date_purchased,
        date_cancelation: req.body.date_cancelation,
        amount: req.body.amount,
        payment_method: req.body.payment_method,
        published: req.body.published ? req.body.published : false
    };

    // Save Contracts in the database
    Contracts.create(contracts)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Contracts."
            });
        });
};

// Retrieve all Contracts from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    Contracts.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Contracts."
            });
        });
};

// Find a single Contracts with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Contracts.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Contracts with id=" + id
            });
        });
};

// Update a Contracts by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Contracts.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Contracts was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Contracts with id=${id}. Maybe Contracts was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Contracts with id=" + id
            });
        });
};

// Delete a Contracts with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Contracts.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Contracts was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Contracts with id=${id}. Maybe Contracts was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Contracts with id=" + id
            });
        });
};

// Delete all Contractss from the database.
exports.deleteAll = (req, res) => {
    Contracts.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Contracts were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Contracts."
            });
        });
};

// find all published Contracts
exports.findAllPublished = (req, res) => {
    Contracts.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Contracts."
            });
        });
};
