import styles from "./styles/index.module.scss";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "../Dropdown";
import { getAllDoctors } from "../../actions/DoctorActions";
import classNames from "classnames";
import { updateMedicalRecord } from "../../actions/MedicalRecordActions";

export default function AddMRServices({ setActive, selectedRecord }) {
  const dispatch = useDispatch();

  const allDoctors = useSelector(({ DoctorData }) => DoctorData?.allDoctors);

  const [formData, setFormData] = useState({
    doctor: selectedRecord?.doctor?._id,
    services: [],
  });

  const services =
    allDoctors?.data?.filter((doctor) => doctor._id === formData.doctor)[0]
      ?.services || [];

  const update = useCallback(async () => {
    await dispatch(updateMedicalRecord(selectedRecord?._id, formData));
  }, [dispatch, formData, selectedRecord]);

  useEffect(() => {
    setFormData({
      ...formData,
      doctor: selectedRecord?.doctor?._id,
    });
  }, [selectedRecord]);

  useEffect(() => {
    dispatch(getAllDoctors());
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        update();
        setActive(false);
      }}
      className={styles.container}
    >
      <div className={styles.doctor}>
        <label htmlFor="exampleFormControlInput1" className="form-label mb-3">
          Doctor
        </label>
        <div className="flex justify-center w-50 mx-auto mb-3 ">
          <Dropdown
            disabled={true}
            value={
              formData.doctor
                ? {
                    label:
                      allDoctors.data.find(
                        (doctor) => doctor?._id === formData.doctor
                      )?.firstName +
                      " " +
                      allDoctors.data.find(
                        (doctor) => doctor?._id === formData.doctor
                      )?.lastName,
                    value: formData.doctor,
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
                doctor: selectedValue,
              })
            }
          />
        </div>
      </div>
      <div className={styles.services}>
        <label htmlFor="exampleFormControlInput1" className="form-label mb-3">
          Services
        </label>
        <div className={styles.bubbleContainer}>
          {services.map((service) => (
            <div
              key={service._id}
              className={classNames({
                [styles.bubble]: true,
                [styles.selected]: formData.services.includes(service._id),
              })}
              onClick={() => {
                if (formData.services.includes(service._id)) {
                  setFormData({
                    ...formData,
                    services: formData?.services.filter(
                      (id) => id !== service._id
                    ),
                  });
                } else {
                  setFormData({
                    ...formData,
                    services: [...formData.services, service._id],
                  });
                }
              }}
            >
              {service.name}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent w-full mx-auto mt-3"
        >
          Save
        </button>
      </div>
    </form>
  );
}
