const db = require("../models");
const Businesses = db.businesses;
const BusinessDevice = db.businessDevices;
const Inventories = db.inventory;
const Op = db.Sequelize.Op;

// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body.location_id) {
    res.status(400).send({
      message: "Content can",
    });
    return;
  }
  // Create a Customer
  const businessDevice = {
    location_id: req.body.location_id,
    device_id: req.body.device_id,
  };

  // Save Customer in the database
  BusinessDevice.create(businessDevice)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer.",
      });
    });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  const location_id = req.query.location_id;
  // const name = req.query.name;
  let condition = location_id
    ? { location_id: { [Op.like]: `%${location_id}%` } }
    : null;
  // let condition_contract = name ? { name: { [Op.like]: `%${name}%` } } : null;
  BusinessDevice.findAll({ where: condition })
    // Contracts.findAll({ where: condition_contract })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving businessDeviceDevices.",
      });
    });
};

// Find all devices with location_id
// exports.findAllIdDevices = (req, res) => {
//   const id = req.params.id;
//   // console.log(id)
//   Businesses.findByPk(id, {
//     // include:["tutorial"],
//     include: [
//       {
//         model: Inventories,
//         as: "devices",
//         attributes: ["id", "device_type", "purchase_date"],
//         through: {
//           attributes: [],
//         },
//       },
//     ],
//   })

//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: "Error retrieving BusinessDevice with id=" + id,
//       });
//     });
// };
exports.findAllIdDevices = (req, res) => {
  const location_id = req.params.id;

  BusinessDevice.findAll({ where: { location_id: location_id } })
    .then((data) => {
      var response = [];
      data.map((row, key) => {
        var device = Inventories.findOne({ where: { device_id, row } });
        response.push(device);
      });

      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving BusinessDevice with id=" + id,
      });
    });
};
// Update a Customer by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  console.log(req.body.deviceId);
  BusinessDevice.destroy({
    where: { location_id: req.body.businessId, device_id: req.body.deviceId },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "BusinessDevice location was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update businessDevice location with id=${id}. Maybe businessDevice location was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating businessDevice location with id=" + id,
      });
    });
};

// Delete a Customer with the specified id in the request
exports.delete = (req, res) => {
  const location_id = req.body.businessId;
  const device_id = req.body.deviceId;

  BusinessDevice.query()
    .delete()
    .where("location_id", location_id)
    .andWhere("device_id", device_id)
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "BusinessDevice location was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete BusinessDevice location with id=${id}. Maybe BusinessDevice location was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete BusinessDevice location with id=" + id,
      });
    });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  BusinessDevice.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} BusinessDevice locations were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all BusinessDevice locations.",
      });
    });
};

// find all published Customer
exports.findAllPublished = (req, res) => {
  BusinessDevice.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving BusinessDevice locations.",
      });
    });
};
