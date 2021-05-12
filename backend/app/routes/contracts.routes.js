module.exports = app => {
    const contracts = require("../controllers/contracts.controller.js");

    var router = require("express").Router();

    // Create a new Contract
    router.post("/", contracts.create);

    // Retrieve all Contracts
    router.get("/", contracts.findAll);

    // Retrieve all published Contracts
    router.get("/published", contracts.findAllPublished);

    // Retrieve a single Contract with id
    router.get("/:id", contracts.findOne);

    // Update a Contract with id
    router.put("/:id", contracts.update);

    // Delete a Contract with id
    router.delete("/:id", contracts.delete);

    // Delete all Contracts
    router.delete("/", contracts.deleteAll);

    app.use('/api/contracts', router);
};
