import { VscHeart } from "react-icons/vsc";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { IoAddCircleSharp } from "react-icons/io5";

function Cards({ home, setInputdiv }) {
  const data = [
    {
      id: 1,
      title: "Complete React Documentation",
      description:
        "Read and understand the new React hooks introduced in the latest version.",
      status: "Incomplete",
    },
    {
      id: 2,
      title: "Fix Bugs in User Authentication Module",
      description:
        "Address the bugs reported in the user authentication system and perform thorough testing.",
      status: "Incomplete",
    },
    {
      id: 3,
      title: "Implement Dark Mode Toggle",
      description:
        "Add a feature to toggle between light and dark mode for better user experience.",
      status: "Incomplete",
    },
    {
      id: 4,
      title: "Update Dependencies",
      description:
        "Update all project dependencies to their latest versions and ensure compatibility.",
      status: "Incomplete",
    },
    {
      id: 5,
      title: "Create User Dashboard",
      description:
        "Design and implement the user dashboard with analytics and user activity insights.",
      status: "Complete",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {data.map((item) => (
        <div
          key={item.id}
          className="flex flex-col justify-between bg-gray-700 rounded-xl p-4 hover:scale-105 hover:cursor-pointer transition-all duration-200"
        >
          <div>
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="text-gray-300">{item.description}</p>
          </div>
          <div className="mt-4 w-full flex items-center">
            <button
              className={`${
                item.status === "Incomplete" ? "bg-red-400" : "bg-green-700"
              } p-2 rounded w-3/6`}
            >
              {item.status}
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
      {home == "true" && (
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
