import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMedicalRecordById,
  updateMedicalRecord,
} from "../../../../../actions/MedicalRecordActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { deletePrescription } from "../../../../../actions/PrescriptionActions";

const MedicalRecordDetails = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { patientId, medicalrecordId } = router.query;
  const data = useSelector(
    ({ MedicalRecordData }) => MedicalRecordData.selectedMedicalRecord
  );

  const [isEditing, setIsEditing] = useState(false);
  const [medicalRecord, setMedicalRecord] = useState();

  const handleSave = useCallback(async () => {
    await dispatch(updateMedicalRecord(medicalrecordId, { ...medicalRecord }));
    setIsEditing(false);
  }, [dispatch, medicalrecordId, medicalRecord]);

  useEffect(() => {
    console.log(medicalRecord);
  }, [medicalRecord]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  // const handlePrint = () => {
  //   const {
  //     doctorName,
  //     patientName,
  //     date,
  //     notes,
  //     prescriptions,
  //     attachments,
  //     description,
  //     fees,
  //   } = medicalRecord;
  //   console.log(data);

  //   const win = window.open("", "_blank");
  //   win.document.write(printDocument);
  //   win.document.close();
  //   win.print();
  // };

  useEffect(() => {
    dispatch(getMedicalRecordById(medicalrecordId));
  }, [dispatch, medicalrecordId]);

  useEffect(() => {
    setMedicalRecord(data);
  }, [data]);

  const handleDeleteAttachment = (attachmentId) => {
    setMedicalRecord({
      ...medicalRecord,
      attachments: medicalRecord.attachments.filter(
        (attachment) => attachment._id !== attachmentId
      ),
    });
  };

  const handleDeletePrescription = useCallback(
    async (prescriptionId) => {
      dispatch(deletePrescription(prescriptionId));
    },
    [dispatch]
  );

  if (!medicalRecord) return null;
  else
    return (
      <div className="bg-white rounded-md shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Medical Record Details
        </h2>
        <div className="flex items-center mb-3">
          <h3 className="text-lg font-semibold text-gray-800">Date:</h3>
          <span className="ml-4 text-gray-800">
            {medicalRecord?.date?.toString().slice(0, 10)}
          </span>
        </div>
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-800">Description:</h3>
          <textarea
            rows="4"
            className="w-full border rounded-md p-2"
            value={medicalRecord?.description}
            onChange={(e) =>
              setMedicalRecord({
                ...medicalRecord,
                description: e.target.value,
              })
            }
            disabled={!isEditing}
          />
        </div>
        <div className="space-y-4">
          {medicalRecord?.attachments?.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Attachments:
              </h3>
              <ul className="list-disc pl-6">
                {medicalRecord?.attachments.map((attachment) => (
                  <li
                    key={attachment._id}
                    className="text-blue-500 hover:underline"
                    onClick={() =>
                      window.open(
                        `${process.env.NEXT_PUBLIC_API_BASE_URL}/${attachment}`,
                        "_blank",
                        "noopener,noreferrer"
                      )
                    }
                  >
                    {attachment.split("\\")[1]}
                    {isEditing && (
                      <div
                        className="ml-2 text-red-500 hover:text-red-700"
                        onClick={() => handleDeleteAttachment(attachment._id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {medicalRecord.prescriptions?.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Prescriptions:
                {console.log(medicalRecord.prescriptions)}
              </h3>
              <ul className="list-disc pl-6">
                {medicalRecord?.prescriptions?.map((prescription, index) => (
                  <li
                    key={prescription._id}
                    className="text-blue-500 hover:underline cursor-pointer hover:underline flex items-center"
                    onClick={() =>
                      window.open(
                        `${process.env.NEXT_PUBLIC_API_BASE_URL}/${prescription?.attachment}`,
                        "_blank",
                        "noopener,noreferrer"
                      )
                    }
                  >
                    {index + 1}- {prescription?.title}
                    {isEditing && (
                      <div
                        className="ml-2 text-red-500 hover:text-red-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeletePrescription(prescription._id);
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex items-center">
            <h3 className="text-lg font-semibold text-gray-800">Fees:</h3>
            <input
              className="ml-4 w-24 border rounded-md py-1 px-2"
              value={medicalRecord?.fees}
              onChange={(e) =>
                setMedicalRecord({ ...medicalRecord, fees: e.target.value })
              }
              disabled={!isEditing}
            />
          </div>

          <div className="flex justify-end">
            {!isEditing ? (
              <button
                className="bg-gray-800 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 mr-2"
                onClick={handleEdit}
              >
                Edit
              </button>
            ) : (
              <>
                <button
                  className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 mr-2"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  className="bg-gray-500 text-white font-semibold py-2 px-4 rounded hover:bg-gray-600 mr-2"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </>
            )}
            {/* <button
              className="bg-gray-500 text-white font-semibold py-2 px-4 rounded hover:bg-gray-600 mr-2"
              onClick={handlePrint}
            >
              Print
            </button> */}
          </div>
        </div>
      </div>
    );
};

export default MedicalRecordDetails;
