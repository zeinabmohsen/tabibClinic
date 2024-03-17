import { useCallback, useEffect, useState } from "react";
import styles from "./styles/index.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faPlusSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import Input from "../../../../../common/Input";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePatient,
  updatePatient,
} from "../../../../../actions/PatientActions";
import { useRouter } from "next/router";
import Dropdown from "../../../../../common/Dropdown";
import { getAllDoctors } from "../../../../../actions/DoctorActions";

const Patients = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [addActive, setAddActive] = useState(false);
  const [editActive, setEditActive] = useState(false);

  const selectedPatient = useSelector(
    ({ PatientData }) => PatientData?.selectedPatient?.data
  );

  const allDoctors = useSelector(({ DoctorData }) => DoctorData?.allDoctors);

  const [newPatientData, setNewPatientData] = useState(
    selectedPatient || {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      secondPhone: "",
      dob: "",
      city: "",
      allergies: "",
      notes: "",
      doctors: selectedPatient?.doctors,
      referringPhysicians: selectedPatient?.referringPhysicians,
    }
  );

  const update = useCallback(
    (id) => {
      dispatch(updatePatient(id, newPatientData));
    },
    [addActive, newPatientData]
  );

  useEffect(() => {
    dispatch(getAllDoctors());
  }, []);

  useEffect(() => {
    console.log("selectedPatient", newPatientData.doctors);
  }, [newPatientData]);

  return (
    <div className={styles.container}>
      <div className={styles.details}>
        {addActive || editActive ? (
          <div className={styles.actions}>
            <div
              className={styles.saveBtn}
              onClick={() => {
                setAddActive(false);
                setEditActive(false);
                editActive ? update(selectedPatient?._id) : null;
              }}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
              <p>Save</p>
            </div>
            <div
              className={styles.cancelBtn}
              onClick={() => {
                setAddActive(false);
                setEditActive(false);
              }}
            >
              <FontAwesomeIcon icon={faTrashCan} />
              <p>Cancel</p>
            </div>
          </div>
        ) : (
          <div className={styles.actions}>
            {/* <div
              className={styles.btn}
              onClick={() => {
                setAddActive(true);
              }}
            >
              <FontAwesomeIcon icon={faPlusSquare} />
              <p>Add</p>
            </div> */}
            <div
              className={styles.btn}
              onClick={() => {
                setEditActive(true);
              }}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
              <p>Edit</p>
            </div>
            <div
              className={styles.btn}
              onClick={async () => {
                await dispatch(deletePatient(selectedPatient?._id));
                router.push("/patients/");
              }}
            >
              <FontAwesomeIcon icon={faTrashCan} />
              <p>Delete</p>
            </div>
          </div>
        )}
        <h3>Details</h3>
        <div className={styles.detailsContent}>
          <div className={styles.row}>
            <h4>First Name</h4>
            <p>
              {addActive || editActive ? (
                <Input
                  type="text"
                  value={newPatientData.firstName || selectedPatient?.firstName}
                  placeholder=""
                  setValue={(value) => {
                    setNewPatientData((prev) => ({
                      ...prev,
                      firstName: value,
                    }));
                  }}
                />
              ) : (
                selectedPatient?.firstName
              )}
            </p>
          </div>
          <div className={styles.row}>
            <h4>Last Name</h4>
            <p>
              {addActive || editActive ? (
                <Input
                  type="text"
                  value={newPatientData.lastName || selectedPatient?.lastName}
                  placeholder=""
                  setValue={(value) => {
                    setNewPatientData((prev) => ({
                      ...prev,
                      lastName: value,
                    }));
                  }}
                />
              ) : (
                selectedPatient?.lastName
              )}
            </p>
          </div>
          <div className={styles.row}>
            <h4>Email</h4>
            <p>
              {addActive || editActive ? (
                <Input
                  type="email"
                  value={newPatientData.email || selectedPatient?.email}
                  placeholder=""
                  setValue={(value) => {
                    setNewPatientData((prev) => ({
                      ...prev,
                      email: value,
                    }));
                  }}
                />
              ) : (
                selectedPatient?.email
              )}
            </p>
          </div>
          <div className={styles.row}>
            <h4>Phone Number</h4>
            <p>
              {addActive || editActive ? (
                <Input
                  type="text"
                  value={newPatientData.phone || selectedPatient?.phone}
                  placeholder=""
                  setValue={(value) => {
                    setNewPatientData((prev) => ({
                      ...prev,
                      phone: value,
                    }));
                  }}
                />
              ) : (
                selectedPatient?.phone
              )}
            </p>
          </div>
          <div className={styles.row}>
            <h4>Secondary Phone Number</h4>
            <p>
              {addActive || editActive ? (
                <Input
                  type="text"
                  value={
                    newPatientData.secondPhone || selectedPatient?.secondPhone
                  }
                  placeholder=""
                  setValue={(value) => {
                    setNewPatientData((prev) => ({
                      ...prev,
                      secondPhone: value,
                    }));
                  }}
                />
              ) : (
                selectedPatient?.secondPhone
              )}
            </p>
          </div>
          <div className={styles.row}>
            <h4>Primary doctor</h4>
            <p>
              {addActive || editActive ? (
                <Dropdown
                  value={
                    newPatientData.doctors
                      ? {
                          label:
                            allDoctors.data.find(
                              (doctor) =>
                                doctor?._id ===
                                newPatientData.doctors[
                                  newPatientData.doctors.length - 1
                                ]?._id
                            )?.firstName +
                              " " +
                              allDoctors.data.find(
                                (doctor) =>
                                  doctor?._id ===
                                  newPatientData.doctors[
                                    newPatientData.doctors.length - 1
                                  ]?._id
                              )?.lastName !==
                            undefined
                              ? allDoctors.data.find(
                                  (doctor) =>
                                    doctor?._id === newPatientData.doctors
                                )?.firstName +
                                " " +
                                allDoctors.data.find(
                                  (doctor) =>
                                    doctor?._id === newPatientData.doctors
                                )?.lastName
                              : allDoctors.data.find(
                                  (doctor) =>
                                    doctor?._id === newPatientData?.doctors
                                )?.firstName +
                                " " +
                                allDoctors.data.find(
                                  (doctor) =>
                                    doctor?._id === newPatientData?.doctors
                                )?.lastName,

                          value: newPatientData.doctors,
                        }
                      : null
                  }
                  values={allDoctors.data.map((doctor) => ({
                    label: doctor?.firstName + " " + doctor?.lastName,
                    value: doctor?._id,
                  }))}
                  setValue={(selectedValue) =>
                    setNewPatientData({
                      ...newPatientData,
                      doctors: selectedValue,
                    })
                  }
                />
              ) : selectedPatient?.doctors?.length > 0 ? (
                selectedPatient?.doctors[selectedPatient?.doctors?.length - 1]
                  ?.firstName +
                " " +
                selectedPatient?.doctors[selectedPatient?.doctors?.length - 1]
                  ?.lastName
              ) : null}
            </p>
          </div>
          <div className={styles.row}>
            <h4>Secondary Doctor</h4>
            <p>
              {addActive || editActive ? (
                <Dropdown
                  value={
                    newPatientData.referringPhysicians
                      ? {
                          label:
                            allDoctors.data.find(
                              (doctor) =>
                                doctor?._id ===
                                newPatientData.referringPhysicians[
                                  newPatientData.referringPhysicians.length - 1
                                ]?._id
                            )?.firstName +
                              " " +
                              allDoctors.data.find(
                                (doctor) =>
                                  doctor?._id ===
                                  newPatientData.referringPhysicians[
                                    newPatientData.referringPhysicians.length -
                                      1
                                  ]?._id
                              )?.lastName !==
                            undefined
                              ? allDoctors.data.find(
                                  (doctor) =>
                                    doctor?._id ===
                                    newPatientData.referringPhysicians
                                )?.firstName +
                                " " +
                                allDoctors.data.find(
                                  (doctor) =>
                                    doctor?._id ===
                                    newPatientData.referringPhysicians
                                )?.lastName
                              : allDoctors.data.find(
                                  (doctor) =>
                                    doctor?._id ===
                                    newPatientData.referringPhysicians
                                )?.firstName +
                                " " +
                                allDoctors.data.find(
                                  (doctor) =>
                                    doctor?._id ===
                                    newPatientData.referringPhysicians
                                )?.lastName,
                          value: newPatientData.referringPhysicians,
                        }
                      : null
                  }
                  values={allDoctors.data.map((doctor) => ({
                    label: doctor?.firstName + " " + doctor?.lastName,
                    value: doctor?._id,
                  }))}
                  setValue={(selectedValue) =>
                    setNewPatientData({
                      ...newPatientData,
                      referringPhysicians: selectedValue,
                    })
                  }
                />
              ) : selectedPatient?.referringPhysicians?.length > 0 &&
                selectedPatient?.referringPhysicians[
                  selectedPatient?.referringPhysicians?.length - 1
                ] !== undefined ? (
                selectedPatient?.referringPhysicians[
                  selectedPatient?.referringPhysicians?.length - 1
                ]?.firstName +
                " " +
                selectedPatient?.referringPhysicians[
                  selectedPatient?.referringPhysicians?.length - 1
                ]?.lastName
              ) : allDoctors.data.length > 0 ? (
                allDoctors.data.find(
                  (doctor) =>
                    doctor?._id === selectedPatient?.referringPhysicians
                )?.firstName +
                " " +
                allDoctors.data.find(
                  (doctor) =>
                    doctor?._id === selectedPatient?.referringPhysicians
                )?.lastName
              ) : null}
            </p>
          </div>
          <div className={styles.row}>
            <h4>Gender</h4>
            <div>
              {addActive || editActive ? (
                <div className={styles.gender}>
                  <div>
                    <input
                      type="radio"
                      name="gender"
                      id="male"
                      value="male"
                      checked={
                        selectedPatient?.gender === "male" ||
                        newPatientData?.gender === "male"
                      }
                      onChange={(e) => {
                        setNewPatientData((prev) => ({
                          ...prev,
                          gender: e.target.value,
                        }));
                      }}
                    />
                    <label htmlFor="male">Male</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="gender"
                      id="female"
                      value="female"
                      checked={
                        selectedPatient?.gender === "female" ||
                        newPatientData?.gender === "female"
                      }
                      onChange={(e) => {
                        setNewPatientData((prev) => ({
                          ...prev,
                          gender: e.target.value,
                        }));
                      }}
                    />
                    <label htmlFor="female">Female</label>
                  </div>
                </div>
              ) : (
                <div className={styles.gender}>
                  <div>
                    <input
                      type="radio"
                      name="gender"
                      id="male"
                      value="male"
                      checked={selectedPatient?.gender === "male"}
                      onChange={(e) => {
                        setNewPatientData((prev) => ({
                          ...prev,
                          gender: e.target.value,
                        }));
                      }}
                      disabled
                    />
                    <label htmlFor="male">Male</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="gender"
                      id="female"
                      value="female"
                      checked={selectedPatient?.gender === "female"}
                      onChange={(e) => {
                        setNewPatientData((prev) => ({
                          ...prev,
                          gender: e.target.value,
                        }));
                      }}
                      disabled
                    />
                    <label htmlFor="female">Female</label>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.dob}>
              <h4>Date of Birth</h4>
              {/* {age(newPatientData) === "" ? null : (
                <h6>
                  <span>Age:</span> {age(newPatientData)}
                </h6>
              )} */}
            </div>
            <p>
              {addActive || editActive ? (
                <Input
                  type="date"
                  value={
                    newPatientData?.dob?.toString().slice(0, 10) ||
                    selectedPatient?.dob?.toString().slice(0, 10)
                  }
                  placeholder=""
                  setValue={(value) => {
                    setNewPatientData((prev) => ({
                      ...prev,
                      dob: value,
                    }));
                  }}
                />
              ) : (
                selectedPatient?.dob?.toString().slice(0, 10)
              )}
            </p>
          </div>
          <div className={styles.row}>
            <h4>City</h4>
            <p>
              {addActive || editActive ? (
                <Input
                  type="text"
                  value={newPatientData.city || selectedPatient?.city}
                  placeholder=""
                  setValue={(value) => {
                    setNewPatientData((prev) => ({
                      ...prev,
                      city: value,
                    }));
                  }}
                />
              ) : (
                selectedPatient?.city
              )}
            </p>
          </div>
          <div className={styles.row}>
            <h4>Allergies</h4>
            <p>
              {addActive || editActive ? (
                <Input
                  type="text"
                  value={
                    newPatientData?.allergies || selectedPatient?.allergies
                  }
                  placeholder=""
                  setValue={(value) => {
                    setNewPatientData((prev) => ({
                      ...prev,
                      allergies: value,
                    }));
                  }}
                />
              ) : (
                selectedPatient?.allergies?.map((allergy, index) =>
                  index === selectedPatient?.allergies.length - 1
                    ? allergy
                    : allergy + ", "
                )
              )}
            </p>
          </div>

          <div className={styles.row}>
            <h4>Notes</h4>
            <p>
              {addActive || editActive ? (
                <Input
                  type="text"
                  value={newPatientData.notes || selectedPatient?.notes}
                  placeholder=""
                  setValue={(value) => {
                    setNewPatientData((prev) => ({
                      ...prev,
                      notes: value,
                    }));
                  }}
                />
              ) : (
                selectedPatient?.notes
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Patients;
