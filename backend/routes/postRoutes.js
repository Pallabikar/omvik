const express = require('express');
const router = express.Router();
const {
  getPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
  getAdminPosts
} = require('../controllers/postController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getPosts)
  .post(protect, admin, createPost);

router.route('/admin/all').get(protect, admin, getAdminPosts);

router.route('/:id')
  .put(protect, admin, updatePost)
  .delete(protect, admin, deletePost);

router.route('/slug/:slug').get(getPostBySlug);

module.exports = router;
