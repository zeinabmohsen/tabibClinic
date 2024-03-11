import styles from "./styles/index.module.scss";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDoctors } from "../../../actions/DoctorActions";
import Modal from "../../../common/Modal";
import InvoiceForm from "../../../common/EditInvoiceModal";
import { getAllPatients } from "../../../actions/PatientActions";
import { useRouter } from "next/router";
import Dropdown from "../../../common/Dropdown";
import {
  getClinicStatement,
  getInvoiceStatement,
} from "../../../actions/InvoiceActions";

const InvoiceStatement = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [userLoaded, setUserLoaded] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const user = useSelector(({ UserData }) => UserData.data);
  const doctors = useSelector(({ DoctorData }) => DoctorData.allDoctors?.data);

  const statementData = useSelector(
    ({ InvoiceData }) => InvoiceData.invoiceStatement?.data
  );
  const [formData, setFormData] = useState({
    selectedDoctor: 0,
    startDate: "",
    endDate: "",
  });
  const { selectedDoctor, startDate, endDate } = formData;

  const handleGetInvoices = useCallback(async () => {
    if (selectedDoctor === 0 || !selectedDoctor) {
      await dispatch(getClinicStatement({ startDate, endDate }));
    } else {
      await dispatch(
        getInvoiceStatement({
          ...formData,
          doctorId: selectedDoctor === 0 ? "" : selectedDoctor?._id,
        })
      );
    }
  }, [dispatch, formData]);

  useEffect(() => {
    dispatch(getAllDoctors());
    dispatch(getAllPatients());
  }, [dispatch]);

  useEffect(() => {
    if (userLoaded) {
      if (user?.role !== "admin" && user?.role !== "secretary") {
        router.push("/404");
      }
    }
  }, [userLoaded]);

  useEffect(() => {
    if (user?._id) {
      setUserLoaded(true);
    }
  }, [user]);

  const handlePrint = () => {
    // Create a printable document with modern design elements
    const printDocument = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invoice Statement</title>
        <style>
        /* Add CSS for ensuring content display on all pages */
        @page {
          size: A4; /* Set A4 paper size */
          margin: 0; /* Remove default margins for centering */
        }
      
        body {
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
        }
      
        .invoice-container {
          width: 100%; /* Adjust for preferred width within A4 */
          padding: 20px;
          box-sizing: border-box; /* Ensure padding is included in width calculation */
        }
      
        /* Add your existing styles here */
        /* Invoice header styles */
        .invoice-container header {
          text-align: center;
          margin-bottom: 20px;
        }
      
        .invoice-container h1 {
          font-size: 24px;
          margin-bottom: 10px;
        }
      
        .invoice-info {
          margin: 0;
          font-size: 14px;
        }
      
        /* Invoice table styles */
        .invoice-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
      
        .invoice-table th,
        .invoice-table td {
          padding: 8px 10px;
          border: 1px solid #ddd;
          text-align: left;
        }
      
        .invoice-table th {
          background-color: #f2f2f2;
          font-weight: 600;
        }
      
        .invoice-table tr:nth-child(even) {
          background-color: #f5f5f5;
        }
      
        .invoice-table .text-red-500 {
          color: #f54a4a;
        }
      
        /* Invoice totals styles */
        .invoice-totals {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          margin-top: 20px;
        }
      
        .total-item {
          margin-bottom: 10px;
          display: flex;
          justify-content: space-between;
        }
      
        .total-label {
          font-weight: 600;
        }
      
        .total-value {
          font-size: 18px;
          font-weight: bold;
        }
      
        @media print {
          .invoice-container {
            width: 100%;
            border: none;
          }
        }
      </style>
            </head>
      <body>
        <div class="invoice-container">
          <header>
            <h1>Invoice Statement</h1>
            <p class="invoice-info">
              <span>Doctor:</span> <span class="doctor-name">${
                selectedDoctor.firstName
              } ${selectedDoctor.lastName}</span>
              <span>Date Range:</span> <span class="date-range">${startDate} - ${endDate}</span>
            </p>
          </header>
  
          <table class="invoice-table">
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Doctor Amount</th>
                <th>Clinic Amount</th>
                <th>Amount</th>
                <th>Currency</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${statementData?.invoices
                ?.map(
                  (invoice) => `
              <tr>
                <td>${invoice?.patient?.firstName} ${
                    invoice?.patient?.lastName
                  }</td>
                <td>${invoice?.doctor?.firstName} ${
                    invoice?.doctor?.lastName
                  }</td>
                <td>${new Date(invoice?.date).toLocaleDateString()}</td>
                <td>${invoice?.doctorAmount}</td>
                <td>${invoice?.clinicAmount}</td>
                <td>${invoice?.amount}</td>
                <td>${invoice?.currency}</td>
                <td class="${
                  invoice?.paymentStatus === "Unpaid" ? "text-red-500" : ""
                }">
                  ${invoice?.paymentStatus}
                </td>
              </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
          <div class="total">
            <div>
              <span class="total-label">Total Doctor Amount:</span>
              <span class="total-value">${
                statementData?.doctorAmountTotal
              }</span>
            </div>
            <div>
              <span class="total-label">Total Clinic Amount:</span>
              <span class="total-value">${
                statementData?.clinicAmountTotal
              }</span>
            </div>
            <div>
              <span class="total-label">Total Amount:</span>
              <span class="total-value">${statementData?.overallTotal}</span>
            </div>
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
    <div
      className="sm:rounded-lg mt-20  p-4 flex flex-col  
    align-items-center justify-center w-full  
    "
    >
      <div className="flex justify-between align-items-center mb-4">
        {(user?.role === "admin" || user?.role === "secretary") && (
          <div className="flex items-center">
            <label className="mr-2">Doctor:</label>
            <Dropdown
              values={[
                {
                  value: 0,
                  label: "All",
                },
                ...doctors.map((doctor) => ({
                  value: doctor._id,
                  label: `${doctor.firstName} ${doctor.lastName}`,
                })),
              ]}
              value={
                selectedDoctor === "all" || selectedDoctor === 0
                  ? {
                      value: 0,
                      label: "All",
                    }
                  : selectedDoctor
                  ? {
                      value: selectedDoctor?._id,
                      label: `${selectedDoctor?.firstName} ${selectedDoctor?.lastName}`,
                    }
                  : null
              }
              setValue={(value) => {
                if (value === 0) {
                  setFormData({ ...formData, selectedDoctor: 0 });
                  return;
                } else {
                  const selectedDoctor = doctors.find(
                    (doctor) => doctor._id === value
                  );
                  setFormData({ ...formData, selectedDoctor });
                }
              }}
            />
          </div>
        )}
        <div className="flex items-center">
          <label className="mr-2">Start Date:</label>
          <input
            type="date"
            className="border rounded-md px-2 py-1"
            value={startDate}
            onChange={(e) =>
              setFormData({ ...formData, startDate: e.target.value })
            }
          />
        </div>
        <div className="flex items-center">
          <label className="mr-2">End Date:</label>
          <input
            type="date"
            className="border rounded-md px-2 py-1"
            value={endDate}
            onChange={(e) =>
              setFormData({ ...formData, endDate: e.target.value })
            }
          />
        </div>
        <button
          className="p-4 ml-5 bg-white dark:bg-gray-800 dark:text-white shadow-md sm:rounded-md px-5 py-1
            text-nowrap"
          onClick={handleGetInvoices}
        >
          Get All Invoices
        </button>
        <button
          className="p-4 ml-5 bg-white dark:bg-gray-800 dark:text-white shadow-md sm:rounded-md px-5 py-1
            text-nowrap"
          onClick={handlePrint}
        >
          Print
        </button>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
        {/* Table Headers */}
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Patient Name
            </th>
            <th scope="col" className="px-6 py-3">
              Doctor
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Doctor Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Clinic Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Currency
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
          </tr>
        </thead>
        {/* Table Body */}
        <tbody>
          {statementData?.invoices?.map((invoice, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400`}
            >
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {`${invoice?.patient?.firstName} ${invoice?.patient?.lastName}`}
              </td>
              <td className="px-6 py-4">
                {" "}
                {`${invoice?.doctor?.firstName} ${invoice?.doctor?.lastName}`}
              </td>
              <td className="px-6 py-4">
                {new Date(invoice?.date).toLocaleDateString()}
              </td>
              <td className="px-6 py-4">{invoice?.doctorAmount}</td>
              <td className="px-6 py-4">{invoice?.clinicAmount}</td>
              <td className="px-6 py-4">{invoice?.amount}</td>
              <td className="px-6 py-4">{invoice?.currency}</td>
              <td
                className={`px-6 py-4 
                ${invoice?.paymentStatus === "Unpaid" ? "text-red-500" : ""}
                `}
              >
                {invoice?.paymentStatus}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.total}>
        {(selectedDoctor || selectedDoctor !== 0) && user?.role === "admin" && (
          <div>
            {console.log("selectedDoctor", selectedDoctor)}
            <span className={styles.totalLabel}>Total Doctor Amount:</span>{" "}
            <span>
              $
              {statementData?.doctorAmountTotal
                ? statementData?.doctorAmountTotal
                : 0}
            </span>
          </div>
        )}
        <div>
          <span className={styles.totalLabel}>Total Clinic Amount:</span>{" "}
          <span>
            $
            {statementData?.clinicAmountTotal
              ? statementData?.clinicAmountTotal
              : 0}
          </span>
        </div>
        <div>
          <span className={styles.totalLabel}>Total Amount:</span>{" "}
          <span>
            ${statementData?.overallTotal ? statementData?.overallTotal : 0}
          </span>
        </div>
      </div>
    </div>
  );
};

export default InvoiceStatement;
