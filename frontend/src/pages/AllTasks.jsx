import Cards from "../components/home/Cards";
import { IoAddCircleSharp } from "react-icons/io5";
import InputData from "../components/home/InputData";
import { useEffect, useState } from "react";
import axios from "axios";

const AllTasks = () => {
  const [Inputdiv, setInputdiv] = useState("hidden");

  const [Data, setData] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/v2/get-all-task",
        { headers },
      );
      setData(response.data);
    };
    fetch();
  }, []);

  Data && console.log(Data);

  return (
    <>
      <div>
        <div className="w-full flex justify-end px-4 py-2 ">
          <button onClick={() => setInputdiv("fixed")}>
            <IoAddCircleSharp className="text-4xl text-gray-300 hover:text-gray-500 hover:cursor-pointer transition-all duration-200" />
          </button>
        </div>
        {Data && (
          <Cards data={Data.tasks} home="true" setInputdiv={setInputdiv} />
        )}
      </div>
      <InputData Inputdiv={Inputdiv} setInputdiv={setInputdiv} />
    </>
  );
};

export default AllTasks;
