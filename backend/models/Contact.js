const mongoose = require('mongoose');

const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
    },
    phone: {
      type: String,
      required: [true, 'Please add a phone number'],
    },
    subject: {
      type: String,
      required: false,
    },
    message: {
      type: String,
      required: [true, 'Please add a message'],
    },
    city: String,
    interestedIn: String,
    budgetRange: String,
    purchaseTimeline: String,
    status: {
      type: String,
      enum: ['new', 'in-progress', 'resolved'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Contact', contactSchema);
