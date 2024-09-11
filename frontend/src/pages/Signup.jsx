import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const history = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const [Data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  // const url = "http://localhost:3000";
  const url = "https://taskify-hf0m.onrender.com";

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (Data.username === "" || Data.email === "" || Data.password === "") {
        alert("Please fill all the fields");
      } else {
        const response = await axios.post(`${url}/api/v1/signup`, Data);
        history("/login");
        alert("Signup successful");
      }
    } catch (err) {
      alert(
        "Signup Error: " +
          (err.response?.data?.message || "An unknown error occurred"),
      );
    }
  };

  if (isLoggedIn === true) {
    history("/");
  }

  return (
    <div className="h-[98vh] flex items-center justify-center">
      <div className="p-4 w-2/6 bg-gray-800">
        <div className="text-center text-2xl font-bold">Signup</div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
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
              type="submit"
              className="bg-blue-400 text-xl font-semibold text-black px-4 py-2 rounded-lg"
            >
              Signup
            </button>
            <Link to="/login" className="text-gray-400 hover:text-gray-200">
              Already Having an account? Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
