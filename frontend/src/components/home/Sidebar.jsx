import React from "react";
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa";
import { TbNotebookOff } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { useEffect, useState } from "react";
import axios from "axios";

function Sidebar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const url = import.meta.env.VITE_API_URL;
  const [userData, setUserData] = useState(null);

  const data = [
    { id: 1, title: "All tasks", icons: <CgNotes />, link: "/" },
    {
      id: 2,
      title: "Important tasks",
      icons: <MdLabelImportant />,
      link: "/importantTasks",
    },
    {
      id: 3,
      title: "Completed tasks",
      icons: <FaCheckDouble />,
      link: "/completedTasks",
    },
    {
      id: 4,
      title: "Incomplete tasks",
      icons: <TbNotebookOff />,
      link: "/incompletedTasks",
    },
  ];

  const handleLogout = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (localStorage.getItem("id") && localStorage.getItem("token")) {
        try {
          const response = await axios.get(`${url}/api/v2/get-all-task`, {
            headers: {
              id: localStorage.getItem("id"),
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          setUserData(response.data);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      }
    };

    fetchUserData();
  }, [url]);

  return (
    <div className="flex flex-col h-full text-gray-100">
      <div className="mb-8 mt-4">
        <h1 className="text-2xl font-bold text-gray-100">Taskify</h1>
      </div>

      {userData && (
        <div className="mb-8 bg-gray-700 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-100">
            {userData.username}
          </h2>
          <h4 className="text-sm text-gray-300">{userData.email}</h4>
        </div>
      )}

      <nav className="flex-grow">
        {data.map((item) => (
          <Link
            to={item.link}
            key={item.id}
            className={`flex items-center py-3 px-4 rounded-lg transition-all duration-300 ${
              location.pathname === item.link
                ? "bg-gray-600 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            <span className="text-xl mr-3">{item.icons}</span>
            <span className="text-sm font-medium">{item.title}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto mb-4">
        <button
          className="w-full py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
