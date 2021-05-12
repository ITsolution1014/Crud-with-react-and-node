module.exports = app => {
    const inventory = require("../controllers/inventory.controller.js");

    var router = require("express").Router();

    // Create a new Customer
    router.post("/", inventory.create);

    // Retrieve all Customers
    router.get("/", inventory.findAll);

    // Retrieve all published Customers
    router.get("/published", inventory.findAllPublished);

    // Retrieve a single Customer with id
    router.get("/:id", inventory.findOne);

    // Update a Customer with id
    router.put("/:id", inventory.update);

    // Delete a Customer with id
    router.delete("/:id", inventory.delete);

    // Delete all Customers
    router.delete("/", inventory.deleteAll);

    app.use('/api/inventory', router);
};
