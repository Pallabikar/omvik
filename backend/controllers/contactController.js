const asyncHandler = require('express-async-handler');
const Contact = require('../models/Contact');
const sendEmail = require('../utils/sendEmail');
const sendWhatsApp = require('../utils/sendWhatsApp');
// @desc    Submit a contact form
// @route   POST /api/contact
// @access  Public
const submitContactForm = asyncHandler(async (req, res) => {
  const { name, email, phone, subject, message, city, interestedIn, budgetRange, purchaseTimeline } = req.body;

  const contact = await Contact.create({
    name,
    email,
    phone,
    subject: subject || 'Consultation Request',
    message,
    city,
    interestedIn,
    budgetRange,
    purchaseTimeline,
  });

  if (contact) {
    // Send email notification (Fail silently if email fails so user still gets 201 response)
    try {
      const emailHtml = `
        <h2>New Inquiry Received</h2>
        <p><strong>Name:</strong> ${contact.name}</p>
        <p><strong>Email:</strong> ${contact.email}</p>
        <p><strong>Phone:</strong> ${contact.phone}</p>
        <p><strong>Subject:</strong> ${contact.subject}</p>
        <p><strong>Message:</strong> ${contact.message}</p>
        <p><strong>Budget Range:</strong> ${contact.budgetRange || 'N/A'}</p>
        <p><strong>Purchase Timeline:</strong> ${contact.purchaseTimeline || 'N/A'}</p>
        <br/>
        <p>Log in to the <a href="http://localhost:3000/admin/leads">Admin Panel</a> to view all leads.</p>
      `;

      await sendEmail({
        email: process.env.FROM_EMAIL, // Sending to admin's own email
        subject: `New Contact Lead: ${contact.name}`,
        message: `You have received a new inquiry from ${contact.name}.`,
        html: emailHtml
      });
    } catch (error) {
      console.error('Error sending email notification:', error);
    }

    // Send WhatsApp notification (Fail silently to not interrupt UX)
    try {
      if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
        const waMessage = `*New Inquiry Received*\nName: ${contact.name}\nPhone: ${contact.phone}\nEmail: ${contact.email}\nBudget: ${contact.budgetRange || 'N/A'}`;
        
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
      message: 'Contact form submitted successfully',
      data: contact,
    });
  } else {
    res.status(400);
    throw new Error('Invalid contact data');
  }
});

// @desc    Get all contact submissions
// @route   GET /api/contact
// @access  Private/Admin
const getContactSubmissions = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({}).sort({ createdAt: -1 });
  res.json(contacts);
});

// @desc    Update contact status
// @route   PUT /api/contact/:id
// @access  Private/Admin
const updateContactStatus = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (contact) {
    contact.status = req.body.status || contact.status;
    const updatedContact = await contact.save();
    res.json(updatedContact);
  } else {
    res.status(404);
    throw new Error('Contact not found');
  }
});

module.exports = {
  submitContactForm,
  getContactSubmissions,
  updateContactStatus,
};
