import { useEffect, useState } from "react";
import Input from "../../../../common/Input";
import styles from "./styles/index.module.scss";
import Patient from "./components/Patient";

export default function Sidenav({
  patients = [],
  activePatient,
  setActivePatient,
}) {
  const [searchText, setSearchText] = useState("");
  const [active, setActive] = useState(0);

  const filteredPatients = patients.filter((patient) => {
    if (searchText === "") {
      return patient;
    } else if (
      patient?.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
      patient?.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
      patient?.email.toLowerCase().includes(searchText.toLowerCase())
    ) {
      return patient;
    }
  });

  return (
    <div className={styles.container}>
      <div>
        <Input
          placeholder="Search"
          search
          value={searchText}
          setValue={setSearchText}
        />
        <h2 className={styles.title}>Patients</h2>
        <div className={styles.list}>
          {filteredPatients.length > 0 &&
            filteredPatients.map((patient, index) => (
              <Patient
                patient={patient}
                index={index}
                active={active}
                setActive={setActive}
                key={index}
                setActivePatient={setActivePatient}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
