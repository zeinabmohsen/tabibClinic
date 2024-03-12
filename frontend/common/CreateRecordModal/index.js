import React from "react";
import { useState } from "react";
import Input from "../Input";
import { useSelector } from "react-redux";

export default function CreatePrescriptionModal() {
  const doctors = useSelector(({ DoctorData }) => DoctorData?.allDoctors?.data);
  const patient = useSelector(
    ({ PatientData }) => PatientData?.selectedPatient?.data
  );

  const [formData, setFormData] = useState({
    title: "",
    doctor: doctors[0]?.id,
    patient: patient?.id,
    Attachments: [
      {
        file: "",
        name: "",
        type: "",
        size: "",
      },
    ],
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="title">Title</label>
          <Input
            type="text"
            id="title"
            className="border border-gray-300 rounded-lg"
            value={formData.title}
            setValue={() => {
              setFormData({ ...formData, title: formData.title });
            }}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="doctor">Doctor:</label>
          <select
            id="doctor"
            value={formData.doctor}
            onChange={(e) =>
              setFormData({ ...formData, doctor: e.target.value })
            }
            required
            className="w-full border  border-gray-300 rounded p-2 focus:outline-none focus:border-indigo-900"
          >
            {doctors.map((doctor) => (
              <option value={doctor?._id}>
                {doctor?.firstName} {doctor?.lastName}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="patient">Patient:</label>
          <Input
            id="patient"
            value={
              patient?.firstName && patient?.lastName
                ? `${patient?.firstName} ${patient?.lastName}`
                : ""
            }
            disabled
            required
            className="w-full border  border-gray-300 rounded p-2 focus:outline-none focus:border-indigo-900"
          />
        </div>
      </div>

      <div class="flex items-center justify-center w-full">
        <label
          for="dropzone-file"
          class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-bray-800 bg-gray-700 hover:bg-gray-100 border-gray-600 hover:border-gray-500 hover:bg-gray-600"
        >
          <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span class="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input id="dropzone-file" type="file" class="hidden" />
        </label>
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-indigo-900 text-white rounded hover:bg-indigo-800 focus:outline-none focus:bg-indigo-800 w-full"
      >
        Create
      </button>
    </div>
  );
}
