import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createDoctorSchedule,
  getDoctorSchedule,
  updateDoctorSchedule,
} from "../../actions/ScheduleActions";
import styles from "./styles/index.module.scss";
import { logout } from "../../actions/UserActions";

const ScheduleTable = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [isChanged, setIsChanged] = useState(false);

  const user = useSelector(({ UserData }) => UserData.data);
  const doctorId = user?.id;

  const originalSchedule = user?.schedule?.weekdays;

  const [scheduleForm, setScheduleForm] = useState(originalSchedule);

  const handleStartTimeChange = (index, event) => {
    const newSchedule = scheduleForm.map((day, i) => {
      if (i === index) {
        return { ...day, startTime: event.target.value };
      }
      return day;
    });
    setScheduleForm(newSchedule);
    setIsChanged(true);
  };

  const handleEndTimeChange = (index, event) => {
    const newSchedule = scheduleForm.map((day, i) => {
      if (i === index) {
        return { ...day, endTime: event.target.value };
      }
      return day;
    });
    setScheduleForm(newSchedule);
    setIsChanged(true);
  };

  const createSchedule = useCallback(async () => {
    await dispatch(
      updateDoctorSchedule(doctorId, user?.schedule?._id, scheduleForm)
    );
  }, [dispatch, doctorId, scheduleForm, user.schedule?._id]);

  // if (user.role === "secretary")
  return (
    <div className={styles.logout}>
      <button
        onClick={async () => {
          await dispatch(logout());
          router.push("/");
          window.location.reload();
        }}
      >
        Logout
      </button>
    </div>
    // );
    // else
    //   return (
    //     <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-20">
    //       <div className={styles.logout}>
    //         <button
    //           onClick={async () => {
    //             await dispatch(logout());
    //             router.push("/");
    //             window.location.reload();
    //           }}
    //         >
    //           Logout
    //         </button>
    //       </div>
    //       <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    //         <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    //           <tr>
    //             <th scope="col" className="px-6 py-3">
    //               Day
    //             </th>
    //             <th scope="col" className="px-6 py-3">
    //               Start Time
    //             </th>
    //             <th scope="col" className="px-6 py-3">
    //               End Time
    //             </th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {Array.isArray(scheduleForm) &&
    //             scheduleForm.map((day, index) => (
    //               <tr
    //                 key={index}
    //                 className={`${
    //                   index % 2 === 0 ? "bg-white" : "bg-gray-50"
    //                 } border-b dark:bg-gray-800 dark:border-gray-700`}
    //               >
    //                 <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
    //                   {day.day}
    //                 </td>
    //                 <td className="px-6 py-4">
    //                   <input
    //                     type="time"
    //                     value={day.startTime}
    //                     onChange={(event) => {
    //                       handleStartTimeChange(index, event);
    //                     }}
    //                     className="border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
    //                   />
    //                 </td>
    //                 <td className="px-6 py-4">
    //                   <input
    //                     type="time"
    //                     value={day.endTime}
    //                     onChange={(event) => {
    //                       handleEndTimeChange(index, event);
    //                     }}
    //                     className="border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
    //                   />
    //                 </td>
    //               </tr>
    //             ))}
    //         </tbody>
    //       </table>
    //       {isChanged && (
    //         <button
    //           onClick={() => {
    //             setIsChanged(false);
    //             createSchedule();
    //           }}
    //           className="btn btn-primary w-50 mx-auto mb-3 w-full border-2 bg-gray-500 text-white border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
    //         >
    //           Save
    //         </button>
    //       )}
    //     </div>
  );
};

export default ScheduleTable;
