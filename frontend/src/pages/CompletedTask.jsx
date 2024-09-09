import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Cards from "../components/home/Cards";
import { IoAddCircleSharp } from "react-icons/io5";
import InputData from "../components/home/InputData";

const CompletedTask = () => {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [updatedTasks, setUpdatedTasks] = useState({
    id: "",
    title: "",
    desc: "",
  });

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const fetchTasks = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v2/get-complete-task",
        { headers },
      );
      const tasksData = response.data.data || response.data;
      setTasks(Array.isArray(tasksData) ? tasksData : []);
    } catch (error) {
      console.error("Error fetching important tasks:", error);
      setTasks([]);
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
        {tasks.length > 0 ? (
          <Cards
            data={tasks}
            home={false}
            setInputdiv={setIsInputVisible}
            onTasksUpdated={fetchTasks}
            setUpdatedTasks={setUpdatedTasks}
          />
        ) : (
          <div>No important tasks found.</div>
        )}
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

export default CompletedTask;
