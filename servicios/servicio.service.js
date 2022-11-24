const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const { Op } = require('sequelize');
const sendEmail = require('_helpers/send-email');
const db = require('_helpers/db');
const Role = require('_helpers/role');
// const domicilioService = require('../domicilio/domicilio.service');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    const servicios = await db.Servicio.findAll();
    return servicios.map(x => x);
}

async function getById(id) {
    const account = await getServicio(id);
    return account;
}

async function create(params) {
    // validate
    const servicio = new db.Servicio(params);

    // save account
    await servicio.save();

    return basicDetails(servicio);
}

async function update(id, params) {
    const servicio = await getServicio(id);

    // copy params to account and save
    Object.assign(servicio, params);

    // servicio.updated = Date.now();

    await servicio.save();

    return basicDetails(servicio);
}

async function _delete(id) {
    const account = await getServicio(id);
    await account.destroy();
}

// helper functions

async function getServicio(id) {
    const servicio = await db.Servicio.findByPk(id);
    if (!servicio) throw 'Account not found';
    return servicio;
}

function basicDetails(account) {
    const { id, title, firstName, lastName, email, role, created, updated, isVerified ,  domicilio , arriendos} = account;
    return { id, title, firstName, lastName, email, role, created, updated, isVerified, domicilio , arriendos};
}