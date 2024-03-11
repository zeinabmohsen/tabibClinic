import classNames from "classnames";
import styles from "./styles/index.module.scss";
import { useDispatch } from "react-redux";
import { getPatientById } from "../../../../../../actions/PatientActions";
import { useCallback } from "react";

export default function Patient({
  patient,
  index,
  active,
  setActive,
  setActivePatient
}) {
  const dispatch = useDispatch();

  const select = async (id) => {
    await dispatch(getPatientById(id));
    setActive(index);
    setActivePatient(patient);
  };

  return (
    <div
      key={index}
      className={classNames({
        [styles.patient]: true,
        [styles.active]: index === active,
      })}
      onClick={() => select(patient._id)}
    >
      <div>
        <h3>
          {patient?.firstName} {patient?.lastName}
        </h3>
        <p>{patient?.email}</p>
      </div>
      <div>
        <p>{patient?.age}</p>
        <p>{patient?.city}</p>
      </div>
    </div>
  );
}
