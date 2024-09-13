import axios from "axios";
import { VscHeart } from "react-icons/vsc";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { IoAddCircleSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";

function Cards({ home, setInputdiv, data, onTasksUpdated, setUpdatedTasks }) {
  const url = "https://taskify-hf0m.onrender.com";
  // const url = "http://localhost:3000";
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // Handles the click event for the "Completed" button
  const handlecompletedtask = async (id) => {
    try {
      await axios.put(
        `${url}/api/v2/update-completed-task/${id}`,
        {},
        { headers },
      );
      onTasksUpdated(); // Call this to update the task list in the parent component
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Handles the click event for the "Important" button
  const handleimportant = async (id) => {
    try {
      await axios.put(
        `${url}/api/v2/update-important-task/${id}`,
        {},
        { headers },
      );
      onTasksUpdated(); // Call this to update the task list in the parent component
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Handles the click event for the "Delete" button
  const handledelete = async (id) => {
    try {
      await axios.delete(`${url}/api/v2/delete-task/${id}`, {
        headers,
      });
      onTasksUpdated(); // Call this to update the task list in the parent component
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Handles the click event for the "Update" button
  const handleupdate = async (id, title, desc) => {
    setUpdatedTasks({ id, title, desc });
    setInputdiv(true);
  };

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {data.map((item) => (
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
                {item.important ? (
                  <FaHeart className="fill-red-600 ease-in-out " />
                ) : (
                  <VscHeart />
                )}
              </button>
              <button
                onClick={() => handleupdate(item._id, item.title, item.desc)}
              >
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
          onClick={() => setInputdiv(true)}
        >
          <IoAddCircleSharp className="text-5xl" />
          <h2 className="text-2xl text-gray-300 mt-4">Add Task</h2>
        </button>
      )}
    </div>
  );
}

export default Cards;
