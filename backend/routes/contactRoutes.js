const express = require('express');
const router = express.Router();
const {
  submitContactForm,
  getContactSubmissions,
  updateContactStatus,
} = require('../controllers/contactController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').post(submitContactForm).get(protect, admin, getContactSubmissions);
router.route('/:id').put(protect, admin, updateContactStatus);

module.exports = router;
