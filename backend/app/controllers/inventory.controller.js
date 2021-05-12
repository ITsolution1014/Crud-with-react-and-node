const db = require("../models");
const Inventory = db.inventory;
const Op = db.Sequelize.Op;

// Create and Save a new Inventory
exports.create = (req, res) => {
    // Validate request
    if (!req.body.device_type) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Inventory
    const inventory = {
        device_type: req.body.device_type,
        purchase_date: req.body.purchase_date,
        warranty_date: req.body.warranty_date,
        device_store: req.body.device_store,
        device_description: req.body.device_description,
        published: req.body.published ? req.body.published : false
    };

    // Save Inventory in the database
    Inventory.create(inventory)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Inventory."
            });
        });
};

// Retrieve all Inventory from the database.
exports.findAll = (req, res) => {
    const device_type = req.query.device_type;
    var condition = device_type ? { device_type: { [Op.like]: `%${device_type}%` } } : null;

    Inventory.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Inventory."
            });
        });
};

// Find a single Customer with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Inventory.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Inventory with id=" + id
            });
        });
};



// Update a Customer by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Inventory.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Inventory was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Inventory with id=${id}. Maybe Inventory was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Inventory with id=" + id
            });
        });
};

// Delete a Customer with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Inventory.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Inventory was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Inventory with id=${id}. Maybe Inventory was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Inventory with id=" + id
            });
        });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
    Inventory.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Inventory were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Inventory."
            });
        });
};

// find all published Customer
exports.findAllPublished = (req, res) => {
    Inventory.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Inventory."
            });
        });
};
