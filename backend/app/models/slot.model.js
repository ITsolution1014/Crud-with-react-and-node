module.exports = (sequelize, Sequelize) => {
    const Slot = sequelize.define("slot", {
        location_id: {
            type: Sequelize.STRING
        },
        device_id: {
            type: Sequelize.STRING
        },
        file_id: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        length: {
            type: Sequelize.STRING
        },
        expiration: {
            type: Sequelize.STRING
        }
    });

    return Slot;
};
