import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const url = "https://taskify-hf0m.onrender.com";

  if (isLoggedIn === true) {
    navigate("/");
  }

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.username === "" || data.password === "") {
      alert("Please fill all the fields");
      return;
    }

    try {
      const response = await axios.post(
        // "http://localhost:3000/api/v1/login",
        `${url}/api/v1/login`,
        data,
      );
      const { id, token } = response.data;
      localStorage.setItem("id", id);
      localStorage.setItem("token", token);
      dispatch(authActions.login(id, token)); // Ensure authActions.login is correctly implemented
      navigate("/");
    } catch (err) {
      alert(
        "Login Error: " +
          (err.response?.data?.message || "An unknown error occurred"),
      );
    }
  };

  return (
    <form
      className="h-[98vh] flex items-center justify-center"
      onSubmit={handleSubmit}
    >
      <div className="p-4 w-2/6 bg-gray-800">
        <div className="text-center text-2xl font-bold">Login</div>
        <input
          type="text"
          placeholder="Enter your username"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
          name="username"
          onChange={handleChange}
          value={data.username}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
          name="password"
          value={data.password}
          onChange={handleChange}
          required
        />
        <div className="flex items-center justify-between w-full">
          <button
            type="submit"
            className="bg-blue-400 text-xl font-semibold text-black px-4 py-2 rounded-lg"
          >
            Login
          </button>
          <Link to="/signup" className="text-gray-400 hover:text-gray-200">
            Not Having an account? Signup
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Login;
