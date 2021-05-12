module.exports = app => {
    const slot = require("../controllers/slot.controller.js");

    var router = require("express").Router();

    // Create a new Slot
    router.post("/", slot.create);

    // Retrieve all Slots
    router.get("/", slot.findAll);

    // Retrieve all published Slots
    router.post("/findSlots", slot.findSlots);

    // Retrieve a single Slot with id
    router.get("/:id", slot.findOne);

    router.put("/:id", slot.update);
    // Update a Slot with id
    // router.get("/", slot.update);

    // Delete a Slot with id
    router.delete("/:id", slot.delete);

    // Delete all Slots
    router.delete("/", slot.deleteAll);

    app.use('/api/slot', router);
};
