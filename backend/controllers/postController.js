const asyncHandler = require('express-async-handler');
const Post = require('../models/Post');

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
exports.getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({}).sort({ createdAt: -1 });
  res.status(200).json(posts);
});

// @desc    Get a single post by ID
// @route   GET /api/posts/:id
// @access  Public
exports.getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }
  res.status(200).json(post);
});

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private/Admin
exports.createPost = asyncHandler(async (req, res) => {
  const { title, content, image } = req.body;

  if (!title || !content) {
    res.status(400);
    throw new Error('Please add a title and content');
  }

  const post = await Post.create({
    title,
    content,
    image,
  });

  res.status(201).json(post);
});

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private/Admin
exports.updatePost = asyncHandler(async (req, res) => {
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
exports.deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  await post.deleteOne();
  res.status(200).json({ id: req.params.id, message: 'Post deleted successfully' });
});
