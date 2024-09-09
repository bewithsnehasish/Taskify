import axios from "axios";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";

const InputData = ({
  isVisible,
  onClose,
  onTaskAdded,
  updatedTasks,
  setUpdatedTasks,
}) => {
  const [data, setData] = useState({ title: "", desc: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        // This is an edit operation
        await axios.put(
          `http://localhost:3000/api/v2/update-task/${updatedTasks.id}`,
          data,
          { headers },
        );
      } else {
        // This is a create operation
        await axios.post("http://localhost:3000/api/v2/create-task", data, {
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
    <>
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
        <div className="w-full max-w-md bg-gray-900 p-4 rounded">
          <div className="flex justify-end mb-4">
            <button className="text-2xl" onClick={resetForm}>
              <RxCross2 />
            </button>
          </div>
          <input
            type="text"
            placeholder="title"
            name="title"
            className="py-3 px-2 rounded w-full bg-gray-700"
            value={data.title}
            onChange={change}
          />
          <textarea
            name="desc"
            cols={30}
            rows={10}
            placeholder="Description..."
            className="px-3 py-2 rounded w-full bg-gray-700 my-3"
            value={data.desc}
            onChange={change}
          ></textarea>
          <button
            className="px-3 py-2 bg-blue-500 rounded text-black text-xl hover:bg-blue-300 transition-all duration-200"
            onClick={submitData}
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Submitting..."
              : updatedTasks.id
                ? "Update"
                : "Submit"}
          </button>
        </div>
      </div>
    </>
  );
};

export default InputData;
