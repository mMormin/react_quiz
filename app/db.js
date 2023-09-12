const { Sequelize } = require('sequelize');

const dbPlug = new Sequelize({
    dialect: 'postgres',
    define: {
        timestamps: false
    }
});

module.exports = dbPlug;