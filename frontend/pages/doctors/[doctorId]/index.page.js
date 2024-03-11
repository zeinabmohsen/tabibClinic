import DoctorData from "./components/details";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles/index.module.scss";
import { useRouter } from "next/router";
import { getDoctor } from "../../../actions/DoctorActions";
import Modal from "../../../common/Modal";
import CreateServiceModal from "../../../common/CreateServiceModal";
import Services from "./components/Services";
import { deleteService, selectService } from "../../../actions/ServiceActions";

export default function DoctorInfo() {
  const dispatch = useDispatch();
  const router = useRouter();
  const doctorId = router.query.doctorId;

  const [serviceModal, setServiceModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const user = useSelector(({ UserData }) => UserData?.data);

  const selectedDoctor = useSelector(
    ({ DoctorData }) => DoctorData?.selectedDoctor.data
  );

  const selectedServiceData = useSelector(
    ({ ServiceData }) => ServiceData?.selectedService
  );

  const handleDeleteService = useCallback(
    async (id) => {
      await dispatch(deleteService(id));
      setSelectedService(null);
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(getDoctor(doctorId));
  }, [dispatch, doctorId]);

  useEffect(() => {
    if (selectedService) {
      setTimeout(() => {
        setSelectedService(null);
      }, 5000);
    }
  }, [selectedService]);

  useEffect(() => {
    if(doctorId === "undefined" && user?._id && user?.role === "doctor") {
      router.push(`/doctors/${user._id}`);
    }
  }, [doctorId, router, user]);

  return (
    <div className={styles.container}>
      <div>
        <DoctorData />
        <div className={styles.bodyContainer}>
          {user?.role === "doctor" && (
            <div className={styles.btns}>
              <button
                onClick={() => {
                  setServiceModal(true);
                }}
              >
                {!selectedService ? "Create Service" : "Edit Service"}
              </button>
              {selectedService && (
                <button onClick={() => setSelectedService(null)}>Cancel</button>
              )}
              {selectedService && (
                <button
                  onClick={() => {
                    handleDeleteService(selectedService._id);
                  }}
                >
                  Delete
                </button>
              )}
            </div>
          )}
          <div className={styles.infoContainer}>
            {Array.isArray(selectedDoctor?.services) &&
              selectedDoctor?.services.length > 0 && (
                <Services
                  data={selectedDoctor?.services || []}
                  setClickedService={(service) => {
                    setSelectedService(service);
                    dispatch(selectService(service));
                  }}
                />
              )}
          </div>
        </div>
      </div>
      <Modal
        active={serviceModal}
        setActive={setServiceModal}
        title={!selectedServiceData?._id ? "Create Service" : "Edit Service"}
        children={
          <CreateServiceModal
            selectedServiceData={selectedServiceData}
            setServiceModal={setServiceModal}
          />
        }
      />
    </div>
  );
}
