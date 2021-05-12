module.exports = (sequelize, Sequelize) => {
    const Contracts = sequelize.define("contracts", {
        name: {
            type: Sequelize.STRING
        },
        start: {
            type: Sequelize.DATE
        },
        end: {
            type: Sequelize.DATE
        },
        document_url: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        date_purchased: {
            type: Sequelize.DATE
        },
        date_cancelation: {
            type: Sequelize.DATE
        },
        amount: {
            type: Sequelize.INTEGER
        },
        payment_method: {
            type: Sequelize.STRING
        },
    });

    return Contracts;
};
