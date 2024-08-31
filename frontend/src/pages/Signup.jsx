import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [Data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      if (Data.username === "" || Data.email === "" || Data.password === "") {
        alert("Please fill all the fields");
      } else {
        const response = await axios.post(
          "http://localhost:3000/api/v1/signup",
          Data,
        );
        console.log(response);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className=" h-[98vh] flex items-center justify-center />">
      <div className="p-4 w-2/6 bg-gray-800">
        <div className="text-center text-2xl font-bold">Signup</div>
        <input
          type="username"
          placeholder="Username"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
          name="username"
          value={Data.username}
          onChange={change}
          required
        />
        <input
          type="email"
          placeholder="Enter your email"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
          name="email"
          value={Data.email}
          onChange={change}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
          name="password"
          onChange={change}
          value={Data.password}
          required
        />

        <div className="flex items-center justify-between w-full">
          <button
            className="bg-blue-400 text-xl font-semibold text-black px-4 py-2 rounded-lg"
            onClick={handleSubmit}
          >
            Signup
          </button>
          <Link to="/login" className="text-gray-400 hover:text-gray-200">
            Already Having an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
