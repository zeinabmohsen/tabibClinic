import { useCallback, useEffect, useState } from "react";
import Input from "../Input";
import { useDispatch, useSelector } from "react-redux";
import { createPatient } from "../../actions/PatientActions";
import styles from "./styles/index.module.scss";
import Dropdown from "../Dropdown";
import { getAllDoctors } from "../../actions/DoctorActions";

export default function CreatePatientModal({ open, setOpen }) {
  const dispatch = useDispatch();

  const allDoctors = useSelector(({ DoctorData }) => DoctorData.allDoctors);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    motherName: "",
    phone: "",
    dob: "",
    city: "",
    gender: "male",
    secondPhone: "",
    insurance: "",
    weight: "",
    drugHistory: "",
    surgicalHistory: "",
    pastMedicalHistory: "",
    doctors: allDoctors.data[0]?._id,
    referringPhysicians: null,
  });

  const create = useCallback(async () => {
    await dispatch(createPatient(formData));
    setOpen(false);
  }, [dispatch, formData]);

  useEffect(() => {
    dispatch(getAllDoctors());
  }, [dispatch]);

  return (
    <div className={open ? styles.modalOpen : styles.modalClosed}>
      <div className={styles.modalContent}>
        <form
          className="invoice-form gap-4 flex flex-col"
          onSubmit={(e) => {
            e.preventDefault();
            create();
          }}
        >
          <div className={styles.container}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-4 justify-between">
                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="title">First Name</label>
                  <Input
                    type="text"
                    id="title"
                    className="border border-gray-300 rounded-lg"
                    value={formData.firstName}
                    setValue={(value) => {
                      setFormData((prev) => ({
                        ...prev,
                        firstName: value,
                      }));
                    }}
                  />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="title">Middle Name</label>
                  <Input
                    type="text"
                    id="title"
                    className="border border-gray-300 rounded-lg"
                    value={formData.middleName}
                    setValue={(value) => {
                      setFormData((prev) => ({
                        ...prev,
                        middleName: value,
                      }));
                    }}
                  />
                </div>
              </div>
              <div className="flex gap-4 justify-between">
                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="title">Last Name</label>
                  <Input
                    type="text"
                    id="title"
                    className="border border-gray-300 rounded-lg"
                    value={formData.lastName}
                    setValue={(value) => {
                      setFormData((prev) => ({
                        ...prev,
                        lastName: value,
                      }));
                    }}
                  />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="title">Mother's Name</label>
                  <Input
                    type="text"
                    id="title"
                    className="border border-gray-300 rounded-lg"
                    value={formData.motherName}
                    setValue={(value) => {
                      setFormData((prev) => ({
                        ...prev,
                        motherName: value,
                      }));
                    }}
                  />
                </div>
              </div>
              <div className="flex gap-4 justify-between">
                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="title">Phone</label>
                  <Input
                    type="text"
                    id="title"
                    className="border border-gray-300 rounded-lg"
                    value={formData.phone}
                    setValue={(value) => {
                      setFormData((prev) => ({
                        ...prev,
                        phone: value,
                      }));
                    }}
                  />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="title">Secondary Phone</label>
                  <Input
                    type="text"
                    id="title"
                    className="border border-gray-300 rounded-lg"
                    value={formData.secondPhone}
                    setValue={(value) => {
                      setFormData((prev) => ({
                        ...prev,
                        secondPhone: value,
                      }));
                    }}
                  />
                </div>
              </div>
              <div className="flex gap-4 justify-between">
                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="title">Insurance</label>
                  <Input
                    type="text"
                    id="title"
                    className="border border-gray-300 rounded-lg"
                    value={formData.insurance}
                    setValue={(value) => {
                      setFormData((prev) => ({
                        ...prev,
                        insurance: value,
                      }));
                    }}
                  />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="title">Weight</label>
                  <Input
                    type="number"
                    id="title"
                    className="border border-gray-300 rounded-lg"
                    value={formData.weight}
                    setValue={(value) => {
                      setFormData((prev) => ({
                        ...prev,
                        weight: value,
                      }));
                    }}
                  />
                </div>
              </div>
              <div className="flex gap-4 justify-between">
                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="title">Primary Doctor</label>
                  <Dropdown
                    value={
                      formData.doctors
                        ? {
                            label:
                              allDoctors.data.find(
                                (doctor) => doctor?._id === formData.doctors
                              )?.firstName +
                              " " +
                              allDoctors.data.find(
                                (doctor) => doctor?._id === formData.doctors
                              )?.lastName,
                            value: formData.doctors,
                          }
                        : null
                    }
                    values={allDoctors.data.map((doctor) => ({
                      label: doctor?.firstName + " " + doctor?.lastName,
                      value: doctor?._id,
                    }))}
                    setValue={(selectedValue) =>
                      setFormData({
                        ...formData,
                        doctors: selectedValue,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="title">Secondary Doctors</label>
                  <Dropdown
                    value={
                      formData.referringPhysicians
                        ? {
                            label:
                              allDoctors.data.find(
                                (doctor) =>
                                  doctor?._id === formData.referringPhysicians
                              )?.firstName +
                              " " +
                              allDoctors.data.find(
                                (doctor) =>
                                  doctor?._id === formData.referringPhysicians
                              )?.lastName,
                            value: formData.referringPhysicians,
                          }
                        : null
                    }
                    values={allDoctors.data.map((doctor) => ({
                      label: doctor?.firstName + " " + doctor?.lastName,
                      value: doctor?._id,
                    }))}
                    setValue={(selectedValue) =>
                      setFormData({
                        ...formData,
                        referringPhysicians: selectedValue,
                      })
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="title">City</label>
                <Input
                  type="text"
                  id="title"
                  className="border border-gray-300 rounded-lg"
                  value={formData.city}
                  setValue={(value) => {
                    setFormData((prev) => ({
                      ...prev,
                      city: value,
                    }));
                  }}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="title">Drug History</label>
                <textarea
                  className="border border-gray-300 rounded-lg h-20"
                  value={formData.drugHistory}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      drugHistory: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="title">Surgical History</label>
                <textarea
                  className="border border-gray-300 rounded-lg h-20"
                  value={formData.surgicalHistory}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      surgicalHistory: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="title">Past Medical History</label>
                <textarea
                  className="border border-gray-300 rounded-lg h-20"
                  value={formData.pastMedicalHistory}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      pastMedicalHistory: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className={styles.row}>
                  <div className={styles.dob}>
                    <h4>Date of Birth</h4>
                  </div>
                  <p>
                    <Input
                      type="date"
                      value={
                        formData?.dob?.toString().slice(0, 10) ||
                        new Date().toISOString().slice(0, 10)
                      }
                      placeholder=""
                      setValue={(value) => {
                        setFormData((prev) => ({
                          ...prev,
                          dob: value,
                        }));
                      }}
                    />
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <h4>Gender</h4>
                <div className={styles.gender}>
                  <input
                    type="radio"
                    name="gender"
                    id="male"
                    value="male"
                    checked={formData.gender === "male"}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        gender: e.target.value,
                      }));
                    }}
                  />
                  <label htmlFor="male">Male</label>
                  <input
                    type="radio"
                    name="gender"
                    id="female"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        gender: e.target.value,
                      }));
                    }}
                  />
                  <label htmlFor="female">Female</label>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-900 text-white rounded hover:bg-indigo-800 focus:outline-none focus:bg-indigo-800 w-full mt-auto"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
