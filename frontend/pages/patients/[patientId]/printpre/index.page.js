import React, { useState } from "react";

function AddPrescriptionForm() {
  const [prescriptions, setPrescriptions] = useState([]); // Array of objects with { medication, dosage, instructions }
  const [newMedication, setNewMedication] = useState("");
  const [newDosage, setNewDosage] = useState("");
  const [newInstructions, setNewInstructions] = useState("");
  const [editModeIndex, setEditModeIndex] = useState(null);

  const handleAddMedication = () => {
    if (editModeIndex !== null) {
      const updatedPrescriptions = prescriptions.map((prescription, index) =>
        index === editModeIndex
          ? {
              medication: newMedication,
              dosage: newDosage,
              instructions: newInstructions,
            }
          : prescription
      );
      setPrescriptions(updatedPrescriptions);
      setEditModeIndex(null);
    } else {
      const newMedicationData = {
        medication: newMedication,
        dosage: newDosage,
        instructions: newInstructions,
      };
      setPrescriptions([...prescriptions, newMedicationData]); // Add new medication to list
    }
    setNewMedication(""); // Clear form fields
    setNewDosage("");
    setNewInstructions("");
  };

  const handleRemoveMedication = (index) => {
    const updatedPrescriptions = prescriptions.filter((_, i) => i !== index);
    setPrescriptions(updatedPrescriptions);
  };

  const handleEditMedication = (index) => {
    const medication = prescriptions[index];
    setNewMedication(medication.medication);
    setNewDosage(medication.dosage);
    setNewInstructions(medication.instructions);
    setEditModeIndex(index);
  };

  const handlePrint = () => {


    // Function to convert number to Roman numeral
    const toRoman = (num) => {
        const romanNumerals = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
        return romanNumerals[num];
    };

    // Create a printable document
    const printDocument = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Prescription Form</title>
            <style>
            @media print {
                body {
                    font-family: Arial, sans-serif;
                    background-image: url('/images/presc.jpg');
                    background-size: 559px 793px; /* Set background size to A5 dimensions */
                    background-repeat: no-repeat;
                    margin: 0;
                    padding: 0;
                }
                @page {
                    size: A5;
                    margin: 0;
                }
                .container {
                    margin-top: 200px;
                    margin-left: 20px; 
                }
            </style>
        </head>
        <body>
        <div class="container">
        <p>Please</p>
        
            ${prescriptions
                .map((medication, index) => `
                    <div>
                        <p> ${toRoman(index + 1)}: ${medication.medication}  ${medication.dosage ? `,( ${medication.dosage} )` : ''}</p>
                            ${medication.instructions ? ` ${medication.instructions} ` : ''}
                    </div>
                `)
                .join("")}
        </div>
        <script>
            function handleEdit(index) {
                window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'edit', index: index }));
            }
            function handleRemove(index) {
                window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'remove', index: index }));
            }
        </script>
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
                <button
                  type="button"
                  className="text-blue-500 hover:underline ml-2"
                  onClick={() => handleEditMedication(index)}
                >
                  Edit
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
            {editModeIndex !== null ? "Save Changes" : "Add Medication"}
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
