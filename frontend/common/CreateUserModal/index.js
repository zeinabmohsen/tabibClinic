import { useCallback, useState } from "react";
import Input from "../Input";
import { useDispatch } from "react-redux";
import styles from "./styles/index.module.scss";
import { createUser, updateUser } from "../../actions/AdminActions";

export default function CreateUserModal({
  open,
  setOpen,
  editing = false,
  data = {},
}) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(
    editing
      ? data
      : {
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          role: "doctor",
          password: "12345678",
        }
  );

  const create = useCallback(() => {
    if (!editing) dispatch(createUser(formData));
    else {
      dispatch(updateUser(data._id, formData));
    }
  }, [dispatch, formData, editing, data._id]);

  return (
    <form
      className="invoice-form gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        create();
        console.log(formData);
        // setOpen(false);
      }}
    >
      <div className={styles.container}>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="title">
              First Name
              <span className="text-red-500"> *</span>
            </label>
            <Input
              type="text"
              id="title"
              className="border border-gray-300 rounded-lg"
              value={formData.firstName}
              setValue={(value) => {
                setFormData((prev) => ({
                  ...prev,
                  firstName: value,
                }));
              }}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="title">
              Last Name
              <span className="text-red-500"> *</span>
            </label>
            <Input
              type="text"
              id="title"
              className="border border-gray-300 rounded-lg"
              value={formData.lastName}
              setValue={(value) => {
                setFormData((prev) => ({
                  ...prev,
                  lastName: value,
                }));
              }}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="title">
              Email
              <span className="text-red-500"> *</span>
            </label>
            <Input
              type="text"
              id="title"
              className="border border-gray-300 rounded-lg"
              value={formData.email}
              setValue={(value) => {
                setFormData((prev) => ({
                  ...prev,
                  email: value,
                }));
              }}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="title">
              Password
              <span className="text-red-500"> *</span>
            </label>
            <Input
              type="text"
              id="title"
              className="border border-gray-300 rounded-lg"
              value={formData.password}
              setValue={(value) => {
                setFormData((prev) => ({
                  ...prev,
                  password: value,
                }));
              }}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="title">
              Phone
              <span className="text-red-500"> *</span>
            </label>
            <Input
              type="text"
              id="title"
              className="border border-gray-300 rounded-lg"
              value={formData.phone}
              setValue={(value) => {
                setFormData((prev) => ({
                  ...prev,
                  phone: value,
                }));
              }}
              required
            />
          </div>
          <div className={styles.dobG}>
            <div className="flex flex-col gap-1 space-x-19 w-full">
              <h4>
                Role
                <span className="text-red-500"> *</span>
              </h4>
              <div className={styles.gender}>
                <div>
                  <input
                    type="radio"
                    name="role"
                    id="secretary"
                    value="secretary"
                    checked={formData.role === "secretary"}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        role: e.target.value,
                      }));
                    }}
                  />
                  <label htmlFor="male">Secretary</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="role"
                    id="doctor"
                    value="doctor"
                    checked={formData.role === "doctor"}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        role: e.target.value,
                      }));
                    }}
                  />
                  <label htmlFor="doctor">Doctor</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-900 text-white rounded hover:bg-indigo-800 focus:outline-none focus:bg-indigo-800 w-full"
        >
          {editing ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
}
