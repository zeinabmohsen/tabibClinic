import React, { use, useCallback, useEffect, useRef, useState } from "react";
import styles from "./styles/index.module.scss";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAppointment,
  getAllAppointments,
  getAppointmentsByDoctorId,
  getAppointmentsByLoggedInDoctor,
  updateAppointment,
} from "../../actions/AppointmentActions";
import { getAllDoctors } from "../../actions/DoctorActions";
import Modal from "../../common/Modal";
import CreateAppointmentModal from "../../common/CreateAppointmentMoodal";
import { getAllPatients } from "../../actions/PatientActions";
import { useRouter } from "next/router";
import CreateUserModal from "../../common/CreateUserModal";
import AppointmentStatusModal from "../../common/AppointmentStatusModal";
import Dropdown from "../../common/Dropdown";

export default function Calendar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const calendarRef = useRef(null);
  const statusRef = useRef(null);
  const updateRef = useRef(null);
  const deleteRef = useRef(null);

  const [selectedDoctor, setSelectedDoctor] = useState("all");
  const [appointmentModal, setAppointmentModal] = useState(false);
  const [modal, setModal] = useState(false);
  const [isSelected, setIsSelected] = useState({});
  const [selectedSession, setSelectedSession] = useState({});
  const [statusModal, setStatusModal] = useState(false);
  const [events, setEvents] = useState([]);

  const user = useSelector(({ UserData }) => UserData.data);
  const allAppointments = useSelector(
    ({ AppointmentData }) => AppointmentData.allAppointments
  );
  const doctorAppointments = useSelector(
    ({ AppointmentData }) => AppointmentData.appointmentsByDoctor
  );

  const allDoctors = useSelector(({ DoctorData }) => DoctorData.allDoctors);

  const removeAppointment = useCallback(() => {
    console.log(isSelected);
    dispatch(deleteAppointment(isSelected?.extendedProps?._id));
  }, [dispatch, isSelected]);

  useEffect(() => {
    if (
      allAppointments &&
      allAppointments.data &&
      (user?.role === "admin" || user?.role === "secretary") &&
      (selectedDoctor === 0 || !selectedDoctor || selectedDoctor === "all")
    ) {
      const mappedEvents = allAppointments.data.map((event) => {
        let color;
        switch (event?.status) {
          case "scheduled":
            color = "blue";
            break;
          case "cancelled":
            color = "red";
            break;
          case "completed":
            color = "green";
            break;
          case "absent":
            color = "black";
            break;
          case "rescheduled":
            color = "orange";
            break;
          default:
            color = "blue";
        }
        return { ...event, backgroundColor: color };
      });
      setEvents(mappedEvents);
    } else if (doctorAppointments && doctorAppointments.data) {
      const mappedEvents = doctorAppointments.data.map((event) => {
        let color;
        switch (event?.status) {
          case "scheduled":
            color = "blue";
            break;
          case "cancelled":
            color = "red";
            break;
          case "completed":
            color = "green";
            break;
          case "absent":
            color = "black";
            break;
          case "rescheduled":
            color = "orange";
            break;
          default:
            color = "blue";
        }
        return { ...event, backgroundColor: color };
      });
      setEvents(mappedEvents);
    }
  }, [allAppointments, doctorAppointments, selectedDoctor, user?.role]);

  useEffect(() => {
    if (user?.role === "admin" || user?.role === "secretary") {
      dispatch(getAllDoctors());
      dispatch(getAllAppointments());
      dispatch(getAllPatients());
    } else if (user?.role === "doctor") {
      dispatch(getAppointmentsByLoggedInDoctor());
    }
  }, [dispatch, user?.role, user?.role, user?._id]);

  useEffect(() => {
    if (
      selectedDoctor === 0 &&
      (user?.role === "admin" || user?.role === "secretary")
    ) {
      dispatch(getAllAppointments());
    } else if (
      selectedDoctor !== 0 &&
      (user?.role === "admin" || user?.role === "secretary")
    ) {
      dispatch(getAppointmentsByDoctorId(selectedDoctor));
    }
  }, [dispatch, selectedDoctor, user?.role]);

  return (
    <main className={styles.container}>
      {(user?.role === "admin" || user?.role === "secretary") && (
        <div className={styles.select}>
          {user?.role === "admin" && (
            <button
              onClick={() => setModal(true)}
              className="btn btn-primary mb-3 w-50"
            >
              Create User
            </button>
          )}
          {isSelected?.extendedProps?._id ? (
            <>
              <button
                onClick={() => setAppointmentModal(true)}
                className="btn btn-primary mb-3 w-50"
                ref={updateRef}
              >
                Edit Appointment
              </button>
              <button
                onClick={() => setStatusModal(true)}
                className="btn btn-primary mb-3 w-50"
                ref={statusRef}
              >
                Update Status
              </button>
              <button
                onClick={removeAppointment}
                className="btn btn-primary mb-3 w-50"
                ref={deleteRef}
              >
                Delete Appointment
              </button>
            </>
          ) : (
            <button
              onClick={() => setAppointmentModal(true)}
              className="btn btn-primary mb-3 w-50"
            >
              Create Appointment
            </button>
          )}
          <div className={styles.dropdown}>
            <Dropdown
              values={[
                {
                  value: 0,
                  label: "All",
                },
                ...allDoctors.data.map((doctor) => ({
                  value: doctor?._id,
                  label: `${doctor?.firstName} ${doctor?.lastName}`,
                })),
              ]}
              value={
                selectedDoctor === "all" || selectedDoctor === 0
                  ? {
                      value: 0,
                      label: "All",
                    }
                  : selectedDoctor
                  ? {
                      value: selectedDoctor._id,
                      label:
                        allDoctors.data.find(
                          (doctor) => doctor?._id === selectedDoctor
                        )?.firstName +
                        " " +
                        allDoctors.data.find(
                          (doctor) => doctor?._id === selectedDoctor
                        )?.lastName,
                    }
                  : null
              }
              setValue={(selectedDoctor) => {
                if (selectedDoctor === 0) {
                  setSelectedDoctor("all");
                } else {
                  const doctor = allDoctors.data.find(
                    (doc) => doc._id === selectedDoctor
                  );
                  setSelectedDoctor(doctor?._id);
                }
              }}
              placeholder="Select Doctor"
            />
          </div>
        </div>
      )}
      <Fullcalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height={"90vh"}
        events={events}
        editable={user?.role === "admin" || user?.role === "secretary"}
        droppable={user?.role === "admin" || user?.role === "secretary"}
        selectable
        slotDuration="00:10:00"
        slotMinTime="08:00:00"
        slotMaxTime="18:00:00"
        slotLabelInterval={{ hours: 1 }}
        eventContent={(e) => {
          return (
            <div
              className={styles.eventContent}
              onClick={() => {
                router.push(`/patients/${e.event?.extendedProps.patient?._id}`);
              }}
              onContextMenu={(i) => {
                i.preventDefault();
                setIsSelected(e.event);
                // setTimeout(() => {
                //   setIsSelected({});
                // }, 20000);
              }}
            >
              <h1>{e.timeText}</h1>
              {(user?.role === "admin" ||
                user?.role === "secretary" ||
                user?.role === "doctor") && (
                <p>
                  Doctor: {e?.event?.extendedProps?.doctor?.firstName}{" "}
                  {e?.event?.extendedProps?.doctor?.lastName}
                </p>
              )}
              <p>
                Patient: {e?.event?.extendedProps?.patient?.firstName}{" "}
                {e?.event?.extendedProps?.patient?.lastName}
              </p>
              <p>Status: {e?.event?.extendedProps?.status}</p>
              <p>{e.event?.extendedProps?.reason}</p>
            </div>
          );
        }}
        eventBorderColor={(info) => {
          return info.event?.backgroundColor.toString();
        }}
        eventBackgroundColor={(info) => {
          return info.event?.backgroundColor.toString();
        }}
        select={(info) => {
          if (info.view.type === "dayGridMonth") {
            calendarRef.current.getApi().changeView("timeGridDay", info.start);
            return;
          }
          if (user?.role === "doctor") return;
          setSelectedSession(info);
          setAppointmentModal(true);
        }}
        unselect={() => {
          setSelectedSession({});
        }}
      />
      <Modal
        active={appointmentModal}
        setActive={setAppointmentModal}
        title={
          isSelected?.extendedProps?._id
            ? "Edit Appointment"
            : "Create Appointment"
        }
        children={
          <CreateAppointmentModal
            active={appointmentModal}
            setActive={setAppointmentModal}
            selectedAppointment={isSelected?.extendedProps}
            appointmentId={isSelected?.extendedProps?._id}
            appointmentRange={{
              start: selectedSession.startStr
                ? selectedSession.startStr
                : isSelected.startStr,
              end: selectedSession.endStr
                ? selectedSession.endStr
                : isSelected.endStr,
            }}
          />
        }
      />
      <Modal
        active={modal}
        setActive={setModal}
        title="Create User"
        children={<CreateUserModal open={modal} setOpen={setModal} />}
      />
      <Modal
        active={statusModal}
        setActive={setStatusModal}
        title="Update Status"
        children={
          <AppointmentStatusModal
            active={statusModal}
            setActive={setStatusModal}
            selectedAppointment={isSelected?.extendedProps}
            appointmentId={isSelected?.extendedProps?._id}
            appointmentRange={{
              start: isSelected.startStr,
              end: isSelected.endStr,
            }}
          />
        }
      />
    </main>
  );
}
