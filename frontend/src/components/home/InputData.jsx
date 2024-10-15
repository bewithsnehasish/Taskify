import React, { useEffect, useState } from "react";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { IoCheckboxOutline } from "react-icons/io5";

const InputData = ({
  isVisible,
  onClose,
  onTaskAdded,
  updatedTasks,
  setUpdatedTasks,
}) => {
  const [data, setData] = useState({ title: "", desc: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    setData({ title: updatedTasks.title, desc: updatedTasks.desc });
  }, [updatedTasks]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submitData = async () => {
    if (data.title.trim() === "" || data.desc.trim() === "") {
      alert("Please fill all the fields");
      return;
    }
    setIsSubmitting(true);
    try {
      if (updatedTasks.id) {
        await axios.put(`${url}/api/v2/update-task/${updatedTasks.id}`, data, {
          headers,
        });
      } else {
        await axios.post(`${url}/api/v2/create-task`, data, {
          headers,
        });
      }
      onTaskAdded();
      resetForm();
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("An error occurred while submitting the data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setData({ title: "", desc: "" });
    setUpdatedTasks({ id: "", title: "", desc: "" });
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 px-4 py-6 overflow-y-auto">
      <div className="w-full max-w-lg bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg shadow-xl transform transition-all duration-300 ease-in-out m-auto">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center">
            <IoCheckboxOutline className="text-blue-500 text-2xl sm:text-3xl mr-2" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {updatedTasks.id ? "Update Task" : "New Task"}
            </h2>
          </div>
          <button
            className="text-gray-400 hover:text-white transition-colors duration-200"
            onClick={resetForm}
            aria-label="Close"
          >
            <RxCross2 className="text-xl sm:text-2xl" />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter task title"
              className="w-full px-3 py-2 sm:px-4 sm:py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              value={data.title}
              onChange={change}
            />
          </div>
          <div>
            <label
              htmlFor="desc"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Description
            </label>
            <textarea
              id="desc"
              name="desc"
              rows={5}
              placeholder="Enter task description..."
              className="w-full px-3 py-2 sm:px-4 sm:py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm sm:text-base"
              value={data.desc}
              onChange={change}
            ></textarea>
          </div>
        </div>
        <div className="mt-6">
          <button
            className="w-full px-4 py-2 sm:py-3 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-200 text-sm sm:text-base"
            onClick={submitData}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </span>
            ) : updatedTasks.id ? (
              "Update Task"
            ) : (
              "Create Task"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputData;
