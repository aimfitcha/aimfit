'use client'
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function UserForm({ initialData, onSubmit, onCancel }) {
    const router = useRouter() 
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    address: initialData?.address || "",
    mobile: initialData?.mobile || "",
    joining_date: initialData?.joining_date || "",
    status: initialData?.status || false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(formData);
    try {
        const res = await fetch('/api/listing', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
      } catch (error) {
        console.error("Error fetching data:", error);
      }finally{
        setFormData({
            name:"",
    address:"",
    mobile:"",
    joining_date: "",
    status:false,
        })
        router.push('/')
      }
   
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">{initialData ? "Edit User" : "Add User"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="mobile" className="block text-gray-700 font-medium mb-2">
            Mobile
          </label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="joining_date" className="block text-gray-700 font-medium mb-2">
            Joining Date
          </label>
          <input
            type="date"
            id="joining_date"
            name="joining_date"
            value={formData.joining_date}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block text-gray-700 font-medium mb-2">
            Status
          </label>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="status"
              name="status"
              checked={formData.status}
              onChange={handleChange}
              className="w-5 h-5 mr-2"
            />
            <label htmlFor="status" className="text-gray-700">
              Active
            </label>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {initialData ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}




export default UserForm;
