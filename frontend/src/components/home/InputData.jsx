const InputData = () => {
  return (
    <>
      <div className="fixed top-0 left-0 bg-gray-800 opacity-50 h-screen w-full"></div>
      <div className="fixed top-0 left-0 flex justify-center items-center h-screen w-full">
        <div className="w-3/6 bg-gray-900 p-4">
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
        </div>
      </div>
    </>
  );
};

export default InputData;
