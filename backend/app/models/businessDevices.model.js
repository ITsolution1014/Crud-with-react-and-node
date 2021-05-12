module.exports = (sequelize, Sequelize) => {
  const BusinessDevices = sequelize.define("businessDevice", {
    location_id: {
      type: Sequelize.INTEGER,
    },
    device_id: {
      type: Sequelize.INTEGER,
    },
  });

  return BusinessDevices;
};
