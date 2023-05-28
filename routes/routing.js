const express = require('express');

const basicRoutes = require('./basic-routes');
const adminRoutes = require('./admin-routes');
const attendantRoutes = require('./attendant-routes');
const riskClassificationRoutes = require('./risk-classification-routes');
const doctorRoutes = require('./doctor-routes');

module.exports = function({ initials }) {
    const router = express.Router();

    router.use(basicRoutes);
    router.use(adminRoutes);
    router.use(doctorRoutes);
    router.use(riskClassificationRoutes);
    router.use(attendantRoutes);

    return router;
};