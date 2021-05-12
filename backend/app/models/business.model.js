module.exports = (sequelize, Sequelize) => {
    const Business = sequelize.define("business", {
        contracts_id: {
            type: Sequelize.INTEGER
        },
        company_name: {
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
        },
        contact_fname: {
            type: Sequelize.STRING
        },
        contact_lname: {
            type: Sequelize.STRING
        },
        contact_phone: {
            type: Sequelize.STRING
        },
        contact_fax: {
            type: Sequelize.STRING
        },
        contact_email: {
            type: Sequelize.STRING
        },
        published: {
            type: Sequelize.BOOLEAN
        }
    });

    return Business;
};
