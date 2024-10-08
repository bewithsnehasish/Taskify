import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa";
import { TbNotebookOff } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { useEffect, useState } from "react";
import axios from "axios";

function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const url = "http://localhost:3000";
  const url = "https://taskify-hf0m.onrender.com";

  const data = [
    {
      id: 1, // Added unique id for better key management
      title: "All tasks",
      icons: <CgNotes />,
      link: "/",
    },
    {
      id: 2, // Added unique id for better key management
      title: "Important tasks",
      icons: <MdLabelImportant />,
      link: "/importantTasks",
    },
    {
      id: 3, // Added unique id for better key management
      title: "Completed tasks",
      icons: <FaCheckDouble />,
      link: "/completedTasks",
    },
    {
      id: 4, // Added unique id for better key management
      title: "Incomplete tasks",
      icons: <TbNotebookOff />,
      link: "/incompletedTasks",
    },
  ];

  const [Data, setData] = useState();

  const handleLogout = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `${url}/api/v2/get-all-task`,
        // "http://localhost:3000/api/v2/get-all-task",
        {
          headers,
        },
      );
      setData(response.data);
    };
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      fetch();
    }
  }, []);

  return (
    <>
      {Data && (
        <div>
          <h2 className="text-xl font-semibold">{Data.username}</h2>
          <h4 className="mb-1 text-gray-400">{Data.email}</h4>
        </div>
      )}
      <div>
        {data.map((item) => (
          <Link
            to={item.link}
            key={item.id} // Use unique id as key
            className="my-2 flex items-center hover:bg-gray-500 p-4 rounded transition-all duration-300"
          >
            {item.icons}
            &nbsp;{item.title}
          </Link>
        ))}
      </div>
      <div>
        <button
          className="bg-gray-700 w-full p-2 rounded hover:bg-red-500"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
    </>
  );
}

export default Sidebar;
