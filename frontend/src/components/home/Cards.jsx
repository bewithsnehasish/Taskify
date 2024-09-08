import { useState } from "react";
import axios from "axios";
import { VscHeart } from "react-icons/vsc";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { IoAddCircleSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";

function Cards({ home, setInputdiv, data }) {
  const [tasks, setTasks] = useState(data);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // Handles the click event for the "Completed" button
  const handlecompletedtask = async (id) => {
    try {
      await axios.put(
        `http://localhost:3000/api/v2/update-completed-task/${id}`,
        {},
        { headers },
      );
      // Update local state to reflect the change
      setTasks(
        tasks.map((task) =>
          task._id === id ? { ...task, completed: !task.completed } : task,
        ),
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Handles the click event for the "Important" button
  const handleimportant = async (id) => {
    try {
      await axios.put(
        `http://localhost:3000/api/v2/update-important-task/${id}`,
        {},
        { headers },
      );
      // Update local state to reflect the change
      setTasks(
        tasks.map((task) =>
          task._id === id ? { ...task, important: !task.important } : task,
        ),
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Handles the click event for the "Delete" button
  const handledelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v2/delete-task/${id}`, {
        headers,
      });
      // Update local state to reflect the change
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {tasks.map((item) => (
        <div
          key={item._id}
          className="flex flex-col justify-between bg-gray-700 rounded-xl p-4 hover:scale-105 hover:cursor-pointer transition-all duration-200"
        >
          <div>
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="text-gray-300">{item.desc}</p>
          </div>
          <div className="mt-4 w-full flex items-center">
            <button
              className={`${
                item.completed === false ? "bg-red-400" : "bg-green-700"
              } p-2 rounded w-3/6 transition-all ease-in-out duration-70`}
              onClick={() => handlecompletedtask(item._id)}
            >
              {item.completed === true ? "Completed" : "Incomplete"}
            </button>
            <div className="text-white p-2 w-3/6 text-2xl flex justify-around font-semibold">
              <button onClick={() => handleimportant(item._id)}>
                {item.important === true ? (
                  <VscHeart />
                ) : (
                  <FaHeart className="fill-red-600 ease-in-out duration-75" />
                )}
              </button>
              <button>
                <FaEdit />
              </button>
              <button onClick={() => handledelete(item._id)}>
                <MdDeleteForever />
              </button>
            </div>
          </div>
        </div>
      ))}
      {home && (
        <button
          className="flex flex-col justify-center items-center bg-gray-700 rounded-xl p-4 hover:scale-105 hover:cursor-pointer transition-all duration-200"
          onClick={() => setInputdiv("fixed")}
        >
          <IoAddCircleSharp className="text-5xl" />
          <h2 className="text-2xl text-gray-300 mt-4">Add Task</h2>
        </button>
      )}
    </div>
  );
}

export default Cards;
