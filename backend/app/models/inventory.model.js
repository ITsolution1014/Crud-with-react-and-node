module.exports = (sequelize, Sequelize) => {
  const Inventory = sequelize.define("inventory", {
    device_type: {
      type: Sequelize.STRING,
    },
    purchase_date: {
      type: Sequelize.STRING,
    },
    warranty_date: {
      type: Sequelize.STRING,
    },
    device_store: {
      type: Sequelize.STRING,
    },
    device_description: {
      type: Sequelize.STRING,
    },
  });

  return Inventory;
};
