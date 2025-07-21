// models/Lead.js
import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  formType: {
    type: String,
    enum: ['contact-us', 'jasmin', 'jeddah', 'franchise', 'instant-valuation', 'join-us', 'book-appoitnment'],
    required: true,
  },
  // Fields for Contact-us, Jasmin, Jeddah, Franchise, Instant Valuation, and Join Us
  fullName: String, // Also for join-us
  mobileNumber: String, // Also for join-us
  email: String, // Also for join-us
  city: String, // Also for join-us
  message: String, // Also for join-us
  imageUrl: {
    type: String,
    required: function() { return this.formType === 'contact-us'; }
  }, // for contact-us image upload

  // Franchise-specific fields
  surname: String,
  companyName: String,
  dob: Date,
  educationStatus: String,
  province: String,
  hearAboutUs: String,
  promotionalConsent: Boolean,
  personalDataConsent: Boolean,

  // Fields for book-appointment
  agentName: String, // e.g., 'Ahmed Jaber'
  yourName: String, // User's name
  phone: String, // User's phone
  purpose: { type: String, enum: ['buy', 'rent', 'sell'] }, // Select buy/rent/sell
  termsAccepted: Boolean, // By submitting this form I agree to Terms of Use

  // Common timestamps
  createdAt: {
    type: Date,
    default: Date.now,
  },
  firstName: String, // For Jasmin/Jeddah
  lastName: String,  // For Jasmin/Jeddah
  addressTo: String, // For Jasmin/Jeddah
});

export default mongoose.model('Lead', leadSchema);
