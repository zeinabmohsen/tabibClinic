import styles from "./styles/index.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Sidenav from "./components/Sidenav";
import Modal from "../../common/Modal";
import { getServices } from "../../actions/ServiceActions";
import Services from "./components/details";

export default function ServicesInfo() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [activeService, setActiveService] = useState({});

  const services = useSelector(
    ({ ServiceData }) => ServiceData.allServices.data
  );
  const user = useSelector(({ UserData }) => UserData.data);
  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  // if the page loads, the user is redirected to doctors/doctorId
  useEffect(() => {
    // remove the /services from the history
    if (router.pathname === "/services") {
      router.replace(`/doctors/${user._id}`);
    }
    router.push(`/doctors/${user._id}`);
  }, [services, router]);

  return (
    <div className={styles.container}>
      <div>
        <Sidenav
          services={services}
          activeService={activeService}
          setActiveService={setActiveService}
        />
        <Services />
        {/* <div className={styles.bodyContainer}>
          <div className={styles.btns}>
            <button
              onClick={() => {
                setPrescriptionModal(true);
              }}
            >
              Insert Prescription
            </button>
            <button
              onClick={() => {
                setRecordModal(true);
              }}
            >
              Insert Medical Record
            </button>
            <button
              onClick={() => {
                setInvoiceModal(true);
              }}
            >
              Create Invoice
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
}
