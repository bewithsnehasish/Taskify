import axios from "axios";
import { VscHeart } from "react-icons/vsc";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { IoAddCircleSharp } from "react-icons/io5";

function Cards({ home, setInputdiv, data }) {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handlecompletedtask = async (id) => {
    try {
      await axios.put(
        `http://localhost:3000/api/v2/update-complete-task/${id}`,
        {},
        { headers },
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {data.map((item) => (
        <div
          key={item.id}
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
              } p-2 rounded w-3/6`}
              onClick={() => handlecompletedtask(item.id)}
            >
              {item.completed === true ? "Completed" : "Incomplete"}
            </button>
            <div className="text-white p-2 w-3/6 text-2xl flex justify-around font-semibold">
              <button>
                <VscHeart />
              </button>
              <button>
                <FaEdit />
              </button>
              <button>
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
