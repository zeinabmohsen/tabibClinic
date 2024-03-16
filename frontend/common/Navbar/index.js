import styles from "./styles/index.module.scss";
import { motion } from "framer-motion";
import {
  faBriefcase,
  faUserGroup,
  faUser,
  faUsers,
  faCalendarDays,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import Tab from "./components/tab";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function Nav() {
  const [active, setActive] = useState("calendar");
  const router = useRouter();

  const user = useSelector(({ UserData }) => UserData.data);

  useEffect(() => {
    setActive(router.pathname.split("/")[1]);
  }, [router.pathname]);

  return (
    <>
      <motion.div
        initial={{ y: -80 }}
        exit={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ bounce: 0, type: "spring", duration: 0.8 }}
        className={styles.container}
      >
        <div onClick={() => router.push("/calendar")} className={styles.logo}>
          <h1>TABIB CLINIC</h1>
        </div>
        <div className={styles.tabs}>
          <Tab
            text={"Calendar"}
            icon={faCalendarDays}
            active={active === "calendar"} // || active === ""}
            setActive={setActive}
          />
          <Tab
            text={"Patients"}
            icon={faUserGroup}
            active={active === "patients"}
            setActive={setActive}
          />
          <Tab
            text={"Invoice"}
            icon={faMoneyBill}
            active={active === "invoice"}
            setActive={setActive}
          />
          <Tab
            text={
              user?.role === "doctor"
                ? "Services"
                : user?.role === "admin" || user?.role === "secretary"
                ? "Doctors"
                : null
            }
            icon={
              user?.role === "doctor"
                ? faBriefcase
                : user?.role === "admin" || user?.role === "secretary"
                ? faUsers
                : null
            }
            active={active === "services" || active === "doctors"}
            setActive={setActive}
            push={
              user?.role === "doctor"
                ? `/doctors/${user?._id}`
                : user?.role === "admin" || user?.role === "secretary"
                ? "/doctors"
                : null
            }
          />
          <Tab
    text={user.role === "doctor" ? `Dr. ${user.firstName} ${user.lastName}` : `${user.firstName} ${user.lastName}`}
    icon={faUser}
    active={active === "profile"}
    setActive={setActive}
    profile
/>

        </div>
      </motion.div>
    </>
  );
}
