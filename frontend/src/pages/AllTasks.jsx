import Cards from "../components/home/Cards";
import { IoAddCircleSharp } from "react-icons/io5";
import InputData from "../components/home/InputData";

function AllTasks() {
  return (
    <>
      <div>
        <div className="w-full flex justify-end px-4 py-2 ">
          <button>
            <IoAddCircleSharp className="text-4xl text-gray-300 hover:text-gray-500 hover:cursor-pointer transition-all duration-200" />
          </button>
        </div>
        <Cards home={"true"} />
      </div>
      <InputData />
    </>
  );
}

export default AllTasks;
