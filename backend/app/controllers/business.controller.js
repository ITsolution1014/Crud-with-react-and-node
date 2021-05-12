const db = require("../models");
const Business = db.businesses;
const Contracts = db.contracts;
const Op = db.Sequelize.Op;

// Create and Save a new Customer
exports.create = (req, res) => {
    // Validate request
    if (!req.body.company_name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Customer
    const business = {
        contracts_id: req.body.contracts_id,
        company_name: req.body.company_name,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip_code: req.body.zip_code,
        notes: req.body.notes,
        contact_fname: req.body.contact_fname,
        contact_lname: req.body.contact_lname,
        contact_phone: req.body.contact_phone,
        contact_fax: req.body.contact_fax,
        contact_email: req.body.contact_email,
        published: req.body.published ? req.body.published : false
    };

    // Save Customer in the database
    Business.create(business)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Customer."
            });
        });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    const company_name = req.query.company_name;
    // const name = req.query.name;
    let condition = company_name ? { company_name: { [Op.like]: `%${company_name}%` } } : null;
    // let condition_contract = name ? { name: { [Op.like]: `%${name}%` } } : null;
    Business.findAll({ where: condition })
    // Contracts.findAll({ where: condition_contract })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving businesses."
            });
        });
};

// Find a single Customer with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Business.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Business with id=" + id
            });
        });
};

// Update a Customer by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Business.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Business location was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update business location with id=${id}. Maybe business location was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating business location with id=" + id
            });
        });
};

// Delete a Customer with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Business.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Business location was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Business location with id=${id}. Maybe Business location was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Business location with id=" + id
            });
        });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
    Business.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Business locations were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Business locations."
            });
        });
};

// find all published Customer
exports.findAllPublished = (req, res) => {
    Business.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Business locations."
            });
        });
};
