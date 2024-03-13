import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./styles/index.module.scss";

const RenderAttachment = ({ attachment }) => {
  const [elem, setElem] = useState(<div />);
  // console.log(attachment);

  useEffect(() => {
    const fetchAttachment = async () => {
      try {
        const response = await axios.get(`${attachment}`, {
          responseType: "blob",
        });

        const blob = response.data;
        const type = blob.type.split("/")[0];

        switch (type) {
          case "image":
            setElem(<img src={URL.createObjectURL(blob)} />);
            break;
          case "pdf":
            console.log("test")
            setElem(
              <embed
                src={URL.createObjectURL(blob)}
                type="application/pdf"
                width="100%"
                height="600px"
              />
            );
            break;
          case "doc":
            setElem(
              <a href={URL.createObjectURL(blob)} download>
                Download File
              </a>
            );
            break;
          default:
            setElem(<div>Unknown file type</div>);
            break;
        }
      } catch (error) {
        console.error("Error fetching attachment:", error);
      }
    };

    fetchAttachment();
  }, [attachment]);

  return <div>{elem}</div>;
};

const FullMedicalRecordsPrintComponent = React.forwardRef(
  ({ medicalRecords }, ref) => {
    const getFileType = (attachment) => {
      // Determine the file type based on the attachment URL
      if (attachment.includes(".pdf")) {
        return "pdf";
      } else if (
        attachment.includes(".png") ||
        attachment.includes(".jpg") ||
        attachment.includes(".jpeg")
      ) {
        return "image";
      } else if (attachment.includes(".doc") || attachment.includes(".docx")) {
        return "doc";
      } else {
        // Add additional file type checks as needed
        return "unknown";
      }
    };

    return (
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
                <p className={styles.recordDescription}>
                  {record?.description}
                </p>
              </div>
              <div>
                {Array.isArray(record?.prescriptions) &&
                  record?.prescriptions.map((prescription, i) => (
                    <div key={i}>
                      <h3>Prescription Attachments</h3>
                      {Array.isArray(prescription?.attachments) &&
                        prescription?.attachments.map((attachment, j) => (
                          <div key={j}>
                            <RenderAttachment attachment={attachment} />
                          </div>
                        ))}
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>
    );
  }
);

export default FullMedicalRecordsPrintComponent;
