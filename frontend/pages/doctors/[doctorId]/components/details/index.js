import { useCallback, useEffect, useState } from "react";
import styles from "./styles/index.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Input from "../../../../../common/Input";
import { useDispatch, useSelector } from "react-redux";
import { updateDoctor } from "../../../../../actions/DoctorActions";

const DoctorData = () => {
  const dispatch = useDispatch();
  const [editActive, setEditActive] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState({});
  const user = useSelector(({ UserData }) => UserData?.data);

  const doctor = useSelector(
    ({ DoctorData }) => DoctorData?.selectedDoctor.data
  );

  const [newDoctorData, setNewDoctorData] = useState(selectedDoctor || {});

  useEffect(() => {
    setSelectedDoctor(doctor);
  }, [doctor]);

  const update = useCallback(
    (id) => {
      dispatch(updateDoctor(id, newDoctorData));
    },
    [, newDoctorData]
  );

  return (
    <div className={styles.container}>
      <div className={styles.details}>
        {editActive ? (
          <div className={styles.actions}>
            <div
              className={styles.saveBtn}
              onClick={() => {
                setEditActive(false);
                editActive ? update(selectedDoctor._id) : null;
              }}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
              <p>Save</p>
            </div>
            <div
              className={styles.cancelBtn}
              onClick={() => {
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
          </div>
        )}
        <h3>Details</h3>
        <div className={styles.detailsContent}>
          <div className={styles.row}>
            <h4>First Name</h4>
            <p>
              {editActive ? (
                <Input
                  type="text"
                  value={newDoctorData.firstName || selectedDoctor?.firstName}
                  placeholder=""
                  setValue={(value) => {
                    setNewDoctorData((prev) => ({
                      ...prev,
                      firstName: value,
                    }));
                  }}
                />
              ) : (
                selectedDoctor?.firstName
              )}
            </p>
          </div>
          <div className={styles.row}>
            <h4>Last Name</h4>
            <p>
              {editActive ? (
                <Input
                  type="text"
                  value={newDoctorData.lastName || selectedDoctor?.lastName}
                  placeholder=""
                  setValue={(value) => {
                    setNewDoctorData((prev) => ({
                      ...prev,
                      lastName: value,
                    }));
                  }}
                />
              ) : (
                selectedDoctor?.lastName
              )}
            </p>
          </div>
          <div className={styles.row}>
            <h4>Email</h4>
            <p>
              {editActive ? (
                <Input
                  type="email"
                  value={newDoctorData.email || selectedDoctor?.email}
                  placeholder=""
                  setValue={(value) => {
                    setNewDoctorData((prev) => ({
                      ...prev,
                      email: value,
                    }));
                  }}
                />
              ) : (
                selectedDoctor?.email
              )}
            </p>
          </div>
          <div className={styles.row}>
            <h4>Phone Number</h4>
            <p>
              {editActive ? (
                <Input
                  type="text"
                  value={newDoctorData.phone || selectedDoctor?.phone}
                  placeholder=""
                  setValue={(value) => {
                    setNewDoctorData((prev) => ({
                      ...prev,
                      phone: value,
                    }));
                  }}
                />
              ) : (
                selectedDoctor?.phone
              )}
            </p>
          </div>
          <div className={styles.row}>
            <h4>Specialty</h4>
            <p>
              {editActive ? (
                <Input
                  type="text"
                  value={newDoctorData.specialty || selectedDoctor?.specialty}
                  placeholder=""
                  setValue={(value) => {
                    setNewDoctorData((prev) => ({
                      ...prev,
                      specialty: value,
                    }));
                  }}
                />
              ) : (
                selectedDoctor?.specialty
              )}
            </p>
          </div>
          <div className={styles.row}>
            <h4>Fee Ratio</h4>
            <p>
              {editActive ? (
                <Input
                  type="text"
                  value={newDoctorData.feeRatio || selectedDoctor?.feeRatio}
                  placeholder=""
                  setValue={(value) => {
                    setNewDoctorData((prev) => ({
                      ...prev,
                      feeRatio: value,
                    }));
                  }}
                  disabled={
                    user?.role !== "secretary" && user?.role !== "admin"
                  }
                />
              ) : (
                selectedDoctor?.feeRatio
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DoctorData;
