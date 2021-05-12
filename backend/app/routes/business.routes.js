module.exports = app => {
    const businesses = require("../controllers/business.controller.js");

    var router = require("express").Router();

    // Create a new Customer
    router.post("/", businesses.create);

    // Retrieve all Customers
    router.get("/", businesses.findAll);

    // Retrieve all published Customers
    router.get("/published", businesses.findAllPublished);

    // Retrieve a single Customer with id
    router.get("/:id", businesses.findOne);

    // Update a Customer with id
    router.put("/:id", businesses.update);

    // Delete a Customer with id
    router.delete("/:id", businesses.delete);

    // Delete all Customers
    router.delete("/", businesses.deleteAll);

    app.use('/api/businesses', router);
};
