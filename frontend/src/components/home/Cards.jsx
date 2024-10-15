import React from "react";
import axios from "axios";
import { VscHeart } from "react-icons/vsc";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { IoAddCircleSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";

const Cards = ({
  home,
  setInputdiv,
  data,
  onTasksUpdated,
  setUpdatedTasks,
}) => {
  const url = import.meta.env.VITE_API_URL;
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleCompletedTask = async (id) => {
    try {
      await axios.put(
        `${url}/api/v2/update-completed-task/${id}`,
        {},
        { headers },
      );
      onTasksUpdated();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleImportant = async (id) => {
    try {
      await axios.put(
        `${url}/api/v2/update-important-task/${id}`,
        {},
        { headers },
      );
      onTasksUpdated();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url}/api/v2/delete-task/${id}`, { headers });
      onTasksUpdated();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleUpdate = (id, title, desc) => {
    setUpdatedTasks({ id, title, desc });
    setInputdiv(true);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {data.map((item) => (
        <div
          key={item._id}
          className="bg-gray-700 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 border border-gray-600"
        >
          <div className="p-5">
            <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
            <p className="text-gray-300 mb-4">{item.desc}</p>
          </div>
          <div className="flex justify-between items-center px-5 py-3 bg-gray-800 border-t border-gray-600">
            <button
              onClick={() => handleCompletedTask(item._id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                item.completed
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-yellow-600 text-white hover:bg-yellow-700"
              }`}
            >
              {item.completed ? "Completed" : "Incomplete"}
            </button>
            <div className="flex space-x-3">
              <button
                onClick={() => handleImportant(item._id)}
                className="text-red-400 hover:text-red-300 transition-colors duration-300"
              >
                {item.important ? (
                  <FaHeart size={22} />
                ) : (
                  <VscHeart size={22} />
                )}
              </button>
              <button
                onClick={() => handleUpdate(item._id, item.title, item.desc)}
                className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
              >
                <FaEdit size={22} />
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="text-red-400 hover:text-red-300 transition-colors duration-300"
              >
                <MdDeleteForever size={22} />
              </button>
            </div>
          </div>
        </div>
      ))}
      {home && (
        <div
          onClick={() => setInputdiv(true)}
          className="bg-indigo-600 rounded-xl p-5 flex items-center justify-center cursor-pointer hover:bg-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
        >
          <IoAddCircleSharp size={28} className="mr-3 text-white" />
          <span className="text-xl font-bold text-white">Add Task</span>
        </div>
      )}
    </div>
  );
};

export default Cards;
