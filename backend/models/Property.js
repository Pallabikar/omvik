const mongoose = require('mongoose');

const propertySchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Please add a full name'],
    },
    email: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: [true, 'Please add a phone number'],
    },
    propertyType: {
      type: String,
      required: [true, 'Please select a property type'],
      enum: ['Plot', 'Agricultural Land', 'Residential', 'Commercial'],
    },
    location: {
      type: String,
      required: false,
    },
    landSize: {
      type: String,
      required: false,
    },
    ownershipType: {
      type: String,
      required: false,
      enum: ['Owner', 'Broker'],
    },
    expectedPrice: {
      type: String,
      required: false,
    },
    urgency: {
      type: String,
      required: false,
      enum: ['Normal', 'Urgent'],
    },
    description: {
      type: String,
      required: false,
    },
    images: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
      enum: ['new', 'under-review', 'contacted', 'rejected'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Property', propertySchema);
