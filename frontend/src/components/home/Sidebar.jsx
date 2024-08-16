import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa";
import { TbNotebook, TbNotebookOff } from "react-icons/tb";

function Sidebar() {
  const data = [
    {
      title: "All tasks",
      icons: <CgNotes />,
    },
    {
      title: "Important tasks",
      icons: <MdLabelImportant />,
    },
    {
      title: "Completed tasks",
      icons: <FaCheckDouble />,
    },
    {
      title: "Incompleted tasks",
      icons: <TbNotebookOff />,
    },
  ];

  return (
    <>
      <div>
        <h2 className="text-xl font-semibold"> The Code Master</h2>
        <h4 className="mb-1 text-gray-400">test@gmail.com</h4>
        <hr />
      </div>
      <div>
        {data.map((item, i) => (
          <div
            key={i}
            className="my-2 flex hover:bg-gray-500 p-4 rounded transition-all duration-300"
          >
            {item.icons}
            &nbsp;{item.title}
          </div>
        ))}
      </div>
      <div>
        <button className="bg-gray-700 w-full p-2 rounded hover:bg-red-500">
          LogOut
        </button>
      </div>
    </>
  );
}

export default Sidebar;
