const express = require('express');

const basicRoutes = require('./basic-routes');
const adminRoutes = require('./admin-routes');
const attendantRoutes = require('./attendant-routes');
const riskClassificationRoutes = require('./risk-classification-routes');
const doctorRoutes = require('./doctor-routes');
const notFoundRoutes = require('./not-found-routes');

module.exports = function() {
    const router = express.Router();

    router.use(basicRoutes);
    router.use(adminRoutes);
    router.use(doctorRoutes);
    router.use(riskClassificationRoutes);
    router.use(attendantRoutes);
    router.use(notFoundRoutes);

    return router;
};