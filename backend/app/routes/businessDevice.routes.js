module.exports = app => {
    const businessDevices = require("../controllers/businessDevices.controller.js");

    var router = require("express").Router();

    // Create a new businessDevice
    router.post("/", businessDevices.create);

    // Retrieve all businessDevices
    router.get("/", businessDevices.findAll);

    // Retrieve all published businessDevices
    router.get("/published", businessDevices.findAllPublished);

    // Retrieve all businessDevice with location_id
    router.get("/:id", businessDevices.findAllIdDevices);

    // Update a businessDevice with id
    router.put("/:id", businessDevices.update);

    // Delete a businessDevice with id
    router.delete("/", businessDevices.delete);

    // Delete all businessDevices
    // router.delete("/", businessDevices.deleteAll);

    app.use('/api/businessDevices', router);
};
