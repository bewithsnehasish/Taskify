import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";
import { CheckSquare, Loader } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const url = "https://taskify-hf0m.onrender.com";

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (isLoggedIn === true) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

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
    setIsLoading(true);
    try {
      const response = await axios.post(`${url}/api/v1/login`, data);
      const { id, token } = response.data;
      localStorage.setItem("id", id);
      localStorage.setItem("token", token);
      dispatch(authActions.login(id, token));
      navigate("/");
    } catch (err) {
      alert(
        "Login Error: " +
          (err.response?.data?.message || "An unknown error occurred"),
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-900 rounded-t-2xl shadow-lg p-8">
          <div className="flex items-center justify-center mb-8">
            <CheckSquare className="text-blue-500 w-12 h-12 mr-2" />
            <h1 className="text-4xl font-bold text-white">Taskify</h1>
          </div>
          <h2 className="text-2xl font-semibold text-center text-white mb-6">
            Welcome Back!
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-gray-300 mb-2 text-sm font-medium"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                onChange={handleChange}
                value={data.username}
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-gray-300 mb-2 text-sm font-medium"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                onChange={handleChange}
                value={data.password}
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold transition duration-300 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader className="animate-spin mx-auto h-5 w-5" />
              ) : (
                "Log In"
              )}
            </button>
          </form>
        </div>
        <div className="bg-gray-700 rounded-b-2xl p-4 text-center">
          <p className="text-gray-300">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-400 hover:text-blue-300 font-medium transition duration-200"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
