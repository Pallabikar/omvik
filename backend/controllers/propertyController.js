const asyncHandler = require('express-async-handler');
const Property = require('../models/Property');
const sendEmail = require('../utils/sendEmail');
const sendWhatsApp = require('../utils/sendWhatsApp');

// @desc    Submit a property registration form
// @route   POST /api/properties
// @access  Public
const registerProperty = asyncHandler(async (req, res) => {
  const { 
    fullName, phone, email, propertyType, location, landSize, 
    ownershipType, expectedPrice, urgency, description 
  } = req.body;

  let imagePaths = [];
  if (req.files && req.files.length > 0) {
    imagePaths = req.files.map(file => file.path);
  }

  const property = await Property.create({
    fullName,
    phone,
    email,
    propertyType: propertyType || 'Plot',
    location,
    landSize,
    ownershipType: ownershipType || 'Owner',
    expectedPrice,
    urgency: urgency || 'Normal',
    description,
    images: imagePaths,
  });

  if (property) {
    try {
      const emailHtml = `
        <h2>New Property Registration Received</h2>
        <p><strong>Name:</strong> ${property.fullName}</p>
        <p><strong>Phone:</strong> ${property.phone}</p>
        <p><strong>Email:</strong> ${property.email || 'N/A'}</p>
        <p><strong>Property Type:</strong> ${property.propertyType}</p>
        <p><strong>Location:</strong> ${property.location || 'N/A'}</p>
        <p><strong>Land Size:</strong> ${property.landSize || 'N/A'}</p>
        <p><strong>Ownership:</strong> ${property.ownershipType}</p>
        <p><strong>Expected Price:</strong> ${property.expectedPrice || 'N/A'}</p>
        <p><strong>Urgency:</strong> ${property.urgency}</p>
        <p><strong>Description:</strong> ${property.description || 'N/A'}</p>
        <br/>
        ${property.images && property.images.length > 0 ? `
          <p><strong>Images:</strong></p>
          <ul>
            ${property.images.map(img => `<li><a href="${img}">View Image</a></li>`).join('')}
          </ul>
        ` : ''}
        <br/>
        <p>Log in to the <a href="http://localhost:3000/admin/properties">Admin Panel</a> to view all properties.</p>
      `;

      if (process.env.RESEND_API_KEY) {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
          },
          body: JSON.stringify({
            from: 'OMVIK System <onboarding@resend.dev>',
            to: [process.env.TO_EMAIL || 'omvikrealcon@gmail.com'],
            subject: `New Property Registration: ${property.propertyType} at ${property.location || 'Unknown'}`,
            html: emailHtml
          })
        });
      } else {
        await sendEmail({
          email: process.env.TO_EMAIL || 'omvikrealcon@gmail.com',
          subject: `New Property Registration: ${property.propertyType} at ${property.location || 'Unknown'}`,
          message: `You have received a new property registration from ${property.fullName}.`,
          html: emailHtml
        });
      }
    } catch (error) {
      console.error('Error sending email notification:', error);
    }

    // Send WhatsApp notification
    try {
      if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
        const waMessage = `*New Property Reg:*\nType: ${property.propertyType}\nLoc: ${property.location}\nName: ${property.fullName}\nPhone: ${property.phone}\nUrgency: ${property.urgency}`;
        
        await sendWhatsApp({
          to: process.env.ADMIN_WHATSAPP_NUMBER,
          message: waMessage
        });
      }
    } catch (waError) {
      console.error('Error sending WhatsApp notification:', waError);
    }

    res.status(201).json({
      success: true,
      message: 'Property registered successfully',
      data: property,
    });
  } else {
    res.status(400);
    throw new Error('Invalid property data');
  }
});

// @desc    Get all property registrations
// @route   GET /api/properties
// @access  Private/Admin
const getProperties = asyncHandler(async (req, res) => {
  const properties = await Property.find({}).sort({ createdAt: -1 });
  res.json(properties);
});

// @desc    Update property status
// @route   PUT /api/properties/:id
// @access  Private/Admin
const updatePropertyStatus = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id);

  if (property) {
    property.status = req.body.status || property.status;
    const updatedProperty = await property.save();
    res.json(updatedProperty);
  } else {
    res.status(404);
    throw new Error('Property not found');
  }
});

module.exports = {
  registerProperty,
  getProperties,
  updatePropertyStatus,
};
