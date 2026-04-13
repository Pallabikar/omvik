const asyncHandler = require('express-async-handler');
const Post = require('../models/Post');

// @desc    Get all published posts (with filtering)
// @route   GET /api/posts
// @access  Public
const getPosts = asyncHandler(async (req, res) => {
  const { type, category, filter, isPopular } = req.query;
  
  let query = { status: 'published' };
  
  if (type) query.type = type;
  if (category) query.category = category;
  if (isPopular) query.isPopular = isPopular === 'true';
  
  if (filter) {
    const now = new Date();
    if (filter === 'today') {
      const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      query.publishDate = { $gte: startOfToday };
    } else if (filter === 'week') {
      // 7 days ago
      const startOfWeek = new Date();
      startOfWeek.setDate(startOfWeek.getDate() - 7);
      query.publishDate = { $gte: startOfWeek };
    } else if (filter === 'month') {
      // 30 days ago
      const startOfMonth = new Date();
      startOfMonth.setDate(startOfMonth.getDate() - 30);
      query.publishDate = { $gte: startOfMonth };
    }
  }

  const posts = await Post.find(query).sort({ publishDate: -1 });
  res.status(200).json(posts);
});

// @desc    Get a single post
// @route   GET /api/posts/slug/:slug
// @access  Public
const getPostBySlug = asyncHandler(async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug, status: 'published' });
  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }
  res.status(200).json(post);
});

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private/Admin
const createPost = asyncHandler(async (req, res) => {
  const post = await Post.create(req.body);
  res.status(201).json(post);
});

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private/Admin
const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedPost);
});

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private/Admin
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  await post.deleteOne();
  res.status(200).json({ id: req.params.id, message: 'Post deleted successfully' });
});

// @desc    Get all posts for admin (including drafts)
// @route   GET /api/posts/admin/all
// @access  Private/Admin
const getAdminPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({}).sort({ createdAt: -1 });
  res.status(200).json(posts);
});

module.exports = {
  getPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
  getAdminPosts
};
