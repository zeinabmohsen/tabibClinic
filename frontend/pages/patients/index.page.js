import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPatients } from "../../actions/PatientActions";
import Modal from "../../common/Modal";
import CreatePatientModal from "../../common/CreatePatientModal";

const PatientsTable = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [search, setSearch] = useState("");
  const user = useSelector(({ UserData }) => UserData.data);
  const allPatients = useSelector(
    ({ PatientData }) => PatientData?.allPatients?.data
  );

  useEffect(() => {
    dispatch(getAllPatients(search));
  }, [dispatch, search]);

  return (
    <div className="flex flex-col w-full justify-end overflow-x-auto sm:rounded-lg mt-20">
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center">
          {/* Button 2 */}
          {(user.role === "admin" || user.role === "secretary") && (
            <button
              onClick={() => setModal(true)}
              className="p-4 ml-5 bg-white dark:bg-gray-800 dark:text-white shadow-md sm:rounded-lg  text-nowrap"
            >
              Create Patient
            </button>
          )}
        </div>
        <div className="flex items-center w-1/3">
          <input
            type="text"
            placeholder="Search for patient"
            className="p-3 w-full bg-white dark:bg-gray-800 dark:text-white shadow-md sm:rounded-lg"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
      </div>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 shadow-md">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Patient
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Phone
            </th>
            <th scope="col" className="px-6 py-3">
              Gender
            </th>
            <th scope="col" className="px-6 py-3">
              City
            </th>
            <th scope="col" className="px-6 py-3">
              Notes
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(allPatients) &&
            allPatients.map((patient, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } border-b dark:bg-gray-800 dark:border-gray-700
                hover:bg-gray-100 dark:hover:bg-gray-600 hover:border-gray-200 dark:hover:border-gray-500 cursor-pointer
                `}
                onClick={() => router.push(`/patients/${patient._id}`)}
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {patient.firstName} {patient.lastName}
                </td>
                <td className="px-6 py-4">{patient.email}</td>
                <td className="px-6 py-4">{patient.phone}</td>
                <td className="px-6 py-4">{patient.gender}</td>
                <td className="px-6 py-4">{patient.city}</td>
                <td className="px-6 py-4"></td>
              </tr>
            ))}
        </tbody>
      </table>
      <Modal
        active={modal}
        setActive={setModal}
        title="Create Patient"
        children={<CreatePatientModal open={modal} setOpen={setModal} />}
      />
    </div>
  );
};

export default PatientsTable;
