const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
    },
    content: {
      type: String,
      required: [true, 'Please add content'],
    },
    image: {
      type: String, // Will store Cloudinary URL
      required: false,
    },
    category: {
      type: String,
      default: 'General',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Post', postSchema);
