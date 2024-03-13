import { use, useEffect, useState } from "react";
import CreatePrescriptionModal from "../../../../../common/CreatPrescriptionModal";
import Modal from "../../../../../common/Modal";
import CreateInvoiceModal from "../../../../../common/EditInvoiceModal";
import { useRouter } from "next/router";

import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import MedicalRecordsPrintComponent from "./components/mrprint";
import FullMedicalRecordsPrintComponent from "./components/detailedmrprint/index.page";
import AddAttachementModal from "../../../../../common/AddAttachmentModal";

const Medicalrecords = ({
  data,
  selectedRecords,
  setSelectedRecords = () => {},
}) => {
  const router = useRouter();
  const componentRef = useRef();
  const fullRef = useRef();

  const [prescriptionModal, setPrescriptionModal] = useState(false);
  const [attachModal, setAttachModal] = useState(false);
  const [invoiceModal, setInvoiceModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handlePrescriptionModal = (record) => {
    setPrescriptionModal(true);
    setSelectedRecord(record);
    console.log(record);
  };

  const handleAttachModal = (record) => {
    setAttachModal(true);
    setSelectedRecord(record);
  };

  const handleInvoiceModal = (record) => {
    setInvoiceModal(true);
    setSelectedRecord(record);
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleFullPrint = useReactToPrint({
    content: () => fullRef.current,
  });

  return (
    <div className=" mx-auto w-11/12">
      <div style={{ display: "none" }}>
        <MedicalRecordsPrintComponent
          ref={componentRef}
          medicalRecords={selectedRecords}
        />
      </div>
      <div style={{ display: "none" }}>
        <FullMedicalRecordsPrintComponent
          ref={fullRef}
          medicalRecords={selectedRecords}
        />
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5"
            onClick={(e) => {
              if (selectedRecords.length === data.length) {
                setSelectedRecords([]);
              } else {
                setSelectedRecords(data.map((record) => record));
              }
            }}
            checked={selectedRecords.length === data.length}
          />
          <h1 className="text-3xl font-semibold">Medical Records</h1>
        </div>
        <div className="flex items-center gap-4">
          {selectedRecords.length > 0 && (
            <button
              onClick={handlePrint}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Print Medical Records
            </button>
          )}
          {selectedRecords.length > 0 && (
            <button
              onClick={handleFullPrint}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Print Detailed Medical Records
            </button>
          )}
        </div>
      </div>
      <div>
        {data.map((record, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-md p-6 mb-4 cursor-pointer"
            onClick={() => {
              router.push(
                `/patients/${router.query.patientId}/medicalrecords/${record._id}`
              );
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrescriptionModal(record._id);
                  }}
                  className="border border-black text-black font-bold py-1 px-2 rounded mr-2"
                >
                  Prescriptions
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAttachModal(record._id);
                  }}
                  className="border border-black text-black font-bold py-1 px-2 rounded"
                >
                  Attach
                </button>
              </div>
              <div>
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 mr-2"
                  id="attachCheckbox"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedRecords((prev) => {
                      if (prev.includes(record)) {
                        return prev.filter((item) => item !== record);
                      }
                      return [...prev, record];
                    });
                  }}
                  checked={selectedRecords?.includes(record)}
                />
              </div>
            </div>
            <div className="flex items-center mb-4">
              <div className="mr-4">
                <h2 className="text-xl font-semibold">Record #{index + 1}</h2>
                <h3 className="text-gray-500">
                  {record?.date.toString().slice(0, 10)}
                </h3>
              </div>
              <p className="flex-1 text-gray-700">
                <span className="font-semibold">Title:</span> {record?.title}
                {record?.description && (
                  <p>
                    <span className="font-semibold">Description:</span>{" "}
                    {record?.description}
                  </p>
                )}
              </p>
            </div>
            <hr className="my-4" />
            <div className="flex items-center justify-between">
              <button className="border border-black text-black font-bold py-1 px-2 rounded mr-2">
                {record?.fees ? `Fees: ${record?.fees}` : "No fees associated"}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleInvoiceModal(record._id);
                }}
                className="border border-black text-black font-bold py-1 px-2 rounded"
              >
                Create Invoice
              </button>
            </div>
            <p className="mt-4 text-gray-700">{record?.notes}</p>
          </div>
        ))}
      </div>
      <Modal
        active={prescriptionModal}
        setActive={setPrescriptionModal}
        title="Create Prescription"
        children={
          <CreatePrescriptionModal
            selectedRecord={selectedRecord}
            setPrescriptionModal={setPrescriptionModal}
          />
        }
      />
      <Modal
        active={attachModal}
        setActive={setAttachModal}
        title={`Attach Medical Record`}
        children={<AddAttachementModal 
          selectedRecord={selectedRecord}
          setAttachModal={setAttachModal}
        />}
      />
      <Modal
        active={invoiceModal}
        setActive={setInvoiceModal}
        title="Create Invoice"
        children={<CreateInvoiceModal />}
      />
    </div>
  );
};

export default Medicalrecords;
