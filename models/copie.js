const { DataTypes } = require("sequelize");

module.exports = (sequelize,type) =>{
    const Copie = sequelize.define('copies',{
        id: {type: type.INTEGER, primaryKey: true, autoIncrement: true},
        number: type.INTEGER,
        format:{
            type: DataTypes.ENUM,
            values: ['CD', 'DVD', 'Blue-Ray']
        },
        estatus: type.BOOLEAN
    });
    return Copie
}