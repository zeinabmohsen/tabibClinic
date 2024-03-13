import React, { useState } from "react";

function AddPrescriptionForm() {
  const [prescriptions, setPrescriptions] = useState([]); // Array of objects with { medication, dosage, instructions }
  const [newMedication, setNewMedication] = useState("");
  const [newDosage, setNewDosage] = useState("");
  const [newInstructions, setNewInstructions] = useState("");

  const handleAddMedication = () => {
    const newMedicationData = {
      medication: newMedication,
      dosage: newDosage,
      instructions: newInstructions,
    };
    setPrescriptions([...prescriptions, newMedicationData]); // Add new medication to list
    setNewMedication(""); // Clear form fields
    setNewDosage("");
    setNewInstructions("");
  };

  const handleRemoveMedication = (index) => {
    const updatedPrescriptions = prescriptions.filter((_, i) => i !== index);
    setPrescriptions(updatedPrescriptions);
  };

  const handlePrint = () => {
    // Create a printable document
    const printDocument = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Prescription Form</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css">
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
          }
  
          @page {
            size: A5;
            margin: 20mm; /* Set margin for A5 paper */
          }
  
          .header-space {
            height: 130px; 
          }
  
          .footer-space {
            height: 20px; 
          }
  
          .container {
            max-width: 420px; /* A5 width */
            margin: 0 auto;
            padding: 20px;
          }
  
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 1px;
          }
  
          .credentials {
            text-align: right;
          }
  
          .section {
            margin-bottom: 20px;
          }
  
          .med-item {
            border-bottom: 1px solid #ddd;
            padding-bottom: 1px;
          }

  
          .signature {
            padding-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="header-space"></div>
        <div class="container">
          <div class="header">
          </div>
          <div class="section">
            <ul class="med-list">
              ${prescriptions
                .map(
                  (medication, index) => `
                    <li class="med-item">
                      <strong>Medication:</strong> ${medication.medication}<br />
                      <strong>Dosage:</strong> ${medication.dosage}<br />
                      <strong>Instructions:</strong> ${medication.instructions}
                    </li>`
                )
                .join("")}
            </ul>
          </div>
          <div class="footer-space"></div>
          <div class="signature">
          </div>
        </div>
      </body>
      </html>
    `;
  
    // Open a new window with the printable document
    const win = window.open("", "_blank");
    win.document.write(printDocument);
    win.document.close();
  
    // Directly open print dialog
    win.print();
  };
  

  return (
    <div className="bg-white rounded-lg shadow-md p-4 my-4">
      <h2 className="text-lg font-semibold text-gray-900 text-center">
        Add Prescriptions
      </h2>
      <div className="mt-4">
        {prescriptions.length > 0 && (
          <ul className="list-none px-2">
            {prescriptions.map((medication, index) => (
              <li
                key={index}
                className="flex items-center justify-between py-2 border-b"
              >
                <span className="flex-grow mr-4">
                  {medication.medication} ({medication.dosage})
                </span>
                <span>{medication.instructions}</span>
                <button
                  type="button"
                  className="text-red-500 hover:underline ml-2"
                  onClick={() => handleRemoveMedication(index)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <form className="mt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-700">
              Medication:
            </label>
            <input
              type="text"
              className="px-3 py-2 rounded-md border focus:outline-none focus:ring-2"
              value={newMedication}
              onChange={(event) => setNewMedication(event?.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-700">
              Dosage:
            </label>
            <input
              type="text"
              className="px-3 py-2 rounded-md border focus:outline-none focus:ring-2"
              value={newDosage}
              onChange={(event) => setNewDosage(event?.target.value)}
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="mb-2 text-sm font-medium text-gray-700">
            Instructions:
          </label>
          <textarea
            className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2"
            rows="5"
            value={newInstructions}
            onChange={(event) => setNewInstructions(event?.target.value)}
          />
        </div>
        <div className="flex justify-end mt-4">
          <button
            type="button"
            className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2"
            onClick={handleAddMedication}
          >
            Add Medication
          </button>
        </div>
      </form>
      <div className="flex justify-end mt-4">
        <button
          type="button"
          className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 mr-2"
          onClick={handlePrint}
        >
          Print Prescriptions
        </button>
      </div>
    </div>
  );
}
export default AddPrescriptionForm;
