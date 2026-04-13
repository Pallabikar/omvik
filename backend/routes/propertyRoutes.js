const express = require('express');
const router = express.Router();
const {
  registerProperty,
  getProperties,
  updatePropertyStatus,
} = require('../controllers/propertyController');
const { protect, admin } = require('../middleware/authMiddleware');
const { upload } = require('../config/cloudinary');

router.route('/').post(upload.array('images', 5), registerProperty).get(protect, admin, getProperties);
router.route('/:id').put(protect, admin, updatePropertyStatus);

module.exports = router;
