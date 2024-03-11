import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../common/Modal";

import { deleteUser, getAllUsers } from "../../actions/AdminActions";
import { getAllDoctors } from "../../actions/DoctorActions";
import CreateUserModal from "../../common/CreateUserModal";

const UsersTable = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const user = useSelector(({ UserData }) => UserData.data);
  const [selectedUser, setSelectedUser] = useState({});

  const data = useSelector(({ DoctorData }) => DoctorData?.allDoctors?.data);

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllDoctors());
  }, [dispatch, user.role]);

  return (
    <div className="flex flex-col w-full justify-end overflow-x-auto shadow-md sm:rounded-lg mt-20">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        {/* Table headers */}
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Doctor
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Phone
            </th>
            <th scope="col" className="px-6 py-3">
              Type
            </th>
            <th scope="col" className="px-6 py-3">
              Ratio
            </th>
            <th scope="col" className="px-6 py-3"></th>
            <th scope="col" className="px-6 py-3">
              {user.role === "admin" && "Actions"}
            </th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {/* Map over data to render table rows */}
          {Array.isArray(data) &&
            data.map((mUser, index) => {
              return (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-900
                  `}
                  onClick={() => router.push(`/doctors/${mUser._id}`)}
                >
                  {/* Table cells */}
                  <td
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white
                    hover:text-indigo-600 cursor-pointer transition duration-300 ease-in-out"
                  >
                    {mUser.firstName} {mUser.lastName}
                  </td>
                  <td className="px-6 py-4">{mUser.email}</td>
                  <td className="px-6 py-4">{mUser.phone}</td>
                  <td className="px-6 py-4">{mUser.role}</td>
                  <td className="px-6 py-4">
                    {mUser.feeRatio ? mUser.feeRatio : 0} %
                  </td>
                  <td className="px-6 py-4">
                    {user.role === "admin" && (
                      <button
                        className="text-indigo-600 hover:text-indigo-900"
                        onClick={(e) => {
                          e.stopPropagation();
                          setModal(true);
                          setSelectedUser(mUser);
                        }}
                      >
                        Edit
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {user.role === "admin" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(deleteUser(mUser._id));
                        }}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {/* Modal for editing users */}
      <Modal
        active={modal}
        setActive={setModal}
        title="Edit User"
        children={
          <CreateUserModal
            open={modal}
            setOpen={setModal}
            data={selectedUser}
            editing
          />
        }
      />
    </div>
  );
};

export default UsersTable;
