// routes/submissions.js
const express = require('express');
const router = express.Router();
const submissionController = require('../controllers/submissionController');

// Routes principales
router.post('/', submissionController.createSubmission);
router.get('/', submissionController.getAllSubmissions);
router.get('/stats', submissionController.getStats);
router.get('/:id', submissionController.getSubmissionById);

module.exports = router;