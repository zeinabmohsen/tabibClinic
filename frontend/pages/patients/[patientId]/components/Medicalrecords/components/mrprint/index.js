import React from "react";
import styles from "./styles/index.module.scss";

const MedicalRecordsPrintComponent = React.forwardRef(
  ({ medicalRecords }, ref) => (
    <div ref={ref}>
      {Array.isArray(medicalRecords) &&
        medicalRecords.map((record, index) => (
          <div key={index} className={styles.Container}>
            <div className={styles.date}>
              {new Date(record?.date).toLocaleDateString()}
            </div>
            <h1 className={styles.title}>Patient Medical Record</h1>
            <div className={styles.patientDetails}>
              <h2 className={styles.patientInfo}>Patient Information</h2>
              <p className={styles.patientName}>
                {record?.patient?.firstName} {record?.patient?.lastName}
              </p>
              <p>{record?.patient?.phone}</p>
              <p>{record?.patient?.email}</p>
              <p>{record?.patient?.city}</p>
              <div>
                <h3>Birth Date:</h3>
                <p>{new Date(record?.patient?.dob).toLocaleDateString()}</p>
              </div>
              {record?.patient?.allergies && (
                <div>
                  <h3>Allergies</h3>
                  <p>
                    {record?.patient?.allergies
                      ? record?.patient?.allergies.map((allergy, index) => {
                          return (index ? ", " : "") + allergy;
                        })
                      : "None"}
                  </p>
                </div>
              )}
              <div>
                <h3>Patient ID</h3>
                <p>{record?.patient?._id}</p>
              </div>
            </div>

            <div className={styles.emergency}>
              <h2 className={styles.doctorInfo}>In Case of Emergency</h2>
              <div className={styles.doctorDetails}>
                <p className={styles.doctorName}>
                  {record?.doctor?.firstName} {record?.doctor?.lastName}
                </p>
                <p>{record?.doctor?.phone}</p>
                <p>{record?.doctor?.email}</p>
                <p>{record?.doctor?.city}</p>
                {record?.doctor?.specialization && (
                  <div>
                    <h3>Specialization:</h3>
                    <p>{record?.doctor?.specialization}</p>
                  </div>
                )}
                <div>
                  <h3>Doctor ID</h3>
                  <p>{record?.doctor?._id}</p>
                </div>
              </div>
            </div>
            <div className={styles.medicalRecordData}>
              <h3>Medical Record Data</h3>
              <p className={styles.recordTitle}>{record?.title}</p>
              <p className={styles.recordDescription}>{record?.description}</p>
            </div>
          </div>
        ))}
    </div>
  )
);

export default MedicalRecordsPrintComponent;
