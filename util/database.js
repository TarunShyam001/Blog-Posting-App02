const Sequelize = require ('sequelize');

const sequelize =  new Sequelize('blogs', 'root','Vaibhav@123',{
    dialect : 'mysql',
    host : 'localhost'
});

module.exports = sequelize;
