import React, { useCallback } from "react";
import { useState } from "react";
import Input from "../Input";
import {
  clearSelectedService,
  createService,
  updateService,
} from "../../actions/ServiceActions";
import { useDispatch } from "react-redux";

export default function CreateServiceModal({
  selectedServiceData,
  setServiceModal,
}) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: selectedServiceData?.name || "",
    price: selectedServiceData?.price || 0,
  });

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!formData.name || !formData.price) return;

      if (formData.price < 0) {
        alert("Price cannot be negative");
        return;
      }

      if (formData.price === 0) {
        alert("Price cannot be zero");
        return;
      }

      if (formData.name.length < 3) {
        alert("Name should be atleast 3 characters");
        return;
      }

      if (selectedServiceData?._id) {
        await dispatch(
          updateService(selectedServiceData._id, {
            ...formData,
          })
        );
        await dispatch(clearSelectedService());
      } else {
        await dispatch(createService(formData));
      }

      setFormData({
        name: "",
        description: "",
        price: 0,
      });
      setServiceModal(false);
    },
    [dispatch, formData, selectedServiceData]
  );

  return (
    <form className="flex flex-col gap-4" onSubmit={(e) => handleSubmit(e)}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="name">Name</label>
          <Input
            type="text"
            id="name"
            className="border border-gray-300 rounded-lg"
            value={formData.name}
            setValue={(value) => {
              setFormData({ ...formData, name: value });
            }}
            required
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="price">Price</label>
        <Input
          type="number"
          id="price"
          className="border border-gray-300 rounded-lg"
          value={formData.price}
          setValue={(value) => {
            setFormData({ ...formData, price: value });
          }}
          required
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-indigo-900 text-white rounded hover:bg-indigo-800 focus:outline-none focus:bg-indigo-800 w-full"
      >
        {selectedServiceData?._id ? "Update Service" : "Create Service"}
      </button>
    </form>
  );
}
