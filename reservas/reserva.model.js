const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {

    const attributes = {
        servicio: { type: DataTypes.STRING, allowNull: false },
        fecha: { type: DataTypes.DATE, allowNull: false },
        hora: { type: DataTypes.TIME, allowNull: false }
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
    };

    return sequelize.define('reserva', attributes, options);
}