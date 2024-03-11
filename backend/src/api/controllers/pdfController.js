const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const MedicalRecord = require('../models/medicalRecords');
const Prescription = require('../models/prescriptionSchema'); 


const createMedicalRecord = async (req, res) => {
    try {
      const { patientId } = req.params;
      const { title, description } = req.body;
      const { doctorId } = req.body;
  
      // Check if title and description are provided
      if (!title || !description) {
        return res.status(400).json({ message: 'Title and description are required' });
      }
  
      // Create a new PDF document
      const doc = new PDFDocument();
      const filename = `records-${uuidv4()}-${Date.now()}.pdf`;
  
      // Set the path for saving the PDF file
      const filePath = path.join(__dirname, "../../../uploads/records/", filename);
  
      // Pipe the PDF content to a writable stream
      const pdfStream = fs.createWriteStream(filePath);
  
      // Add content to the PDF document
      doc.pipe(pdfStream);
      doc.fontSize(16).text('TabibClinic Medical Record', { align: 'center' });
      doc.moveDown();
      doc.fontSize(12).text(`Title: ${title}`);
      doc.fontSize(10).text(`Description: ${description}`);
      doc.fontSize(8).text(`Doctor ID: ${doctorId}`);
      doc.end();
  
      // Save medical record data to the database
      const newMedicalRecord = await MedicalRecord.create({
        patient: patientId,
        title,
        doctor: doctorId,
        attachment: filePath,
        description,
      });
  
      // Respond with a success message
      return res.status(201).json(newMedicalRecord);
    } catch (error) {
      console.error('Error creating medical record:', error);
      return res.status(500).json({ message: 'Server Error' });
    }
  };
  

  const createPrescription = async (req, res) => {
    try {
      const { patientId } = req.params;
      const { medication, dosage, instructions, title } = req.body;
  
      // Check if medication and title are provided
      if (!medication || !title) {
        return res.status(400).json({ message: 'Medication and title are required' });
      }
  
      // Create a new PDF document
      const doc = new PDFDocument();
      const filename = `prescription-${uuidv4()}.pdf`;
  
      // Set the path for saving the PDF file
      const filePath = path.join(__dirname, '../../../uploads/prescription/', filename);
  
      // Pipe the PDF content to a writable stream
      const pdfStream = fs.createWriteStream(filePath);
  
      // Add content to the PDF document
      doc.pipe(pdfStream);
      doc.fontSize(16).text('TabibClinic Prescription', { align: 'center' });
      doc.moveDown();
      doc.fontSize(12).text(`Title: ${title}`);
      doc.fontSize(10).text(`Medication: ${medication}`);
      doc.fontSize(10).text(`Dosage: ${dosage}`);
      doc.fontSize(10).text(`Instructions: ${instructions}`);
      doc.end();
  
      // Save prescription data to the database
      const newPrescription = await Prescription.create({
        patient: patientId,
        medication: medication,
        dosage: dosage,
        title: title,
        instructions: instructions,
        attachment: filePath
      });
  
      // Respond with a success message
      return res.status(201).json(newPrescription);
    } catch (error) {
      console.error('Error creating prescription:', error);
      return res.status(500).json({ message: 'Server Error' });
    }
  };
  


module.exports = { createMedicalRecord , createPrescription};



