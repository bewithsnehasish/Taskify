import axios from "axios";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";

const InputData = ({ Inputdiv, setInputdiv }) => {
  const [data, setData] = useState({ title: "", desc: "" });

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submitData = async () => {
    if (data.title === "" || data.desc === "") {
      alert("Please fill all the fields");
    } else {
      try {
        await axios.post("http://localhost:3000/api/v2/create-task", data, {
          headers,
        });
        // Optionally clear data or close the modal after submission
        setData({ title: "", desc: "" });
        setInputdiv("hidden");
      } catch (error) {
        console.error("Error submitting data:", error);
        alert("An error occurred while submitting the data.");
      }
    }
  };

  return (
    <>
      <div
        className={`${Inputdiv} fixed top-0 left-0 bg-gray-800 opacity-50 h-screen w-full`}
      ></div>
      <div
        className={`${Inputdiv} top-0 left-0 flex justify-center items-center h-screen w-full`}
      >
        <div className="w-2/6 bg-gray-900 p-4 rounded">
          <div className="flex justify-end mb-4">
            <button className="text-2xl" onClick={() => setInputdiv("hidden")}>
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
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default InputData;
