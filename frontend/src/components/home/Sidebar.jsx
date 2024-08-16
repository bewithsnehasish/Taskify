import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa";
import { TbNotebook, TbNotebookOff } from "react-icons/tb";
import { Link } from "react-router-dom";

function Sidebar() {
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

  return (
    <>
      <div>
        <h2 className="text-xl font-semibold">The Code Master</h2>
        <h4 className="mb-1 text-gray-400">test@gmail.com</h4>
        <hr />
      </div>
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
        <button className="bg-gray-700 w-full p-2 rounded hover:bg-red-500">
          Log Out
        </button>
      </div>
    </>
  );
}

export default Sidebar;
