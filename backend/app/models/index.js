const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.customers = require("./customer.model.js")(sequelize, Sequelize);
db.businesses = require("./business.model.js")(sequelize, Sequelize);
db.businessDevices = require("./businessDevices.model.js")(
  sequelize,
  Sequelize
);
db.slots = require("./slot.model.js")(sequelize, Sequelize);
db.inventory = require("./inventory.model.js")(sequelize, Sequelize);
db.files = require("./files.model.js")(sequelize, Sequelize);
db.contracts = require("./contracts.model.js")(sequelize, Sequelize);

// db.businesses.belongsToMany(db.inventory, {
//   through: "businessDevices",
//   as: "devices",
//   foreignKey: "location_id",
// });
// db.inventory.belongsToMany(db.businesses, {
//   through: "businessDevices",
//   as: "businesses",
//   foreignKey: "device_id",
// });

module.exports = db;
