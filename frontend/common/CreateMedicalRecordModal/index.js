import { useCallback, useState } from "react";
import Input from "../Input";
import { useDispatch, useSelector } from "react-redux";
import { createMedicalRecord } from "../../actions/MedicalRecordActions";
import { useRouter } from "next/router";

const CreateMedicalRecordModal = ({ setMRModal = () => {} }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const patientId = router.query.patientId;

  const patient = useSelector(
    ({ PatientData }) => PatientData?.selectedPatient?.data
  );

  const [mrData, setMRData] = useState({
    title: "",
    description: "",
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
        <label htmlFor="amount">Description:</label>
        <Input
          value={mrData.description}
          setValue={(value) => setMRData({ ...mrData, description: value })}
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
