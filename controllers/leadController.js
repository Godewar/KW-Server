// controllers/leadController.js
import Lead from '../models/Lead.js';

export const createLead = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);
    
    const leadData = {
      ...req.body,
      // Add image path if file was uploaded
      imageUrl: req.file ? req.file.path : null
    };
    // For Jasmin/Jeddah, set firstName, lastName, addressTo if present
    if (leadData.formType === 'jasmin' || leadData.formType === 'jeddah') {
      leadData.firstName = req.body.firstName || '';
      leadData.lastName = req.body.lastName || '';
      leadData.addressTo = req.body.addressTo || '';
    }
    if (leadData.formType === 'contact-us') {
      leadData.fullName = req.body.fullName || '';
      leadData.mobileNumber = req.body.mobileNumber || '';
      leadData.email = req.body.email || '';
      leadData.city = req.body.city || '';
      leadData.imageUrl = req.file ? req.file.path : (req.body.imageUrl || '');
      leadData.message = req.body.message || '';
    }
    if (leadData.formType === 'franchise') {
      leadData.fullName = req.body.fullName || '';
      leadData.mobileNumber = req.body.mobileNumber || '';
      leadData.city = req.body.city || '';
      leadData.educationStatus = req.body.educationStatus || '';
      leadData.hearAboutUs = req.body.hearAboutUs || '';
      leadData.message = req.body.message || '';
    }
    if (leadData.formType === 'instant-valuation') {
      leadData.fullName = req.body.fullName || '';
      leadData.mobileNumber = req.body.mobileNumber || '';
      leadData.email = req.body.email || '';
      leadData.city = req.body.city || '';
      leadData.message = req.body.message || '';
    }
    if (leadData.formType === 'join-us') {
      leadData.fullName = req.body.fullName || '';
      leadData.mobileNumber = req.body.mobileNumber || '';
      leadData.email = req.body.email || '';
      leadData.city = req.body.city || '';
      leadData.message = req.body.message || '';
    }
    if (leadData.formType === 'book-appointment' || leadData.formType === 'book-appoitnment') {
      leadData.agentName = req.body.agentName || '';
      leadData.yourName = req.body.yourName || '';
      leadData.phone = req.body.phone || '';
      leadData.email = req.body.email || '';
      leadData.message = req.body.message || '';
      leadData.purpose = req.body.purpose || '';
      leadData.termsAccepted = req.body.termsAccepted === 'true' || req.body.termsAccepted === true;
    }

    console.log('Lead data to save:', leadData);

    const newLead = new Lead(leadData);
    await newLead.save();
    
    console.log('Lead created successfully:', newLead);
    res.status(201).json({ 
      message: 'Lead created successfully', 
      lead: newLead 
    });
  } catch (error) {
    console.error('Error creating lead:', error);
    res.status(500).json({ 
      message: 'Error creating lead', 
      error: error.message 
    });
  }
};

export const getAllLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leads', error: error.message });
  }
};

export const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching lead', error: error.message });
  }
};

export const updateLead = async (req, res) => {
  try {
    console.log('Update request body:', req.body);
    console.log('Update request file:', req.file);
    
    const updateData = {
      ...req.body,
      // Add image path if file was uploaded
      ...(req.file && { imageUrl: req.file.path })
    };
    if (updateData.formType === 'jasmin' || updateData.formType === 'jeddah') {
      updateData.firstName = req.body.firstName || '';
      updateData.lastName = req.body.lastName || '';
      updateData.addressTo = req.body.addressTo || '';
    }
    if (updateData.formType === 'contact-us') {
      updateData.fullName = req.body.fullName || '';
      updateData.mobileNumber = req.body.mobileNumber || '';
      updateData.email = req.body.email || '';
      updateData.city = req.body.city || '';
      updateData.imageUrl = req.file ? req.file.path : (req.body.imageUrl || '');
      updateData.message = req.body.message || '';
    }
    if (updateData.formType === 'franchise') {
      updateData.fullName = req.body.fullName || '';
      updateData.mobileNumber = req.body.mobileNumber || '';
      updateData.city = req.body.city || '';
      updateData.educationStatus = req.body.educationStatus || '';
      updateData.hearAboutUs = req.body.hearAboutUs || '';
      updateData.message = req.body.message || '';
    }
    if (updateData.formType === 'instant-valuation') {
      updateData.fullName = req.body.fullName || '';
      updateData.mobileNumber = req.body.mobileNumber || '';
      updateData.email = req.body.email || '';
      updateData.city = req.body.city || '';
      updateData.message = req.body.message || '';
    }
    if (updateData.formType === 'join-us') {
      updateData.fullName = req.body.fullName || '';
      updateData.mobileNumber = req.body.mobileNumber || '';
      updateData.email = req.body.email || '';
      updateData.city = req.body.city || '';
      updateData.message = req.body.message || '';
    }
    if (updateData.formType === 'book-appointment' || updateData.formType === 'book-appoitnment') {
      updateData.agentName = req.body.agentName || '';
      updateData.yourName = req.body.yourName || '';
      updateData.phone = req.body.phone || '';
      updateData.email = req.body.email || '';
      updateData.message = req.body.message || '';
      updateData.purpose = req.body.purpose || '';
      updateData.termsAccepted = req.body.termsAccepted === 'true' || req.body.termsAccepted === true;
    }

    console.log('Update data:', updateData);

    const updatedLead = await Lead.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedLead) return res.status(404).json({ message: 'Lead not found' });
    
    console.log('Lead updated successfully:', updatedLead);
    res.json({ message: 'Lead updated', lead: updatedLead });
  } catch (error) {
    console.error('Error updating lead:', error);
    res.status(500).json({ message: 'Error updating lead', error: error.message });
  }
};

export const deleteLead = async (req, res) => {
  try {
    const deletedLead = await Lead.findByIdAndDelete(req.params.id);
    if (!deletedLead) return res.status(404).json({ message: 'Lead not found' });
    res.json({ message: 'Lead deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting lead', error: error.message });
  }
};
