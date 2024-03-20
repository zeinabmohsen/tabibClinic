import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAttachmentFromRecord,
  deleteMedicalRecord,
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

  useEffect(() => {
    dispatch(getMedicalRecordById(medicalrecordId));
  }, [dispatch, medicalrecordId]);

  useEffect(() => {
    setMedicalRecord(data);
  }, [data]);

  const handleDeleteRecord = () => {
    dispatch(deleteMedicalRecord(medicalrecordId));
    router.push(`/patients/${patientId}`);
  };

  const handleDeleteAttachment = (attachmentId) => {
    dispatch(deleteAttachmentFromRecord(medicalrecordId, attachmentId));
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
          {isEditing && (
            <div
              className="text-red-500 hover:text-red-700 cursor-pointer ml-2 text-xl inline-block"
              onClick={handleDeleteRecord}
            >
              <FontAwesomeIcon icon={faTrash} />
            </div>
          )}
        </h2>
        {medicalRecord?.doctor && (
          <div className="flex items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-800">Doctor:</h3>
            <span className="ml-4 text-gray-800">
              {medicalRecord?.doctor?.firstName}{" "}
              {medicalRecord?.doctor?.lastName}
            </span>
          </div>
        )}
        <div className="flex items-center mb-3">
          <h3 className="text-lg font-semibold text-gray-800">Patient:</h3>
          <span className="ml-4 text-gray-800">
            {medicalRecord?.patient?.firstName}{" "}
            {medicalRecord?.patient?.lastName}
          </span>
        </div>
        <div className="flex items-center mb-3">
          <h3 className="text-lg font-semibold text-gray-800">File Number:</h3>
          <span className="ml-4 text-gray-800">
            {medicalRecord?.patient?.fileNumber}
          </span>
        </div>
        <div className="flex items-center mb-3">
          <h3 className="text-lg font-semibold text-gray-800">Phone:</h3>
          <span className="ml-4 text-gray-800">
            {medicalRecord?.patient?.phone}
          </span>
        </div>
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
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-gray-800">Fees:</h3>
            <input
              className="w-24 border rounded-md py-1 px-2"
              value={medicalRecord?.fees}
              onChange={(e) =>
                setMedicalRecord({ ...medicalRecord, fees: e.target.value })
              }
              disabled={!isEditing}
            />
          </div>
          <div className=" flex flex-col mb-3">
            <h3 className="text-lg font-semibold text-gray-800">Notes:</h3>
            <textarea
              className="border rounded-md p-2 w-1/3"
              value={medicalRecord?.notes}
              onChange={(e) =>
                setMedicalRecord({
                  ...medicalRecord,
                  notes: e.target.value,
                })
              }
              disabled={!isEditing}
            />
          </div>
          {medicalRecord?.attachments?.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Attachments:
              </h3>
              <ul className="list-disc pl-6">
                {medicalRecord?.attachments.map((attachment) => (
                  <li
                    key={attachment._id}
                    className="text-blue-500 hover:underline cursor-pointer hover:underline flex items-center"
                    onClick={() =>
                      window.open(
                        `${process.env.NEXT_PUBLIC_API_BASE_URL}/${
                          attachment?.url ? attachment.url : attachment
                        }`,
                        "_blank",
                        "noopener,noreferrer"
                      )
                    }
                  >
                    {attachment.url
                      ? attachment?.url?.split("\\")[1]
                      : "Attachment"}{" "}
                    {isEditing && (
                      <div
                        className="ml-2 text-red-500 hover:text-red-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteAttachment(attachment._id);
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

          {medicalRecord.prescriptions?.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Prescriptions:
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
