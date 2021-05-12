module.exports = (sequelize, Sequelize) => {
  const File = sequelize.define("file", {
    customer_id: {
      type: Sequelize.INTEGER,
    },
    title: {
      type: Sequelize.STRING,
    },
    url: {
      type: Sequelize.STRING,
    },
    language: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    length: {
      type: Sequelize.INTEGER,
    },
  });

  return File;
};
