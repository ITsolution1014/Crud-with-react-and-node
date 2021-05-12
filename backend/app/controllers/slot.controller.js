const db = require("../models");
const Slot = db.slots;
const Op = db.Sequelize.Op;

// Create and Save a new Slot
exports.create = (req, res) => {
    // Validate request
    if (!req.body.location_id) {
        res.status(400).send({
            message: "Content can"
        });
        return;
    }
    console.log(req.body.location_id)
    // Create a Slot
    const slotDevice = {
        location_id: req.body.location_id,
        device_id: req.body.device_id,
        file_id:req.body.file_id,
        name:req.body.name,
        length: req.body.length,
        expiration: req.body.expiration

    };

    // Save Slot in the database
    Slot.create(slotDevice)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Slot."
            });
        });
};

// Retrieve all Slot from the database.
exports.findAll = (req, res) => {
    const device_type = req.query.device_type;
    var condition = device_type ? { device_type: { [Op.like]: `%${device_type}%` } } : null;

    Slot.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Slot."
            });
        });
};

// Find a single Slot with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Slot.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Slot with id=" + id
            });
        });
};

// Update a Slot by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    console.log(id)
    Slot.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Slot was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Inventory with id=${id}. Maybe Slot was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Inventory with id=" + id
            });
        });
};

// Update a Slot by the id in the request
exports.findSlots = (req, res) => {
    // console.log(req.body.businessId);
    // console.log(req.body.deviceId);
    //
    // console.log('perfect');

    Slot.findAll({ where: { location_id: req.body.businessId, device_id: req.body.deviceId } })
        .then(data => {
            console.log(data)
            res.send(data);

        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Slot."
            });
        });

};

// Delete a Slot with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Slot.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Slot was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Slot with id=${id}. Maybe Slot was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Slot with id=" + id
            });
        });
};

// Delete all Slots from the database.
exports.deleteAll = (req, res) => {
    Slot.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Slot were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Slot."
            });
        });
};

// find all published Slot
exports.findAllPublished = (req, res) => {
    Slot.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Slot."
            });
        });
};
