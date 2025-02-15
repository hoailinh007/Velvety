const express = require('express');
const userRoutes = require('./userRoutes');
const bookingRequestRoutes = require('./bookingRequestRoutes');
const feedbackRoutes = require('./feedbackRoutes');
const serviceRoutes = require('./serviceRoutes');
const quizResultRoutes = require('./quizResultRoutes');
const paymentRoutes = require('./paymentRoutes');
const blogRoutes = require('./blogRoutes');
const questionRoutes = require('./questionRoutes');
const managerRoutes = require("./managerRoutes");
const grapistRoutes = require("./grapistRoutes");
const calendarRoutes = require("./calendarRoutes");
const consultantRoutes = require("./consultantRoutes");

const router = express.Router();

router.use('/users', userRoutes);
router.use('/booking-requests', bookingRequestRoutes);
router.use('/feedbacks', feedbackRoutes);
router.use('/services', serviceRoutes);
router.use('/quiz-results', quizResultRoutes);
router.use('/payments', paymentRoutes);
router.use('/blogs', blogRoutes);
router.use('/questions', questionRoutes);
router.use('/managers', managerRoutes);
router.use('/grapists', grapistRoutes);
router.use('/calendars', calendarRoutes);
router.use('/consultants', consultantRoutes);

module.exports = router;

