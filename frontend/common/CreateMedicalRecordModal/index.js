import { useCallback, useState } from "react";
import Input from "../Input";
import { useDispatch, useSelector } from "react-redux";
import { createMedicalRecord } from "../../actions/MedicalRecordActions";
import { useRouter } from "next/router";
import Dropdown from "../Dropdown";

const CreateMedicalRecordModal = ({ setMRModal = () => {} }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector(({ UserData }) => UserData?.data);

  const patientId = router.query.patientId;

  const patient = useSelector(
    ({ PatientData }) => PatientData?.selectedPatient?.data
  );

  const allDoctors = useSelector(({ DoctorData }) => DoctorData?.allDoctors);

  const [mrData, setMRData] = useState({
    title: "",
    description: "",
    doctor: user.role === "doctor" ? user._id : allDoctors.data[0]?._id,
  });

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      await dispatch(createMedicalRecord(patientId, { ...mrData }));
      setMRModal(false);
    },
    [dispatch, mrData, patientId, setMRModal]
  );

  return (
    <form
      className="invoice-form gap-4"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label mb-3">
          Doctor
        </label>
        <div className="flex justify-center w-50 mx-auto mb-3 ">
          <Dropdown
            disabled={user.role === "doctor" ? true : false}
            value={
              mrData.doctor
                ? {
                    label:
                      allDoctors.data.find(
                        (doctor) => doctor?._id === mrData.doctor
                      )?.firstName +
                      " " +
                      allDoctors.data.find(
                        (doctor) => doctor?._id === mrData.doctor
                      )?.lastName,
                    value: mrData.doctor,
                  }
                : null
            }
            values={allDoctors.data.map((doctor) => ({
              label: doctor?.firstName + " " + doctor?.lastName,
              value: doctor?._id,
            }))}
            setValue={(selectedValue) =>
              setMRData({
                ...mrData,
                doctor: selectedValue,
              })
            }
          />
        </div>
      </div>
      <div className="form-group mb-2">
        <label htmlFor="paymentStatus">Patient:</label>
        <Input
          value={
            patient?.firstName + " " + patient?.lastName
              ? patient?.firstName + " " + patient?.lastName
              : ""
          }
          disabled={true}
        />
      </div>
      <div className="form-group mb-2">
        <label htmlFor="paymentStatus">Title:</label>
        <Input
          value={mrData.title}
          setValue={(value) => setMRData({ ...mrData, title: value })}
        />
      </div>
      <div className="form-group mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 "
        >
          Description:
        </label>
        <textarea
          id="description"
          className="form-textarea mt-1 block w-full border border-gray-300 rounded-md p-4 focus:border-none focus:ring-0 "
          rows="4"
          value={mrData.description}
          onChange={(e) =>
            setMRData({ ...mrData, description: e.target.value })
          }
          placeholder="Enter description here..."
        />
      </div>

      <button
        type="submit"
        className="mt-6 px-4 py-2 bg-indigo-900 text-white rounded hover:bg-indigo-800 focus:outline-none focus:bg-indigo-800 w-full"
      >
        Create Medical Record
      </button>
    </form>
  );
};

export default CreateMedicalRecordModal;
