import { RxCross2 } from "react-icons/rx";

const InputData = ({ Inputdiv, setInputdiv }) => {
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
          />
          <textarea
            name="desc"
            id=""
            cols={30}
            rows={10}
            placeholder="Description..."
            className="px-3 py-2 rounded w-full bg-gray-700 my-3"
          ></textarea>
          <button className="px-3 py-2 bg-blue-500 rounded text-black text-xl hover:bg-blue-300 transition-all duration-200">
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default InputData;
