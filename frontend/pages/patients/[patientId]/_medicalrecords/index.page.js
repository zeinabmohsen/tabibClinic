import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMedicalRecordsByPatientId } from "../../../../actions/MedicalRecordActions"

const MedicalRecordTable = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const patientId = router.query.patientId;

  const medicalRecords = useSelector(
    ({ MedicalRecordData }) => MedicalRecordData.patientMedicalRecords
  );

  useEffect(() => {
    dispatch(getMedicalRecordsByPatientId(patientId));
  }, [dispatch]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-20">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Patient
            </th>
            <th scope="col" className="px-6 py-3">
              Doctor
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              Attachment
            </th>
            <th scope="col" className="px-6 py-3">
              Notes
            </th>
          </tr>
        </thead>
        <tbody>
          {medicalRecords.map((record, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } border-b dark:bg-gray-800 dark:border-gray-700`}
            >
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {record.patient}
              </td>
              <td className="px-6 py-4">{record.doctor}</td>
              <td className="px-6 py-4">{record.date}</td>
              <td className="px-6 py-4">{record.title}</td>
              <td className="px-6 py-4">{record.attachment}</td>
              <td className="px-6 py-4">{record.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MedicalRecordTable;
