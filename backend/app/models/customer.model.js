module.exports = (sequelize, Sequelize) => {
  const Customer = sequelize.define("customer", {
    first_name: {
      type: Sequelize.STRING
    },
    last_name: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.INTEGER
    },
    fax: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    company: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    city: {
      type: Sequelize.STRING
    },
    state: {
      type: Sequelize.STRING
    },
    zip_code: {
      type: Sequelize.STRING
    },
    notes: {
      type: Sequelize.STRING
    }
  });

  return Customer;
};
