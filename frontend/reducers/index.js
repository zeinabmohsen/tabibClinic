import { combineReducers } from "redux";
import UserData from "./UserData";
import DoctorData from "./DoctorData";
import AppointmentData from "./AppointmentData";
import InvoiceData from "./InvoiceData";
import MedicalRecordData from "./MedicalrecordData";
import PatientData from "./PatientData";
import PrescriptionData from "./PrescriptionData";
import ScheduleData from "./ScheduleData";
import AdminData from "./AdminData";
import ServiceData from "./ServiceData";

const combinedReducers = combineReducers({
  AdminData,
  AppointmentData,
  DoctorData,
  InvoiceData,
  MedicalRecordData,
  PatientData,
  PrescriptionData,
  ScheduleData,
  ServiceData,
  UserData,
});

export default combinedReducers;
