import Cards from "../components/home/Cards";
import { IoAddCircleSharp } from "react-icons/io5";
import InputData from "../components/home/InputData";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const AllTasks = () => {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [updatedTasks, setUpdatedTasks] = useState({
    id: "",
    title: "",
    desc: "",
  });
  // const url = "http://localhost:3000";
  // const url = "https://taskify-hf0m.onrender.com";
  const url = import.meta.env.VITE_API_URL;

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const fetchTasks = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/api/v2/get-all-task`, {
        headers,
      });
      setTasks(response.data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleTaskAdded = useCallback(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <>
      <div>
        <div className="w-full flex justify-end px-4 py-2 ">
          <button onClick={() => setIsInputVisible(true)}>
            <IoAddCircleSharp className="text-4xl text-gray-300 hover:text-gray-500 hover:cursor-pointer transition-all duration-200" />
          </button>
        </div>
        <Cards
          data={tasks}
          home={true}
          setInputdiv={setIsInputVisible}
          onTasksUpdated={fetchTasks}
          setUpdatedTasks={setUpdatedTasks}
        />
      </div>
      <InputData
        isVisible={isInputVisible}
        updatedTasks={updatedTasks}
        setUpdatedTasks={setUpdatedTasks}
        onClose={() => setIsInputVisible(false)}
        onTaskAdded={handleTaskAdded}
      />
    </>
  );
};

export default AllTasks;
